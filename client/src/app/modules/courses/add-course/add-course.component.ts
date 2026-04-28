import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { AuthService, CourseOption } from '../../core/services/auth.service';
import { CourseContent, CourseContentService } from '../../core/services/course-content.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        BreadcrumbModule
    ],
    templateUrl: './add-course.component.html',
    styleUrl: './add-course.component.scss'
})
export class AddCourseComponent implements OnInit, OnDestroy {
    private auth = inject(AuthService);
    private courseContent = inject(CourseContentService);

    courseForm: FormGroup;
    selectedFileName: string = '';
    courses: CourseOption[] = [];
    selectedCourseId = '';
    content: CourseContent | null = null;
    importJson = this.sampleImportJson();
    contentMessage = '';
    contentError = '';
    uploadedAssetUrl = '';

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
        if (!this.auth.canManageCourseContent()) {
            this.router.navigate(['/courses']);
            return;
        }
        this.headerService.updateTitle('Course Content Manager');
        this.headerService.updateBreadcrumbs([
            { icon: 'pi pi-home', url: '/dashboard', label: 'Home' },
            { label: 'Courses', url: '/courses' },
            { label: 'Course Content Manager' }
        ]);
        this.loadCourses();
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

    loadCourses() {
        this.courseContent.getAvailableCourses().subscribe({
            next: (courses) => {
                this.courses = courses.map((course) => ({ id: course.id, name: course.title || course.name }));
                if (!this.selectedCourseId && courses.length) {
                    this.selectedCourseId = courses[0].id;
                    this.loadContent();
                }
            },
            error: () => this.setError('Could not load courses.'),
        });
    }

    onCourseChange(event: Event) {
        this.selectedCourseId = (event.target as HTMLSelectElement).value;
        this.loadContent();
    }

    loadContent() {
        if (!this.selectedCourseId) return;
        this.contentMessage = '';
        this.contentError = '';
        this.courseContent.getContent(this.selectedCourseId).subscribe({
            next: (content) => {
                this.content = content;
                this.importJson = JSON.stringify({
                    title: content.title,
                    description: content.description,
                    modules: content.modules,
                }, null, 2);
            },
            error: () => {
                this.content = null;
                this.importJson = this.sampleImportJson();
            },
        });
    }

    importContent() {
        if (!this.selectedCourseId) return;
        this.contentMessage = '';
        this.contentError = '';
        try {
            const payload = JSON.parse(this.importJson);
            this.courseContent.importContent(this.selectedCourseId, payload).subscribe({
                next: (content) => {
                    this.content = content;
                    this.contentMessage = 'Draft content saved.';
                },
                error: () => this.setError('Could not import content. Check permissions and JSON format.'),
            });
        } catch {
            this.setError('Invalid JSON. Please check commas, quotes, and brackets.');
        }
    }

    publishContent() {
        if (!this.selectedCourseId) return;
        this.courseContent.publish(this.selectedCourseId).subscribe({
            next: (content) => {
                this.content = content;
                this.contentMessage = 'Content published for enrolled students.';
                this.contentError = '';
            },
            error: () => this.setError('Could not publish content.'),
        });
    }

    unpublishContent() {
        if (!this.selectedCourseId) return;
        this.courseContent.unpublish(this.selectedCourseId).subscribe({
            next: (content) => {
                this.content = content;
                this.contentMessage = 'Content unpublished from students.';
                this.contentError = '';
            },
            error: () => this.setError('Could not unpublish content.'),
        });
    }

    onAssetSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file || !this.selectedCourseId) return;
        this.courseContent.uploadAsset(this.selectedCourseId, file).subscribe({
            next: (asset) => {
                this.uploadedAssetUrl = asset.url;
                this.contentMessage = `Uploaded ${asset.originalName}. Use assetId "${asset.id}" or url "${asset.url}" in a block.`;
                this.contentError = '';
                input.value = '';
            },
            error: () => this.setError('Could not upload asset. Check file type and size.'),
        });
    }

    private setError(message: string) {
        this.contentError = message;
        this.contentMessage = '';
    }

    private sampleImportJson(): string {
        return JSON.stringify({
            title: 'Medical Coding Training',
            description: 'Course overview text',
            modules: [
                {
                    title: 'Module 1: Introduction',
                    summary: 'Optional module summary',
                    lessons: [
                        {
                            title: 'What is Medical Coding?',
                            durationMinutes: 20,
                            blocks: [
                                { type: 'heading', text: 'Overview' },
                                { type: 'paragraph', text: 'Medical coding converts clinical documentation into standardized codes.' },
                                {
                                    type: 'nested_bullet_list',
                                    items: [
                                        {
                                            text: 'Coding systems',
                                            children: [
                                                { text: 'ICD-10-CM' },
                                                { text: 'CPT' },
                                                { text: 'HCPCS' }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }, null, 2);
    }
}
