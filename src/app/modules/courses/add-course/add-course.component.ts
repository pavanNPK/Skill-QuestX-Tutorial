import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
    selector: 'app-add-course',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        TextareaModule
    ],
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
    courseForm: FormGroup;
    selectedFileName: string | null = null;

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {
        this.courseForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            price: [0, [Validators.required, Validators.min(0)]],
            discount: [0, [Validators.min(0), Validators.max(100)]],
            video: [null]
        });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFileName = file.name;
            this.courseForm.patchValue({ video: file });
        }
    }

    onSubmit() {
        if (this.courseForm.valid) {
            console.log('Form Submitted', this.courseForm.value);
            // Simulate API call
            setTimeout(() => {
                this.router.navigate(['/courses']);
            }, 1000);
        } else {
            Object.keys(this.courseForm.controls).forEach(key => {
                const control = this.courseForm.get(key);
                control?.markAsTouched();
            });
        }
    }

    onCancel() {
        this.router.navigate(['/courses']);
    }
}
