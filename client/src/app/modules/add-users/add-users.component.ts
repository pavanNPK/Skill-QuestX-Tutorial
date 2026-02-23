import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import {
  AuthService,
  AuthUser,
  CreateUserRequest,
  InstructorWithStats,
  CourseWithBatches,
  ListUsersResponse,
  CourseOption,
} from '../core/services/auth.service';
import { getFriendlyErrorMessage } from '../../shared/utils/error-messages.util';
import { ChipModule } from 'primeng/chip';

interface RoleOption {
  value: string;
  label: string;
}

@Component({
  selector: 'sqx-add-users',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    FloatLabelModule,
    TableModule,
    SelectModule,
    ToastModule,
    TagModule,
    TooltipModule,
    ChipModule,
  ],
  providers: [MessageService],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUsersComponent implements OnInit {
  private fb = inject(FormBuilder);
  readonly auth = inject(AuthService);
  private messageService = inject(MessageService);

  readonly loading = signal(false);
  readonly submitting = signal(false);
  readonly view = signal<'sa' | 'admin' | 'instructor' | null>(null);
  readonly admins = signal<AuthUser[]>([]);
  readonly instructors = signal<InstructorWithStats[]>([]);
  readonly students = signal<AuthUser[]>([]);
  readonly batchesByCourse = signal<CourseWithBatches[]>([]);

  roleOptions: RoleOption[] = [];
  selectedRole: RoleOption | null = null;

  readonly courses = signal<CourseOption[]>([]);
  selectedCourses: CourseOption[] = [];
  courseToAdd: CourseOption | null = null;

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.roleOptions = this.auth.getAddableRoles();
    if (this.roleOptions.length > 0) {
      this.selectedRole = this.roleOptions[this.roleOptions.length - 1];
    }
    this.loadUsers();
    if (this.auth.canAccessAddUsers()) {
      this.auth.listCourses().subscribe({
        next: (list) => this.courses.set(list),
        error: () => this.courses.set([]),
      });
    }
  }

  /** Courses not yet selected (for dropdown when adding instructor). */
  get coursesForDropdown(): CourseOption[] {
    const selectedIds = new Set(this.selectedCourses.map((c) => c.id));
    return this.courses().filter((c) => !selectedIds.has(c.id));
  }

  addCourse(course: CourseOption | null): void {
    if (course && !this.selectedCourses.some((c) => c.id === course.id)) {
      this.selectedCourses = [...this.selectedCourses, course];
    }
  }

  onCourseSelected(course: CourseOption | null): void {
    this.addCourse(course);
    this.courseToAdd = null;
  }

  removeCourse(course: CourseOption): void {
    this.selectedCourses = this.selectedCourses.filter((c) => c.id !== course.id);
  }

  loadUsers(): void {
    this.loading.set(true);
    this.auth.listUsers().subscribe({
      next: (res: ListUsersResponse) => {
        this.view.set(res.view);
        if (res.view === 'sa') {
          this.admins.set(res.admins);
          this.instructors.set(res.instructors);
          this.students.set(res.students);
          this.batchesByCourse.set(res.batchesByCourse);
        } else if (res.view === 'admin') {
          this.instructors.set(res.instructors);
          this.students.set(res.students);
          this.admins.set([]);
          this.batchesByCourse.set([]);
        } else {
          this.students.set(res.students);
          this.admins.set([]);
          this.instructors.set([]);
          this.batchesByCourse.set([]);
        }
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: getFriendlyErrorMessage(err),
        });
      },
    });
  }

  /** True if current role can add users (SA or Admin). */
  get showAddUserForm(): boolean {
    return this.auth.canAccessAddUsers();
  }

  /** True if current role can activate/deactivate users (SA or Admin). Instructors have no actions. */
  get showActions(): boolean {
    return this.auth.canAccessAddUsers();
  }

  setUserStatus(userId: string, active: boolean): void {
    this.auth.setUserStatus(userId, active).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: active ? 'User activated' : 'User deactivated',
          detail: active ? 'The user can sign in again.' : 'The user has been deactivated and cannot sign in until reactivated.',
        });
        this.loadUsers();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: getFriendlyErrorMessage(err),
        });
      },
    });
  }

  isActive(user: AuthUser | InstructorWithStats): boolean {
    return user.isActive !== false;
  }

  submit(): void {
    if (this.form.invalid || !this.selectedRole) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const role = this.selectedRole.value as 'admin' | 'instructor';
    this.submitting.set(true);
    const body: CreateUserRequest = {
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      role,
    };
    if (role === 'instructor' && this.selectedCourses.length > 0) {
      body.courseIds = this.selectedCourses.map((c) => c.id);
    }
    this.auth.createUser(body).subscribe({
      next: (res) => {
        this.submitting.set(false);
        if ('access_token' in res) {
          this.messageService.add({
            severity: 'success',
            summary: 'User created',
            detail: 'User has been added and can log in.',
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Invitation sent',
            detail: res.message,
          });
        }
        this.form.reset();
        this.selectedCourses = [];
        if (this.roleOptions.length > 0) {
          this.selectedRole = this.roleOptions[this.roleOptions.length - 1];
        }
        this.loadUsers();
      },
      error: (err) => {
        this.submitting.set(false);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: getFriendlyErrorMessage(err),
        });
      },
    });
  }

  getRoleSeverity(role: string): 'info' | 'success' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (role) {
      case 'super_admin': return 'danger';
      case 'admin': return 'info';
      case 'instructor': return 'success';
      default: return 'secondary';
    }
  }

  roleLabel(role: string): string {
    const map: Record<string, string> = {
      super_admin: 'Super Admin',
      admin: 'Admin',
      instructor: 'Instructor',
      student: 'Student',
    };
    return map[role] ?? role;
  }
}
