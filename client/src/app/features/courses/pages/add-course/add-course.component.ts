// use of this file is:
// Feature page/container file. It connects route UI, feature state, services, and user actions.
import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { HeaderService } from '../../../../core/services/header.service';
import { AuthService, CourseOption } from '../../../../core/services/auth.service';
import { CourseContent, CourseContentService } from '../../../../core/services/course-content.service';

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
    readonly selectedFileName = signal('');
    readonly courses = signal<CourseOption[]>([]);
    readonly selectedCourseId = signal('');
    readonly content = signal<CourseContent | null>(null);
    readonly importJson = signal(this.sampleImportJson());
    readonly contentMessage = signal('');
    readonly contentError = signal('');
    readonly uploadedAssetUrl = signal('');

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
            this.selectedFileName.set(file.name);
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
                this.courses.set(courses.map((course) => ({ id: course.id, name: course.title || course.name })));
                if (!this.selectedCourseId() && courses.length) {
                    this.selectedCourseId.set(courses[0].id);
                    this.loadContent();
                }
            },
            error: () => this.setError('Could not load courses.'),
        });
    }

    onCourseChange(event: Event) {
        this.selectedCourseId.set((event.target as HTMLSelectElement).value);
        this.loadContent();
    }

    loadContent() {
        const selectedCourseId = this.selectedCourseId();
        if (!selectedCourseId) return;
        this.contentMessage.set('');
        this.contentError.set('');
        this.courseContent.getContent(selectedCourseId).subscribe({
            next: (content) => {
                this.content.set(content);
                this.importJson.set(JSON.stringify({
                    title: content.title,
                    description: content.description,
                    modules: content.modules,
                }, null, 2));
            },
            error: () => {
                this.content.set(null);
                this.importJson.set(this.sampleImportJson());
            },
        });
    }

    importContent() {
        const selectedCourseId = this.selectedCourseId();
        if (!selectedCourseId) return;
        this.contentMessage.set('');
        this.contentError.set('');
        try {
            const payload = JSON.parse(this.importJson());
            this.courseContent.importContent(selectedCourseId, payload).subscribe({
                next: (content) => {
                    this.content.set(content);
                    this.contentMessage.set('Draft content saved.');
                },
                error: () => this.setError('Could not import content. Check permissions and JSON format.'),
            });
        } catch {
            this.setError('Invalid JSON. Please check commas, quotes, and brackets.');
        }
    }

    publishContent() {
        const selectedCourseId = this.selectedCourseId();
        if (!selectedCourseId) return;
        this.courseContent.publish(selectedCourseId).subscribe({
            next: (content) => {
                this.content.set(content);
                this.contentMessage.set('Content published for enrolled students.');
                this.contentError.set('');
            },
            error: () => this.setError('Could not publish content.'),
        });
    }

    unpublishContent() {
        const selectedCourseId = this.selectedCourseId();
        if (!selectedCourseId) return;
        this.courseContent.unpublish(selectedCourseId).subscribe({
            next: (content) => {
                this.content.set(content);
                this.contentMessage.set('Content unpublished from students.');
                this.contentError.set('');
            },
            error: () => this.setError('Could not unpublish content.'),
        });
    }

    onAssetSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        const selectedCourseId = this.selectedCourseId();
        if (!file || !selectedCourseId) return;
        this.courseContent.uploadAsset(selectedCourseId, file).subscribe({
            next: (asset) => {
                this.uploadedAssetUrl.set(asset.url);
                this.contentMessage.set(`Uploaded ${asset.originalName}. Use assetId "${asset.id}" or url "${asset.url}" in a block.`);
                this.contentError.set('');
                input.value = '';
            },
            error: () => this.setError('Could not upload asset. Check file type and size.'),
        });
    }

    private setError(message: string) {
        this.contentError.set(message);
        this.contentMessage.set('');
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
