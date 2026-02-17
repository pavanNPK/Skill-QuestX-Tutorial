import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-add-course',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        BreadcrumbModule
    ],
    templateUrl: './add-course.component.html',
    styleUrl: './add-course.component.scss'
})
export class AddCourseComponent implements OnInit {
    courseForm: FormGroup;
    selectedFileName: string = '';
    breadcrumbItems: MenuItem[] = [];
    home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

    constructor(
        private fb: FormBuilder,
        private router: Router
    ) {
        this.courseForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            price: [0],
            discount: [0],
            video: [null]
        });
    }

    ngOnInit() {
        this.breadcrumbItems = [
            { label: 'Courses', routerLink: '/courses' },
            { label: 'Create New Course' }
        ];
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
