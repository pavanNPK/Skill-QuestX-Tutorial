import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CourseContentService } from '../../core/services/course-content.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/router";
import * as i3 from "../../core/services/header.service";
import * as i4 from "@angular/common";
import * as i5 from "primeng/button";
import * as i6 from "primeng/inputtext";
const _c0 = () => ({ standalone: true });
const _forTrack0 = ($index, $item) => $item.id;
function AddCourseComponent_For_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 5);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const course_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", course_r1.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(course_r1.name);
} }
function AddCourseComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 6)(1, "div", 2)(2, "label");
    i0.ɵɵtext(3, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 34);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 2)(6, "label");
    i0.ɵɵtext(7, "Modules");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(8, "input", 34);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r1.content.status);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("value", ctx_r1.content.modules.length);
} }
function AddCourseComponent_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1("Last uploaded: ", ctx_r1.uploadedAssetUrl);
} }
function AddCourseComponent_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 11);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.contentMessage);
} }
function AddCourseComponent_Conditional_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 12);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.contentError);
} }
function AddCourseComponent_small_30_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 12);
    i0.ɵɵtext(1, "Title is required.");
    i0.ɵɵelementEnd();
} }
function AddCourseComponent_small_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "small", 12);
    i0.ɵɵtext(1, "Description is required.");
    i0.ɵɵelementEnd();
} }
function AddCourseComponent_div_50_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵelement(1, "i", 36);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3, "Drag and drop or click to upload video");
    i0.ɵɵelementEnd()();
} }
function AddCourseComponent_div_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 37);
    i0.ɵɵelement(1, "i", 38);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.selectedFileName);
} }
export class AddCourseComponent {
    fb;
    router;
    headerService;
    auth = inject(AuthService);
    courseContent = inject(CourseContentService);
    courseForm;
    selectedFileName = '';
    courses = [];
    selectedCourseId = '';
    content = null;
    importJson = this.sampleImportJson();
    contentMessage = '';
    contentError = '';
    uploadedAssetUrl = '';
    constructor(fb, router, headerService) {
        this.fb = fb;
        this.router = router;
        this.headerService = headerService;
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
    onFileSelected(event) {
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
        }
        else {
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
    onCourseChange(event) {
        this.selectedCourseId = event.target.value;
        this.loadContent();
    }
    loadContent() {
        if (!this.selectedCourseId)
            return;
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
        if (!this.selectedCourseId)
            return;
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
        }
        catch {
            this.setError('Invalid JSON. Please check commas, quotes, and brackets.');
        }
    }
    publishContent() {
        if (!this.selectedCourseId)
            return;
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
        if (!this.selectedCourseId)
            return;
        this.courseContent.unpublish(this.selectedCourseId).subscribe({
            next: (content) => {
                this.content = content;
                this.contentMessage = 'Content unpublished from students.';
                this.contentError = '';
            },
            error: () => this.setError('Could not unpublish content.'),
        });
    }
    onAssetSelected(event) {
        const input = event.target;
        const file = input.files?.[0];
        if (!file || !this.selectedCourseId)
            return;
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
    setError(message) {
        this.contentError = message;
        this.contentMessage = '';
    }
    sampleImportJson() {
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
    static ɵfac = function AddCourseComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AddCourseComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.Router), i0.ɵɵdirectiveInject(i3.HeaderService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AddCourseComponent, selectors: [["app-add-course"]], decls: 55, vars: 14, consts: [[1, "add-course-container"], [1, "form-card-premium"], [1, "form-group"], ["for", "courseSelect"], ["id", "courseSelect", 1, "premium-input", 3, "change", "value"], [3, "value"], [1, "form-grid"], ["for", "contentJson"], ["pInputText", "", "id", "contentJson", "rows", "18", 1, "premium-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["for", "assetUpload"], ["id", "assetUpload", "type", "file", "accept", ".pdf,.ppt,.pptx,.doc,.docx,.png,.jpg,.jpeg,.webp,.mp4", 3, "change"], [1, "success"], [1, "error"], [1, "form-actions"], ["pButton", "", "type", "button", "label", "Save Draft / Import", 1, "create-btn", 3, "click"], ["pButton", "", "type", "button", "label", "Publish", 1, "create-btn", 3, "click"], ["pButton", "", "type", "button", "label", "Unpublish", 1, "p-button-outlined", "cancel-btn", 3, "click"], [3, "ngSubmit", "formGroup"], ["for", "title"], ["pInputText", "", "id", "title", "formControlName", "title", "placeholder", "Enter course title", 1, "premium-input"], ["class", "error", 4, "ngIf"], ["for", "description"], ["pInputText", "", "id", "description", "formControlName", "description", "rows", "6", "placeholder", "Enter course description", 1, "premium-input"], ["for", "price"], ["pInputText", "", "type", "number", "id", "price", "formControlName", "price", "placeholder", "0.00", 1, "premium-input"], ["for", "discount"], ["pInputText", "", "type", "number", "id", "discount", "formControlName", "discount", "placeholder", "0", 1, "premium-input"], ["for", "video"], [1, "file-upload-wrapper"], ["type", "file", "id", "video", "accept", "video/*", 3, "change"], ["class", "upload-placeholder", 4, "ngIf"], ["class", "file-info", 4, "ngIf"], ["pButton", "", "type", "button", "label", "Cancel", 1, "p-button-outlined", "cancel-btn", 3, "click"], ["pButton", "", "type", "submit", "label", "Create Course", 1, "create-btn", 3, "disabled"], ["pInputText", "", "readonly", "", 1, "premium-input", 3, "value"], [1, "upload-placeholder"], [1, "pi", "pi-cloud-upload"], [1, "file-info"], [1, "pi", "pi-video"]], template: function AddCourseComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "label", 3);
            i0.ɵɵtext(4, "Select Course");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(5, "select", 4);
            i0.ɵɵlistener("change", function AddCourseComponent_Template_select_change_5_listener($event) { return ctx.onCourseChange($event); });
            i0.ɵɵrepeaterCreate(6, AddCourseComponent_For_7_Template, 2, 2, "option", 5, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵconditionalCreate(8, AddCourseComponent_Conditional_8_Template, 9, 2, "div", 6);
            i0.ɵɵelementStart(9, "div", 2)(10, "label", 7);
            i0.ɵɵtext(11, "Course Content JSON");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "textarea", 8);
            i0.ɵɵtwoWayListener("ngModelChange", function AddCourseComponent_Template_textarea_ngModelChange_12_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.importJson, $event) || (ctx.importJson = $event); return $event; });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(13, "div", 2)(14, "label", 9);
            i0.ɵɵtext(15, "Upload PDF/PPT/Doc/Image/Video Asset");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "input", 10);
            i0.ɵɵlistener("change", function AddCourseComponent_Template_input_change_16_listener($event) { return ctx.onAssetSelected($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(17, AddCourseComponent_Conditional_17_Template, 2, 1, "small");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(18, AddCourseComponent_Conditional_18_Template, 2, 1, "p", 11);
            i0.ɵɵconditionalCreate(19, AddCourseComponent_Conditional_19_Template, 2, 1, "p", 12);
            i0.ɵɵelementStart(20, "div", 13)(21, "button", 14);
            i0.ɵɵlistener("click", function AddCourseComponent_Template_button_click_21_listener() { return ctx.importContent(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "button", 15);
            i0.ɵɵlistener("click", function AddCourseComponent_Template_button_click_22_listener() { return ctx.publishContent(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "button", 16);
            i0.ɵɵlistener("click", function AddCourseComponent_Template_button_click_23_listener() { return ctx.unpublishContent(); });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(24, "div", 1)(25, "form", 17);
            i0.ɵɵlistener("ngSubmit", function AddCourseComponent_Template_form_ngSubmit_25_listener() { return ctx.onSubmit(); });
            i0.ɵɵelementStart(26, "div", 2)(27, "label", 18);
            i0.ɵɵtext(28, "Course Title");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(29, "input", 19);
            i0.ɵɵtemplate(30, AddCourseComponent_small_30_Template, 2, 0, "small", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "div", 2)(32, "label", 21);
            i0.ɵɵtext(33, "Description");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(34, "textarea", 22);
            i0.ɵɵtemplate(35, AddCourseComponent_small_35_Template, 2, 0, "small", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "div", 6)(37, "div", 2)(38, "label", 23);
            i0.ɵɵtext(39, "Price ($)");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(40, "input", 24);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "div", 2)(42, "label", 25);
            i0.ɵɵtext(43, "Discount (%)");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(44, "input", 26);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(45, "div", 2)(46, "label", 27);
            i0.ɵɵtext(47, "Course Intro Video");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "div", 28)(49, "input", 29);
            i0.ɵɵlistener("change", function AddCourseComponent_Template_input_change_49_listener($event) { return ctx.onFileSelected($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(50, AddCourseComponent_div_50_Template, 4, 0, "div", 30)(51, AddCourseComponent_div_51_Template, 4, 1, "div", 31);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(52, "div", 13)(53, "button", 32);
            i0.ɵɵlistener("click", function AddCourseComponent_Template_button_click_53_listener() { return ctx.onCancel(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelement(54, "button", 33);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            let tmp_9_0;
            let tmp_10_0;
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("value", ctx.selectedCourseId);
            i0.ɵɵadvance();
            i0.ɵɵrepeater(ctx.courses);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.content ? 8 : -1);
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.importJson);
            i0.ɵɵproperty("ngModelOptions", i0.ɵɵpureFunction0(13, _c0));
            i0.ɵɵadvance(5);
            i0.ɵɵconditional(ctx.uploadedAssetUrl ? 17 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.contentMessage ? 18 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.contentError ? 19 : -1);
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("formGroup", ctx.courseForm);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ((tmp_9_0 = ctx.courseForm.get("title")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx.courseForm.get("title")) == null ? null : tmp_9_0.touched));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngIf", ((tmp_10_0 = ctx.courseForm.get("description")) == null ? null : tmp_10_0.invalid) && ((tmp_10_0 = ctx.courseForm.get("description")) == null ? null : tmp_10_0.touched));
            i0.ɵɵadvance(15);
            i0.ɵɵproperty("ngIf", !ctx.selectedFileName);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.selectedFileName);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("disabled", ctx.courseForm.invalid);
        } }, dependencies: [CommonModule, i4.NgIf, FormsModule, i1.ɵNgNoValidate, i1.NgSelectOption, i1.ɵNgSelectMultipleOption, i1.DefaultValueAccessor, i1.NumberValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.NgModel, ReactiveFormsModule, i1.FormGroupDirective, i1.FormControlName, ButtonModule, i5.ButtonDirective, InputTextModule, i6.InputText, BreadcrumbModule], styles: [".add-course-container[_ngcontent-%COMP%] {\n    padding: 2rem;\n    min-height: 100vh;\n    background: #F9FAFB;\n}\n\n.page-header[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    margin-bottom: 2rem;\n\n    .back-icon-btn {\n        background: white;\n        border: 1px solid #E5E7EB;\n        width: 40px;\n        height: 40px;\n        border-radius: 50%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        color: #6B7280;\n        transition: all 0.2s;\n\n        &:hover {\n            color: var(--primary-color);\n            background: #EFF6FF;\n            border-color: #BFDBFE;\n        }\n\n        i {\n            font-size: 14px;\n        }\n    }\n\n    ::ng-deep .p-breadcrumb {\n        background: transparent;\n        padding: 0;\n\n        .p-menuitem-text {\n            color: #6B7280;\n            font-weight: 500;\n        }\n\n        li:last-child .p-menuitem-text {\n            color: var(--sqx-color-text);\n            font-weight: 700;\n        }\n    }\n}\n\n.form-card-premium[_ngcontent-%COMP%] {\n    background: white;\n    padding: 2.5rem;\n    border-radius: 20px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);\n    width: 100%;\n    // Removed max-width to allow full width as requested\n    border: 1px solid #F3F4F6;\n\n    .form-title {\n        font-size: 20px;\n        font-weight: 700;\n        color: var(--sqx-color-text);\n        margin-bottom: 2rem;\n        padding-bottom: 1rem;\n        border-bottom: 1px solid #F3F4F6;\n    }\n\n    form {\n        display: flex;\n        flex-direction: column;\n        gap: 2rem;\n    }\n\n    .form-group {\n        display: flex;\n        flex-direction: column;\n        gap: 0.75rem;\n\n        label {\n            font-weight: 600;\n            color: var(--sqx-color-text);\n            font-size: 14px;\n        }\n\n        .premium-input {\n            width: 100%;\n            padding: 12px 16px;\n            border-radius: 10px;\n            border: 1px solid #E5E7EB;\n            background: #F9FAFB;\n            color: var(--sqx-color-text);\n            transition: all 0.2s;\n            font-size: 14px;\n\n            &:focus {\n                border-color: var(--primary-color);\n                background: white;\n                box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);\n            }\n        }\n\n        .error {\n            color: #EF4444;\n            font-size: 0.85rem;\n            margin-top: 4px;\n        }\n    }\n\n    .form-grid {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 2rem;\n    }\n\n    .file-upload-wrapper {\n        position: relative;\n        border: 2px dashed #E5E7EB;\n        border-radius: 12px;\n        padding: 3rem;\n        text-align: center;\n        cursor: pointer;\n        transition: all 0.2s;\n        background: #F9FAFB;\n\n        &:hover {\n            border-color: var(--primary-color);\n            background: #EFF6FF;\n\n            .upload-placeholder i {\n                color: var(--primary-color);\n            }\n        }\n\n        input[type=\"file\"] {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            opacity: 0;\n            cursor: pointer;\n        }\n\n        .upload-placeholder {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            gap: 1rem;\n            color: #6B7280;\n\n            i {\n                font-size: 2.5rem;\n                color: #9CA3AF;\n                transition: color 0.2s;\n            }\n        }\n\n        .file-info {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            gap: 0.75rem;\n            color: var(--primary-color);\n            font-weight: 600;\n\n            i {\n                font-size: 1.5rem;\n            }\n        }\n    }\n\n    .form-actions {\n        display: flex;\n        justify-content: flex-end;\n        gap: 1rem;\n        margin-top: 2rem;\n        padding-top: 2rem;\n        border-top: 1px solid #F3F4F6;\n\n        .create-btn {\n            background: var(--sqx-color-primary);\n            border: none;\n            padding: 12px 30px;\n            font-weight: 600;\n            border-radius: 8px;\n            color: white; // Ensure text is white\n\n            &:disabled {\n                background: var(--sqx-color-primary) !important;\n                opacity: 0.5 !important; // Override PrimeNG disabled opacity/bg\n                color: white !important;\n                border: none !important;\n                cursor: not-allowed;\n            }\n        }\n\n        .cancel-btn {\n            color: #6B7280;\n            font-weight: 600;\n            border: 1px solid #D1D5DB !important; // Add border to make it visible\n            padding: 12px 24px; // Match padding roughly\n            border-radius: 8px;\n\n            &:hover {\n                color: #374151;\n                background: #F3F4F6;\n                border-color: #9CA3AF !important;\n            }\n        }\n    }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddCourseComponent, [{
        type: Component,
        args: [{ selector: 'app-add-course', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    ButtonModule,
                    InputTextModule,
                    BreadcrumbModule
                ], template: "<div class=\"add-course-container\">\n\n    <!-- Header with Breadcrumb -->\n    <!-- Header with Breadcrumb Removed (Using Global Header) -->\n\n    <div class=\"form-card-premium\">\n        <div class=\"form-group\">\n            <label for=\"courseSelect\">Select Course</label>\n            <select id=\"courseSelect\" class=\"premium-input\" [value]=\"selectedCourseId\" (change)=\"onCourseChange($event)\">\n                @for (course of courses; track course.id) {\n                <option [value]=\"course.id\">{{ course.name }}</option>\n                }\n            </select>\n        </div>\n\n        @if (content) {\n        <div class=\"form-grid\">\n            <div class=\"form-group\">\n                <label>Status</label>\n                <input pInputText class=\"premium-input\" [value]=\"content.status\" readonly>\n            </div>\n            <div class=\"form-group\">\n                <label>Modules</label>\n                <input pInputText class=\"premium-input\" [value]=\"content.modules.length\" readonly>\n            </div>\n        </div>\n        }\n\n        <div class=\"form-group\">\n            <label for=\"contentJson\">Course Content JSON</label>\n            <textarea pInputText id=\"contentJson\" rows=\"18\" class=\"premium-input\" [(ngModel)]=\"importJson\"\n                [ngModelOptions]=\"{standalone: true}\"></textarea>\n        </div>\n\n        <div class=\"form-group\">\n            <label for=\"assetUpload\">Upload PDF/PPT/Doc/Image/Video Asset</label>\n            <input id=\"assetUpload\" type=\"file\" (change)=\"onAssetSelected($event)\"\n                accept=\".pdf,.ppt,.pptx,.doc,.docx,.png,.jpg,.jpeg,.webp,.mp4\">\n            @if (uploadedAssetUrl) {\n            <small>Last uploaded: {{ uploadedAssetUrl }}</small>\n            }\n        </div>\n\n        @if (contentMessage) {\n        <p class=\"success\">{{ contentMessage }}</p>\n        }\n        @if (contentError) {\n        <p class=\"error\">{{ contentError }}</p>\n        }\n\n        <div class=\"form-actions\">\n            <button pButton type=\"button\" label=\"Save Draft / Import\" class=\"create-btn\" (click)=\"importContent()\"></button>\n            <button pButton type=\"button\" label=\"Publish\" class=\"create-btn\" (click)=\"publishContent()\"></button>\n            <button pButton type=\"button\" label=\"Unpublish\" class=\"p-button-outlined cancel-btn\"\n                (click)=\"unpublishContent()\"></button>\n        </div>\n    </div>\n\n    <!-- Legacy course form kept below for future course metadata work. -->\n    <div class=\"form-card-premium\">\n\n\n        <form [formGroup]=\"courseForm\" (ngSubmit)=\"onSubmit()\">\n\n            <div class=\"form-group\">\n                <label for=\"title\">Course Title</label>\n                <input pInputText id=\"title\" formControlName=\"title\" placeholder=\"Enter course title\"\n                    class=\"premium-input\">\n                <small class=\"error\" *ngIf=\"courseForm.get('title')?.invalid && courseForm.get('title')?.touched\">Title\n                    is required.</small>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"description\">Description</label>\n                <textarea pInputText id=\"description\" formControlName=\"description\" rows=\"6\"\n                    placeholder=\"Enter course description\" class=\"premium-input\"></textarea>\n                <small class=\"error\"\n                    *ngIf=\"courseForm.get('description')?.invalid && courseForm.get('description')?.touched\">Description\n                    is required.</small>\n            </div>\n\n            <div class=\"form-grid\">\n                <div class=\"form-group\">\n                    <label for=\"price\">Price ($)</label>\n                    <input pInputText type=\"number\" id=\"price\" formControlName=\"price\" placeholder=\"0.00\"\n                        class=\"premium-input\">\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"discount\">Discount (%)</label>\n                    <input pInputText type=\"number\" id=\"discount\" formControlName=\"discount\" placeholder=\"0\"\n                        class=\"premium-input\">\n                </div>\n            </div>\n\n            <div class=\"form-group\">\n                <label for=\"video\">Course Intro Video</label>\n                <div class=\"file-upload-wrapper\">\n                    <input type=\"file\" id=\"video\" (change)=\"onFileSelected($event)\" accept=\"video/*\">\n                    <div class=\"upload-placeholder\" *ngIf=\"!selectedFileName\">\n                        <i class=\"pi pi-cloud-upload\"></i>\n                        <span>Drag and drop or click to upload video</span>\n                    </div>\n                    <div class=\"file-info\" *ngIf=\"selectedFileName\">\n                        <i class=\"pi pi-video\"></i>\n                        <span>{{selectedFileName}}</span>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"form-actions\">\n                <button pButton type=\"button\" label=\"Cancel\" class=\"p-button-outlined cancel-btn\"\n                    (click)=\"onCancel()\"></button>\n                <button pButton type=\"submit\" label=\"Create Course\" [disabled]=\"courseForm.invalid\"\n                    class=\"create-btn\"></button>\n            </div>\n\n        </form>\n    </div>\n</div>\n", styles: [".add-course-container {\n    padding: 2rem;\n    min-height: 100vh;\n    background: #F9FAFB;\n}\n\n.page-header {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    margin-bottom: 2rem;\n\n    .back-icon-btn {\n        background: white;\n        border: 1px solid #E5E7EB;\n        width: 40px;\n        height: 40px;\n        border-radius: 50%;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        cursor: pointer;\n        color: #6B7280;\n        transition: all 0.2s;\n\n        &:hover {\n            color: var(--primary-color);\n            background: #EFF6FF;\n            border-color: #BFDBFE;\n        }\n\n        i {\n            font-size: 14px;\n        }\n    }\n\n    ::ng-deep .p-breadcrumb {\n        background: transparent;\n        padding: 0;\n\n        .p-menuitem-text {\n            color: #6B7280;\n            font-weight: 500;\n        }\n\n        li:last-child .p-menuitem-text {\n            color: var(--sqx-color-text);\n            font-weight: 700;\n        }\n    }\n}\n\n.form-card-premium {\n    background: white;\n    padding: 2.5rem;\n    border-radius: 20px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);\n    width: 100%;\n    // Removed max-width to allow full width as requested\n    border: 1px solid #F3F4F6;\n\n    .form-title {\n        font-size: 20px;\n        font-weight: 700;\n        color: var(--sqx-color-text);\n        margin-bottom: 2rem;\n        padding-bottom: 1rem;\n        border-bottom: 1px solid #F3F4F6;\n    }\n\n    form {\n        display: flex;\n        flex-direction: column;\n        gap: 2rem;\n    }\n\n    .form-group {\n        display: flex;\n        flex-direction: column;\n        gap: 0.75rem;\n\n        label {\n            font-weight: 600;\n            color: var(--sqx-color-text);\n            font-size: 14px;\n        }\n\n        .premium-input {\n            width: 100%;\n            padding: 12px 16px;\n            border-radius: 10px;\n            border: 1px solid #E5E7EB;\n            background: #F9FAFB;\n            color: var(--sqx-color-text);\n            transition: all 0.2s;\n            font-size: 14px;\n\n            &:focus {\n                border-color: var(--primary-color);\n                background: white;\n                box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb), 0.1);\n            }\n        }\n\n        .error {\n            color: #EF4444;\n            font-size: 0.85rem;\n            margin-top: 4px;\n        }\n    }\n\n    .form-grid {\n        display: grid;\n        grid-template-columns: 1fr 1fr;\n        gap: 2rem;\n    }\n\n    .file-upload-wrapper {\n        position: relative;\n        border: 2px dashed #E5E7EB;\n        border-radius: 12px;\n        padding: 3rem;\n        text-align: center;\n        cursor: pointer;\n        transition: all 0.2s;\n        background: #F9FAFB;\n\n        &:hover {\n            border-color: var(--primary-color);\n            background: #EFF6FF;\n\n            .upload-placeholder i {\n                color: var(--primary-color);\n            }\n        }\n\n        input[type=\"file\"] {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            opacity: 0;\n            cursor: pointer;\n        }\n\n        .upload-placeholder {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            gap: 1rem;\n            color: #6B7280;\n\n            i {\n                font-size: 2.5rem;\n                color: #9CA3AF;\n                transition: color 0.2s;\n            }\n        }\n\n        .file-info {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            gap: 0.75rem;\n            color: var(--primary-color);\n            font-weight: 600;\n\n            i {\n                font-size: 1.5rem;\n            }\n        }\n    }\n\n    .form-actions {\n        display: flex;\n        justify-content: flex-end;\n        gap: 1rem;\n        margin-top: 2rem;\n        padding-top: 2rem;\n        border-top: 1px solid #F3F4F6;\n\n        .create-btn {\n            background: var(--sqx-color-primary);\n            border: none;\n            padding: 12px 30px;\n            font-weight: 600;\n            border-radius: 8px;\n            color: white; // Ensure text is white\n\n            &:disabled {\n                background: var(--sqx-color-primary) !important;\n                opacity: 0.5 !important; // Override PrimeNG disabled opacity/bg\n                color: white !important;\n                border: none !important;\n                cursor: not-allowed;\n            }\n        }\n\n        .cancel-btn {\n            color: #6B7280;\n            font-weight: 600;\n            border: 1px solid #D1D5DB !important; // Add border to make it visible\n            padding: 12px 24px; // Match padding roughly\n            border-radius: 8px;\n\n            &:hover {\n                color: #374151;\n                background: #F3F4F6;\n                border-color: #9CA3AF !important;\n            }\n        }\n    }\n}"] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.Router }, { type: i3.HeaderService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AddCourseComponent, { className: "AddCourseComponent", filePath: "src/app/modules/courses/add-course/add-course.component.ts", lineNumber: 27 }); })();
