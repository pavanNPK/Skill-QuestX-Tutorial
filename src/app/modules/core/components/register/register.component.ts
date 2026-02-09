import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'sqx-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    ButtonModule,
    FloatLabelModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ],
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
  registerForm: FormGroup;
  skills = ['Python', 'Java', 'C++', 'Communication', 'Angular', 'Teamwork'];

  private rotationTimer?: ReturnType<typeof setInterval>;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneCountry: ['+91'],
      phoneNumber: ['', [Validators.required]],
      underGraduate: [''],
      resume: [''],
      skillInput: ['']
    });

    this.rotationTimer = setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.carouselItems.length;
      this.cdr.markForCheck();
    }, 3000);
  }

  setActive(index: number) {
    this.activeIndex = index;
  }

  submitRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
  }

  ngOnDestroy(): void {
    if (this.rotationTimer) {
      clearInterval(this.rotationTimer);
    }
  }
}
