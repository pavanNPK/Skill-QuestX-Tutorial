import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
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
export class AddCourseComponent implements OnInit, OnDestroy {
    courseForm: FormGroup;
    selectedFileName: string = '';
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private headerService: HeaderService
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
        this.headerService.updateTitle('Create New Course');
        this.headerService.updateBreadcrumbs([
            { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
            { label: 'Courses', url: '/courses' },
            { label: 'Create New Course' }
        ]);
    }

    ngOnDestroy() {
        this.headerService.reset();
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
