import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { HeaderService } from '../core/services/header.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/avatar";
import * as i2 from "primeng/tag";
const _forTrack0 = ($index, $item) => $item.id;
function BatchDetailComponent_Conditional_0_Conditional_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18)(1, "span", 19);
    i0.ɵɵtext(2, "END DATE");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 20);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.formatDate(ctx_r0.batch().endDate));
} }
function BatchDetailComponent_Conditional_0_For_49_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 30);
    i0.ɵɵelement(1, "i", 31);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const student_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", student_r2.email, " ");
} }
function BatchDetailComponent_Conditional_0_For_49_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵelement(1, "p-avatar", 27);
    i0.ɵɵelementStart(2, "div", 28)(3, "h3", 29);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(5, BatchDetailComponent_Conditional_0_For_49_Conditional_5_Template, 3, 1, "p", 30);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const student_r2 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("image", student_r2.avatar);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(student_r2.name);
    i0.ɵɵadvance();
    i0.ɵɵconditional(student_r2.email ? 5 : -1);
} }
function BatchDetailComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 0)(1, "div", 2)(2, "div", 3)(3, "div", 4)(4, "div", 5)(5, "h1", 6);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 7);
    i0.ɵɵelement(8, "i", 8);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 9);
    i0.ɵɵelement(11, "p-tag", 10);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 11)(13, "div", 12)(14, "div", 13);
    i0.ɵɵelement(15, "i", 14);
    i0.ɵɵelementStart(16, "h2", 15);
    i0.ɵɵtext(17, "Batch Information");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "div", 16)(19, "div", 17)(20, "div", 18)(21, "span", 19);
    i0.ɵɵtext(22, "BATCH NAME");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 20);
    i0.ɵɵtext(24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(25, "div", 18)(26, "span", 19);
    i0.ɵɵtext(27, "TOTAL STUDENTS");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "span", 20);
    i0.ɵɵtext(29);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(30, "div", 18)(31, "span", 19);
    i0.ɵɵtext(32, "START DATE");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(33, "span", 20);
    i0.ɵɵtext(34);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(35, BatchDetailComponent_Conditional_0_Conditional_35_Template, 5, 1, "div", 18);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 21)(37, "span", 19);
    i0.ɵɵtext(38, "DESCRIPTION");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(39, "p", 22);
    i0.ɵɵtext(40);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(41, "div", 23)(42, "div", 13);
    i0.ɵɵelement(43, "i", 24);
    i0.ɵɵelementStart(44, "h2", 15);
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "div", 16)(47, "div", 25);
    i0.ɵɵrepeaterCreate(48, BatchDetailComponent_Conditional_0_For_49_Template, 6, 3, "div", 26, _forTrack0);
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.batch().name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getDateRange(), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r0.batch().studentCount + " Students");
    i0.ɵɵadvance(13);
    i0.ɵɵtextInterpolate(ctx_r0.batch().name);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.batch().studentCount);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.formatDate(ctx_r0.batch().startDate));
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.batch().endDate ? 35 : -1);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(ctx_r0.batch().description);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1("Enrolled Students (", ctx_r0.students().length, ")");
    i0.ɵɵadvance(3);
    i0.ɵɵrepeater(ctx_r0.students());
} }
function BatchDetailComponent_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelement(1, "i", 32);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading batch details...");
    i0.ɵɵelementEnd()();
} }
export class BatchDetailComponent {
    route = inject(ActivatedRoute);
    router = inject(Router);
    headerService = inject(HeaderService);
    batch = signal(null, ...(ngDevMode ? [{ debugName: "batch" }] : []));
    students = signal([], ...(ngDevMode ? [{ debugName: "students" }] : []));
    ngOnInit() {
        const batchId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadBatchData(batchId);
    }
    loadBatchData(batchId) {
        // Load from localStorage (in a real app, this would be a service)
        if (typeof window !== 'undefined') {
            const batchesData = localStorage.getItem('batchesData');
            const studentsData = localStorage.getItem('studentsData');
            if (batchesData && studentsData) {
                const batches = JSON.parse(batchesData);
                const allStudents = JSON.parse(studentsData);
                const foundBatch = batches.find(b => b.id === batchId);
                if (foundBatch) {
                    const batchStudents = allStudents.filter(s => foundBatch.studentIds.includes(s.id));
                    this.batch.set({
                        ...foundBatch,
                        students: batchStudents,
                        studentCount: foundBatch.studentIds.length
                    });
                    this.students.set(batchStudents);
                    // Set custom breadcrumb with batch name
                    this.headerService.updateBreadcrumbs([
                        { label: 'Home', icon: 'pi pi-home', url: '/dashboard' },
                        { label: 'Batches', url: '/batches' },
                        { label: foundBatch.name, title: foundBatch.name }
                    ]);
                }
            }
        }
    }
    goBack() {
        this.router.navigate(['/batches']);
    }
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    getDateRange() {
        const batch = this.batch();
        if (!batch)
            return '';
        const start = this.formatDate(batch.startDate);
        const end = batch.endDate ? this.formatDate(batch.endDate) : 'Ongoing';
        return `${start} - ${end}`;
    }
    static ɵfac = function BatchDetailComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BatchDetailComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BatchDetailComponent, selectors: [["sqx-batch-detail"]], decls: 2, vars: 1, consts: [[1, "batch-detail-container"], [1, "loading-state"], [1, "batch-detail-content"], [1, "batch-header-card"], [1, "header-main"], [1, "header-left"], [1, "batch-title"], [1, "batch-duration"], [1, "pi", "pi-calendar"], [1, "header-right"], ["severity", "secondary", 1, "student-count-badge", 3, "value"], [1, "content-grid"], [1, "info-card"], [1, "card-header"], [1, "pi", "pi-info-circle"], [1, "card-title"], [1, "card-body"], [1, "info-grid"], [1, "info-item"], [1, "info-label"], [1, "info-value"], [1, "description-section"], [1, "description-text"], [1, "students-card"], [1, "pi", "pi-users"], [1, "students-grid"], [1, "student-card"], ["shape", "circle", "size", "large", 1, "student-avatar", 3, "image"], [1, "student-info"], [1, "student-name"], [1, "student-email"], [1, "pi", "pi-envelope"], [1, "pi", "pi-spin", "pi-spinner", "loading-icon"]], template: function BatchDetailComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, BatchDetailComponent_Conditional_0_Template, 50, 9, "div", 0)(1, BatchDetailComponent_Conditional_1_Template, 4, 0, "div", 1);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.batch() ? 0 : 1);
        } }, dependencies: [CommonModule,
            ButtonModule,
            AvatarModule, i1.Avatar, TagModule, i2.Tag, CardModule], styles: [".batch-detail-container[_ngcontent-%COMP%] {\n    padding: var(--sqx-space-8);\n    min-height: 100vh;\n    background: #F9FAFB;\n}\n\n//[_ngcontent-%COMP%]   Batch[_ngcontent-%COMP%]   Detail[_ngcontent-%COMP%]   Content\n.batch-detail-content[_ngcontent-%COMP%] {\n    max-width: 1200px;\n    margin: 0 auto;\n}\n\n//[_ngcontent-%COMP%]   Batch[_ngcontent-%COMP%]   Header[_ngcontent-%COMP%]   Card\n.batch-header-card[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: var(--sqx-radius-lg);\n    padding: var(--sqx-space-6);\n    margin-bottom: var(--sqx-space-6);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n\n.header-main[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    gap: 2rem;\n\n    @media (max-width: 768px) {\n        flex-direction: column;\n    }\n}\n\n.header-left[_ngcontent-%COMP%] {\n    flex: 1;\n}\n\n.batch-title[_ngcontent-%COMP%] {\n    font-size: 2rem;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin: 0 0 0.75rem 0;\n}\n\n.batch-duration[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n    color: #6b7280;\n    margin: 0;\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n\n    i {\n        color: var(--primary-color);\n    }\n}\n\n.header-right[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n}\n\n.student-count-badge[_ngcontent-%COMP%] {\n    background-color: #f3f4f6 !important;\n    color: #6b7280 !important;\n    border: none !important;\n    padding: 0.75rem 1.25rem !important;\n    font-size: 0.95rem !important;\n    font-weight: 600 !important;\n}\n\n//[_ngcontent-%COMP%]   Content[_ngcontent-%COMP%]   Grid\n.content-grid[_ngcontent-%COMP%] {\n    display: grid;\n    gap: var(--sqx-space-6);\n}\n\n//[_ngcontent-%COMP%]   Cards\n.info-card[_ngcontent-%COMP%], \n.students-card[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: var(--sqx-radius-lg);\n    overflow: hidden;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n\n.card-header[_ngcontent-%COMP%] {\n    background: #F9FAFB;\n    padding: 1.25rem 1.5rem;\n    border-bottom: 1px solid #e5e7eb;\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n\n    i {\n        font-size: 1.25rem;\n        color: var(--primary-color);\n    }\n}\n\n.card-title[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n    margin: 0;\n}\n\n.card-body[_ngcontent-%COMP%] {\n    padding: var(--sqx-space-6);\n}\n\n//[_ngcontent-%COMP%]   Info[_ngcontent-%COMP%]   Grid\n.info-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: var(--sqx-space-5);\n    margin-bottom: var(--sqx-space-5);\n}\n\n.info-item[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n}\n\n.info-label[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n    font-weight: 600;\n    color: #9ca3af;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n}\n\n.info-value[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n}\n\n//[_ngcontent-%COMP%]   Description[_ngcontent-%COMP%]   Section\n.description-section[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n    padding-top: var(--sqx-space-5);\n    border-top: 1px solid #f3f4f6;\n}\n\n.description-text[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n    color: #6b7280;\n    line-height: 1.7;\n    margin: 0;\n}\n\n//[_ngcontent-%COMP%]   Students[_ngcontent-%COMP%]   Grid\n.students-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n    gap: var(--sqx-space-4);\n}\n\n.student-card[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    padding: 1rem;\n    background: #F9FAFB;\n    border-radius: var(--sqx-radius-md);\n    border: 1px solid #e5e7eb;\n    transition: all 0.2s;\n\n    &:hover {\n        background: white;\n        border-color: var(--primary-color);\n        box-shadow: 0 2px 8px rgba(108, 92, 231, 0.1);\n    }\n}\n\n.student-avatar[_ngcontent-%COMP%] {\n    flex-shrink: 0;\n\n    ::ng-deep .p-avatar {\n        width: 3rem;\n        height: 3rem;\n        border: 2px solid white;\n        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    }\n}\n\n.student-info[_ngcontent-%COMP%] {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 0.375rem;\n    min-width: 0;\n}\n\n.student-name[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n    margin: 0;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.student-email[_ngcontent-%COMP%] {\n    font-size: 0.8125rem;\n    color: #6b7280;\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n\n    i {\n        color: var(--primary-color);\n        font-size: 0.75rem;\n        flex-shrink: 0;\n    }\n}\n\n//[_ngcontent-%COMP%]   Loading[_ngcontent-%COMP%]   State\n.loading-state[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    min-height: 100vh;\n    gap: 1.5rem;\n}\n\n.loading-icon[_ngcontent-%COMP%] {\n    font-size: 3rem;\n    color: var(--primary-color);\n}\n\n.loading-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n    color: #6b7280;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BatchDetailComponent, [{
        type: Component,
        args: [{ selector: 'sqx-batch-detail', standalone: true, imports: [
                    CommonModule,
                    ButtonModule,
                    AvatarModule,
                    TagModule,
                    CardModule
                ], template: "@if (batch()) {\n<div class=\"batch-detail-container\">\n    <!-- Main Content -->\n    <div class=\"batch-detail-content\">\n        <!-- Batch Header Card -->\n        <div class=\"batch-header-card\">\n            <div class=\"header-main\">\n                <div class=\"header-left\">\n                    <h1 class=\"batch-title\">{{ batch()!.name }}</h1>\n                    <p class=\"batch-duration\">\n                        <i class=\"pi pi-calendar\"></i>\n                        {{ getDateRange() }}\n                    </p>\n                </div>\n                <div class=\"header-right\">\n                    <p-tag [value]=\"batch()!.studentCount + ' Students'\" severity=\"secondary\"\n                        class=\"student-count-badge\"></p-tag>\n                </div>\n            </div>\n        </div>\n\n        <!-- Content Grid -->\n        <div class=\"content-grid\">\n            <!-- Batch Information Card -->\n            <div class=\"info-card\">\n                <div class=\"card-header\">\n                    <i class=\"pi pi-info-circle\"></i>\n                    <h2 class=\"card-title\">Batch Information</h2>\n                </div>\n                <div class=\"card-body\">\n                    <div class=\"info-grid\">\n                        <div class=\"info-item\">\n                            <span class=\"info-label\">BATCH NAME</span>\n                            <span class=\"info-value\">{{ batch()!.name }}</span>\n                        </div>\n                        <div class=\"info-item\">\n                            <span class=\"info-label\">TOTAL STUDENTS</span>\n                            <span class=\"info-value\">{{ batch()!.studentCount }}</span>\n                        </div>\n                        <div class=\"info-item\">\n                            <span class=\"info-label\">START DATE</span>\n                            <span class=\"info-value\">{{ formatDate(batch()!.startDate) }}</span>\n                        </div>\n                        @if (batch()!.endDate) {\n                        <div class=\"info-item\">\n                            <span class=\"info-label\">END DATE</span>\n                            <span class=\"info-value\">{{ formatDate(batch()!.endDate!) }}</span>\n                        </div>\n                        }\n                    </div>\n                    <div class=\"description-section\">\n                        <span class=\"info-label\">DESCRIPTION</span>\n                        <p class=\"description-text\">{{ batch()!.description }}</p>\n                    </div>\n                </div>\n            </div>\n\n            <!-- Students List Card -->\n            <div class=\"students-card\">\n                <div class=\"card-header\">\n                    <i class=\"pi pi-users\"></i>\n                    <h2 class=\"card-title\">Enrolled Students ({{ students().length }})</h2>\n                </div>\n                <div class=\"card-body\">\n                    <div class=\"students-grid\">\n                        @for (student of students(); track student.id) {\n                        <div class=\"student-card\">\n                            <p-avatar [image]=\"student.avatar\" shape=\"circle\" size=\"large\"\n                                class=\"student-avatar\"></p-avatar>\n                            <div class=\"student-info\">\n                                <h3 class=\"student-name\">{{ student.name }}</h3>\n                                @if (student.email) {\n                                <p class=\"student-email\">\n                                    <i class=\"pi pi-envelope\"></i>\n                                    {{ student.email }}\n                                </p>\n                                }\n                            </div>\n                        </div>\n                        }\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n} @else {\n<div class=\"loading-state\">\n    <i class=\"pi pi-spin pi-spinner loading-icon\"></i>\n    <p>Loading batch details...</p>\n</div>\n}", styles: [".batch-detail-container {\n    padding: var(--sqx-space-8);\n    min-height: 100vh;\n    background: #F9FAFB;\n}\n\n// Batch Detail Content\n.batch-detail-content {\n    max-width: 1200px;\n    margin: 0 auto;\n}\n\n// Batch Header Card\n.batch-header-card {\n    background: white;\n    border-radius: var(--sqx-radius-lg);\n    padding: var(--sqx-space-6);\n    margin-bottom: var(--sqx-space-6);\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n\n.header-main {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    gap: 2rem;\n\n    @media (max-width: 768px) {\n        flex-direction: column;\n    }\n}\n\n.header-left {\n    flex: 1;\n}\n\n.batch-title {\n    font-size: 2rem;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin: 0 0 0.75rem 0;\n}\n\n.batch-duration {\n    font-size: 0.95rem;\n    color: #6b7280;\n    margin: 0;\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n\n    i {\n        color: var(--primary-color);\n    }\n}\n\n.header-right {\n    display: flex;\n    align-items: flex-start;\n}\n\n.student-count-badge {\n    background-color: #f3f4f6 !important;\n    color: #6b7280 !important;\n    border: none !important;\n    padding: 0.75rem 1.25rem !important;\n    font-size: 0.95rem !important;\n    font-weight: 600 !important;\n}\n\n// Content Grid\n.content-grid {\n    display: grid;\n    gap: var(--sqx-space-6);\n}\n\n// Cards\n.info-card,\n.students-card {\n    background: white;\n    border-radius: var(--sqx-radius-lg);\n    overflow: hidden;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\n}\n\n.card-header {\n    background: #F9FAFB;\n    padding: 1.25rem 1.5rem;\n    border-bottom: 1px solid #e5e7eb;\n    display: flex;\n    align-items: center;\n    gap: 0.75rem;\n\n    i {\n        font-size: 1.25rem;\n        color: var(--primary-color);\n    }\n}\n\n.card-title {\n    font-size: 1.125rem;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n    margin: 0;\n}\n\n.card-body {\n    padding: var(--sqx-space-6);\n}\n\n// Info Grid\n.info-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: var(--sqx-space-5);\n    margin-bottom: var(--sqx-space-5);\n}\n\n.info-item {\n    display: flex;\n    flex-direction: column;\n    gap: 0.5rem;\n}\n\n.info-label {\n    font-size: 0.75rem;\n    font-weight: 600;\n    color: #9ca3af;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n}\n\n.info-value {\n    font-size: 1rem;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n}\n\n// Description Section\n.description-section {\n    display: flex;\n    flex-direction: column;\n    gap: 0.75rem;\n    padding-top: var(--sqx-space-5);\n    border-top: 1px solid #f3f4f6;\n}\n\n.description-text {\n    font-size: 0.95rem;\n    color: #6b7280;\n    line-height: 1.7;\n    margin: 0;\n}\n\n// Students Grid\n.students-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n    gap: var(--sqx-space-4);\n}\n\n.student-card {\n    display: flex;\n    align-items: center;\n    gap: 1rem;\n    padding: 1rem;\n    background: #F9FAFB;\n    border-radius: var(--sqx-radius-md);\n    border: 1px solid #e5e7eb;\n    transition: all 0.2s;\n\n    &:hover {\n        background: white;\n        border-color: var(--primary-color);\n        box-shadow: 0 2px 8px rgba(108, 92, 231, 0.1);\n    }\n}\n\n.student-avatar {\n    flex-shrink: 0;\n\n    ::ng-deep .p-avatar {\n        width: 3rem;\n        height: 3rem;\n        border: 2px solid white;\n        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    }\n}\n\n.student-info {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    gap: 0.375rem;\n    min-width: 0;\n}\n\n.student-name {\n    font-size: 0.95rem;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n    margin: 0;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n}\n\n.student-email {\n    font-size: 0.8125rem;\n    color: #6b7280;\n    display: flex;\n    align-items: center;\n    gap: 0.5rem;\n    margin: 0;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n\n    i {\n        color: var(--primary-color);\n        font-size: 0.75rem;\n        flex-shrink: 0;\n    }\n}\n\n// Loading State\n.loading-state {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    min-height: 100vh;\n    gap: 1.5rem;\n}\n\n.loading-icon {\n    font-size: 3rem;\n    color: var(--primary-color);\n}\n\n.loading-state p {\n    font-size: 1.125rem;\n    color: #6b7280;\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BatchDetailComponent, { className: "BatchDetailComponent", filePath: "src/app/modules/batches/batch-detail.component.ts", lineNumber: 24 }); })();
