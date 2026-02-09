import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ChipModule } from 'primeng/chip';
import { KnobModule } from 'primeng/knob';

@Component({
  selector: 'sqx-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    ChipModule,
    KnobModule
  ],
  providers: [MessageService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnDestroy {
  carouselItems = [
    {
      title: 'REDEFINE',
      subtitle: 'Boost your learning and career path'
    },
    {
      title: 'UPSKILL',
      subtitle: 'Gain modern, in-demand technical expertise'
    },
    {
      title: 'SUCCEED',
      subtitle: 'Land your dream role or promotion'
    }
  ];

  activeIndex = 0;
  currentStep = 1; // 1: Form, 2: OTP, 3: Password

  // Forms
  registerForm: FormGroup;
  passwordForm: FormGroup;

  // File uploads
  profileImage: File | null = null;
  profileImagePreview: string = '/assets/images/avatar-1.jpg';
  resumeFile: File | null = null;
  resumeFileName: string = '';

  // Skills
  skills: string[] = [];
  skillInput: string = '';

  // OTP
  otpCode: string = '';
  otpSent: boolean = false;
  canResendOTP: boolean = false;
  resendTimer: number = 180; // 3 minutes
  otpExpired: boolean = false;

  // Calculate OTP progress percentage for knob
  get otpProgress(): number {
    return Math.round((this.resendTimer / 180) * 100);
  }
  private rotationTimer?: ReturnType<typeof setInterval>;
  private resendInterval?: ReturnType<typeof setInterval>;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phoneCountry: ['+91'],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      underGraduate: ['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    this.rotationTimer = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
      this.cdr.markForCheck();
    }, 3000);
  }

  setActive(index: number) {
    this.activeIndex = index;
  }

  // Profile Image Upload
  triggerProfileImageUpload() {
    const fileInput = document.getElementById('profile-image-input') as HTMLInputElement;
    fileInput?.click();
  }

  onProfileImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type (JPEG, JPG, PNG only)
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Invalid File Type',
          detail: 'Please select a valid image file (JPEG, JPG, or PNG)',
          life: 3000
        });
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.messageService.add({
          severity: 'error',
          summary: 'File Too Large',
          detail: 'Image size must be less than 5MB',
          life: 3000
        });
        return;
      }

      this.profileImage = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImagePreview = e.target?.result as string;
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  // Resume Upload
  onResumeSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file type (PDF, DOC, DOCX, Excel)
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      if (!validTypes.includes(file.type)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Invalid File Type',
          detail: 'Please select a valid file (PDF, DOC, DOCX, or Excel)',
          life: 3000
        });
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.messageService.add({
          severity: 'error',
          summary: 'File Too Large',
          detail: 'Resume size must be less than 5MB',
          life: 3000
        });
        return;
      }

      this.resumeFile = file;
      this.resumeFileName = file.name;
      this.cdr.markForCheck();
    }
  }

  // Skills Management
  addSkill(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const skill = this.skillInput.trim();

    if (!skill) {
      return;
    }

    if (this.skills.length >= 10) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Maximum Reached',
        detail: 'Maximum 10 skills allowed',
        life: 3000
      });
      return;
    }

    if (this.skills.includes(skill)) {
      this.messageService.add({
        severity: 'info',
        summary: 'Duplicate Skill',
        detail: 'Skill already added',
        life: 3000
      });
      return;
    }

    this.skills.push(skill);
    this.skillInput = '';
    this.cdr.markForCheck();
  }

  removeSkill(skill: string) {
    const index = this.skills.indexOf(skill);
    if (index > -1) {
      this.skills.splice(index, 1);
    }
    this.cdr.markForCheck();
  }

  // Step 1: Submit Profile Form
  submitStep1() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // Validate profile image
    if (!this.profileImage) {
      this.messageService.add({
        severity: 'error',
        summary: 'Profile Image Required',
        detail: 'Please upload a profile image',
        life: 3000
      });
      return;
    }

    // Validate resume
    if (!this.resumeFile) {
      this.messageService.add({
        severity: 'error',
        summary: 'Resume Required',
        detail: 'Please upload your resume',
        life: 3000
      });
      return;
    }

    // Validate skills (at least 1 skill required)
    if (this.skills.length === 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Skills Required',
        detail: 'Please add at least one skill',
        life: 3000
      });
      return;
    }

    // Mock API call to send OTP
    console.log('Sending OTP to:', this.registerForm.get('email')?.value);
    this.sendOTP();
  }

  // Send OTP
  sendOTP() {
    // TODO: Replace with actual API call
    // For now, simulate successful OTP send
    this.otpSent = true;
    this.currentStep = 2;
    this.startResendTimer();
    this.cdr.markForCheck();
  }

  // Resend OTP Timer
  startResendTimer() {
    this.canResendOTP = false;
    this.resendTimer = 180; // 3 minutes

    this.resendInterval = setInterval(() => {
      this.resendTimer--;
      if (this.resendTimer <= 0) {
        this.canResendOTP = true;
        if (this.resendInterval) {
          clearInterval(this.resendInterval);
        }
      }
      this.cdr.markForCheck();
    }, 1000);
  }

  // Resend OTP
  resendOTP() {
    if (!this.canResendOTP) return;

    console.log('Resending OTP to:', this.registerForm.get('email')?.value);
    this.sendOTP();
  }

  // Step 2: Submit OTP
  submitOTP() {
    if (this.otpCode.length !== 6) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid OTP',
        detail: 'Please enter a valid 6-digit OTP',
        life: 3000
      });
      return;
    }

    // TODO: Replace with actual API call
    // For now, simulate successful OTP verification
    console.log('Verifying OTP:', this.otpCode);

    // Mock verification (accept any 6-digit code for now)
    this.currentStep = 3;
    this.cdr.markForCheck();
  }

  // Step 3: Submit Password
  submitPassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    // TODO: Replace with actual API call
    console.log('Creating account with:', {
      ...this.registerForm.value,
      skills: this.skills,
      profileImage: this.profileImage?.name,
      resume: this.resumeFile?.name,
      password: this.passwordForm.get('password')?.value
    });

    // Simulate successful registration
    this.messageService.add({
      severity: 'success',
      summary: 'Registration Successful',
      detail: 'Please login with your credentials',
      life: 3000
    });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }

  // Password Match Validator
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Get Password Strength
  getPasswordStrength(): string {
    const password = this.passwordForm.get('password')?.value || '';

    if (password.length === 0) return '';
    if (password.length < 8) return 'weak';

    let strength = 0;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength === 3) return 'medium';
    return 'strong';
  }

  // Format time in MM:SS format
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
    }
    if (this.resendInterval) {
      clearInterval(this.resendInterval);
    }
  }
}
