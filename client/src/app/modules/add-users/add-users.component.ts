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
import { MessageService } from 'primeng/api';
import { AuthService, AuthUser } from '../core/services/auth.service';
import { getFriendlyErrorMessage } from '../../shared/utils/error-messages.util';

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

  readonly users = signal<AuthUser[]>([]);
  readonly loading = signal(false);
  readonly submitting = signal(false);

  roleOptions: RoleOption[] = [];
  selectedRole: RoleOption | null = null;

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
  }

  loadUsers(): void {
    this.loading.set(true);
    this.auth.listUsers().subscribe({
      next: (res) => {
        this.users.set(res.users);
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

  submit(): void {
    if (this.form.invalid || !this.selectedRole) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.submitting.set(true);
    this.auth.createUser({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      role: this.selectedRole.value as 'admin' | 'instructor',
    }).subscribe({
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
