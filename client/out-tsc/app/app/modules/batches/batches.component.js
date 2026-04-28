import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "primeng/button";
import * as i3 from "primeng/inputtext";
import * as i4 from "primeng/avatar";
import * as i5 from "primeng/avatargroup";
import * as i6 from "primeng/tag";
const _c0 = () => ({ "background-color": "var(--sqx-color-primary)", "color": "#ffffff" });
const _forTrack0 = ($index, $item) => $item.id;
function BatchesComponent_For_7_Conditional_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "i", 26);
    i0.ɵɵelementStart(2, "div")(3, "span", 16);
    i0.ɵɵtext(4, "END DATE");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 17);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const batch_r2 = i0.ɵɵnextContext().$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r2.formatDate(batch_r2.endDate));
} }
function BatchesComponent_For_7_For_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-avatar", 23);
} if (rf & 2) {
    const student_r4 = ctx.$implicit;
    i0.ɵɵproperty("image", student_r4.avatar);
} }
function BatchesComponent_For_7_Conditional_25_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "p-avatar", 27);
} if (rf & 2) {
    const batch_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵstyleMap(i0.ɵɵpureFunction0(3, _c0));
    i0.ɵɵproperty("label", "+" + (batch_r2.students.length - 5));
} }
function BatchesComponent_For_7_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵlistener("click", function BatchesComponent_For_7_Template_div_click_0_listener() { const batch_r2 = i0.ɵɵrestoreView(_r1).$implicit; const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.viewBatchDetails(batch_r2.id)); });
    i0.ɵɵelementStart(1, "div", 9)(2, "h3", 10);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "p-tag", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "p", 12);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 13)(8, "div", 14);
    i0.ɵɵelement(9, "i", 15);
    i0.ɵɵelementStart(10, "div")(11, "span", 16);
    i0.ɵɵtext(12, "START DATE");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 17);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()()();
    i0.ɵɵconditionalCreate(15, BatchesComponent_For_7_Conditional_15_Template, 7, 1, "div", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "div", 18)(17, "div", 19)(18, "span", 20);
    i0.ɵɵtext(19, "ENROLLED STUDENTS");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "span", 21);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(22, "p-avatarGroup", 22);
    i0.ɵɵrepeaterCreate(23, BatchesComponent_For_7_For_24_Template, 1, 1, "p-avatar", 23, _forTrack0);
    i0.ɵɵconditionalCreate(25, BatchesComponent_For_7_Conditional_25_Template, 1, 4, "p-avatar", 24);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(26, "button", 25);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const batch_r2 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(batch_r2.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("value", batch_r2.studentCount + " Students");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(batch_r2.description);
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r2.formatDate(batch_r2.startDate));
    i0.ɵɵadvance();
    i0.ɵɵconditional(batch_r2.endDate ? 15 : -1);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(batch_r2.studentCount);
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(batch_r2.students.slice(0, 5));
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(batch_r2.students.length > 5 ? 25 : -1);
} }
function BatchesComponent_Conditional_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵelement(1, "i", 28);
    i0.ɵɵelementStart(2, "p", 29);
    i0.ɵɵtext(3, "No batches found");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p", 30);
    i0.ɵɵtext(5, "Try adjusting your search query");
    i0.ɵɵelementEnd()();
} }
export class BatchesComponent {
    router = inject(Router);
    // State
    searchQuery = signal('', ...(ngDevMode ? [{ debugName: "searchQuery" }] : []));
    // Mock Students Data
    students = [
        { id: 1, name: 'Fiona Gallagher', avatar: 'https://i.pravatar.cc/150?img=1', email: 'fiona@example.com' },
        { id: 2, name: 'George Martin', avatar: 'https://i.pravatar.cc/150?img=2', email: 'george@example.com' },
        { id: 3, name: 'Hannah Lee', avatar: 'https://i.pravatar.cc/150?img=3', email: 'hannah@example.com' },
        { id: 4, name: 'Ian Cooper', avatar: 'https://i.pravatar.cc/150?img=4', email: 'ian@example.com' },
        { id: 5, name: 'Julia Roberts', avatar: 'https://i.pravatar.cc/150?img=5', email: 'julia@example.com' },
        { id: 6, name: 'Kevin Brown', avatar: 'https://i.pravatar.cc/150?img=6', email: 'kevin@example.com' },
        { id: 7, name: 'Laura Davis', avatar: 'https://i.pravatar.cc/150?img=7', email: 'laura@example.com' },
        { id: 8, name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?img=8', email: 'michael@example.com' },
        { id: 9, name: 'Nina Patel', avatar: 'https://i.pravatar.cc/150?img=9', email: 'nina@example.com' },
        { id: 10, name: 'Oliver Smith', avatar: 'https://i.pravatar.cc/150?img=10', email: 'oliver@example.com' },
        { id: 11, name: 'Patricia Wilson', avatar: 'https://i.pravatar.cc/150?img=11', email: 'patricia@example.com' },
        { id: 12, name: 'Quinn Taylor', avatar: 'https://i.pravatar.cc/150?img=12', email: 'quinn@example.com' },
        { id: 13, name: 'Rachel Green', avatar: 'https://i.pravatar.cc/150?img=13', email: 'rachel@example.com' },
        { id: 14, name: 'Samuel Jackson', avatar: 'https://i.pravatar.cc/150?img=14', email: 'samuel@example.com' },
        { id: 15, name: 'Tina Turner', avatar: 'https://i.pravatar.cc/150?img=15', email: 'tina@example.com' },
    ];
    // Mock Batches Data
    rawBatches = [
        {
            id: 101,
            name: 'Web Development - Batch A',
            startDate: new Date('2024-01-15'),
            endDate: new Date('2024-06-15'),
            description: 'Full-stack web development course covering HTML, CSS, JavaScript, React, and Node.js. Students will build real-world projects and learn industry best practices.',
            studentIds: [1, 2, 3, 4, 5]
        },
        {
            id: 102,
            name: 'Web Development - Batch B',
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-07-01'),
            description: 'Full-stack web development course with focus on modern frameworks including React, Angular, and Vue.js. Includes advanced topics like state management and testing.',
            studentIds: [6, 7, 8, 9, 10]
        },
        {
            id: 103,
            name: 'Data Science - Batch A',
            startDate: new Date('2024-03-01'),
            endDate: new Date('2024-08-01'),
            description: 'Comprehensive data science program covering Python, Machine Learning, Deep Learning, and AI. Hands-on projects with real datasets.',
            studentIds: [11, 12, 13, 14, 15]
        },
        {
            id: 104,
            name: 'Mobile App Development',
            startDate: new Date('2024-01-20'),
            endDate: new Date('2024-06-20'),
            description: 'iOS and Android development using React Native and Flutter. Build cross-platform mobile applications with modern tools and frameworks.',
            studentIds: [1, 3, 5, 7, 9, 11]
        },
        {
            id: 105,
            name: 'Cloud Computing - AWS',
            startDate: new Date('2024-02-15'),
            description: 'AWS cloud architecture and deployment strategies. Learn EC2, S3, Lambda, and other AWS services. Prepare for AWS certification.',
            studentIds: [2, 4, 6, 8]
        },
        {
            id: 106,
            name: 'UI/UX Design Fundamentals',
            startDate: new Date('2024-03-10'),
            description: 'Design thinking, Figma, and user research methodologies. Create beautiful and functional user interfaces with industry-standard tools.',
            studentIds: [10, 12, 14, 15]
        }
    ];
    // Computed batches with students
    batches = computed(() => {
        return this.rawBatches.map(batch => ({
            ...batch,
            students: this.students.filter(s => batch.studentIds.includes(s.id)),
            studentCount: batch.studentIds.length
        }));
    }, ...(ngDevMode ? [{ debugName: "batches" }] : []));
    // Filtered batches based on search
    filteredBatches = computed(() => {
        const query = this.searchQuery().toLowerCase();
        if (!query)
            return this.batches();
        return this.batches().filter(batch => batch.name.toLowerCase().includes(query) ||
            batch.description.toLowerCase().includes(query));
    }, ...(ngDevMode ? [{ debugName: "filteredBatches" }] : []));
    ngOnInit() {
        // Store batches data in a service or state management solution
        // For now, we'll use localStorage as a simple solution
        if (typeof window !== 'undefined') {
            localStorage.setItem('batchesData', JSON.stringify(this.rawBatches));
            localStorage.setItem('studentsData', JSON.stringify(this.students));
        }
    }
    // Navigate to batch details
    viewBatchDetails(batchId) {
        this.router.navigate(['/batches', batchId]);
    }
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    static ɵfac = function BatchesComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BatchesComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: BatchesComponent, selectors: [["sqx-batches"]], decls: 9, vars: 2, consts: [[1, "batches-container"], [1, "batches-header"], [1, "p-input-icon-left", "search-wrapper"], [1, "pi", "pi-search"], ["type", "text", "pInputText", "", "placeholder", "Search batches...", 1, "search-input", 3, "ngModelChange", "ngModel"], [1, "batches-grid"], [1, "batch-card"], [1, "empty-state"], [1, "batch-card", 3, "click"], [1, "card-header"], [1, "batch-name"], ["severity", "secondary", 1, "student-badge", 3, "value"], [1, "batch-description"], [1, "date-row"], [1, "date-item"], [1, "pi", "pi-calendar-plus"], [1, "date-label"], [1, "date-value"], [1, "students-section"], [1, "students-header"], [1, "students-label"], [1, "students-count"], ["styleClass", "students-avatars"], ["shape", "circle", "size", "normal", 3, "image"], ["shape", "circle", "size", "normal", 3, "label", "style"], ["pButton", "", "label", "View Details", "icon", "pi pi-arrow-right", "iconPos", "right", 1, "view-details-btn"], [1, "pi", "pi-calendar-times"], ["shape", "circle", "size", "normal", 3, "label"], [1, "pi", "pi-inbox", "empty-icon"], [1, "empty-text"], [1, "empty-subtext"]], template: function BatchesComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
            i0.ɵɵelement(3, "i", 3);
            i0.ɵɵelementStart(4, "input", 4);
            i0.ɵɵtwoWayListener("ngModelChange", function BatchesComponent_Template_input_ngModelChange_4_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event); return $event; });
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(5, "div", 5);
            i0.ɵɵrepeaterCreate(6, BatchesComponent_For_7_Template, 27, 7, "div", 6, _forTrack0);
            i0.ɵɵconditionalCreate(8, BatchesComponent_Conditional_8_Template, 6, 0, "div", 7);
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchQuery);
            i0.ɵɵadvance(2);
            i0.ɵɵrepeater(ctx.filteredBatches());
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.filteredBatches().length === 0 ? 8 : -1);
        } }, dependencies: [CommonModule,
            FormsModule, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgModel, ButtonModule, i2.ButtonDirective, InputTextModule, i3.InputText, AvatarModule, i4.Avatar, AvatarGroupModule, i5.AvatarGroup, TagModule, i6.Tag, CardModule,
            TooltipModule], styles: [".batches-container[_ngcontent-%COMP%] {\n    padding: var(--sqx-space-8);\n}\n\n//[_ngcontent-%COMP%]   Simple[_ngcontent-%COMP%]   Header[_ngcontent-%COMP%]   like[_ngcontent-%COMP%]   Dashboard\n.batches-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: var(--sqx-space-6);\n\n    @media (max-width: 768px) {\n        flex-direction: column;\n        align-items: flex-start;\n        gap: var(--sqx-space-4);\n    }\n}\n\n.page-title[_ngcontent-%COMP%] {\n    font-size: 32px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin: 0;\n}\n\n//[_ngcontent-%COMP%]   Search[_ngcontent-%COMP%]   Input\n.search-wrapper[_ngcontent-%COMP%] {\n    position: relative;\n    width: 320px;\n\n    @media (max-width: 768px) {\n        width: 100%;\n    }\n\n    .pi-search {\n        position: absolute;\n        left: 1rem;\n        top: 50%;\n        transform: translateY(-50%);\n        color: #9ca3af;\n        font-size: 0.875rem;\n        z-index: 1;\n    }\n}\n\n.search-input[_ngcontent-%COMP%] {\n    width: 100%;\n    padding: 0.75rem 1rem 0.75rem 2.75rem !important;\n    border: 1px solid #e5e7eb;\n    border-radius: var(--sqx-radius-md);\n    font-size: 0.875rem;\n    transition: all 0.2s;\n\n    &:focus {\n        border-color: var(--primary-color);\n        box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);\n        outline: none;\n    }\n\n    &::placeholder {\n        color: #9ca3af;\n    }\n}\n\n//[_ngcontent-%COMP%]   Batch[_ngcontent-%COMP%]   Cards[_ngcontent-%COMP%]   Grid\n.batches-grid[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));\n    grid-auto-rows: 1fr;\n    gap: var(--sqx-space-5);\n\n    @media (max-width: 768px) {\n        grid-template-columns: 1fr;\n    }\n}\n\n.batch-card[_ngcontent-%COMP%] {\n    background: white;\n    border-radius: var(--sqx-radius-lg);\n    padding: var(--sqx-space-5);\n    cursor: pointer;\n    transition: all 0.2s ease;\n    border: 1px solid transparent;\n    display: flex;\n    flex-direction: column;\n    gap: var(--sqx-space-4);\n    height: 100%;\n\n    &:hover {\n        border-color: var(--primary-color);\n        box-shadow: 0 4px 12px rgba(108, 92, 231, 0.12);\n    }\n}\n\n//[_ngcontent-%COMP%]   Card[_ngcontent-%COMP%]   Header\n.card-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    gap: 1rem;\n}\n\n.batch-name[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n    margin: 0;\n    flex: 1;\n    line-height: 1.4;\n}\n\n.student-badge[_ngcontent-%COMP%] {\n    flex-shrink: 0;\n    background-color: #f3f4f6 !important;\n    color: #6b7280 !important;\n    border: none !important;\n}\n\n//[_ngcontent-%COMP%]   Description\n.batch-description[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n    color: #6b7280;\n    line-height: 1.6;\n    margin: 0;\n    display: -webkit-box;\n    line-clamp: 2;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n}\n\n//[_ngcontent-%COMP%]   Date[_ngcontent-%COMP%]   Row\n.date-row[_ngcontent-%COMP%] {\n    display: flex;\n    gap: var(--sqx-space-4);\n    flex-wrap: wrap;\n}\n\n.date-item[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.625rem;\n\n    i {\n        color: var(--primary-color);\n        font-size: 1rem;\n        margin-top: 2px;\n    }\n\n    div {\n        display: flex;\n        flex-direction: column;\n        gap: 0.125rem;\n    }\n}\n\n.date-label[_ngcontent-%COMP%] {\n    font-size: 0.6875rem;\n    font-weight: 600;\n    color: #9ca3af;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n}\n\n.date-value[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n    color: var(--sqx-color-text);\n    font-weight: 500;\n}\n\n//[_ngcontent-%COMP%]   Students[_ngcontent-%COMP%]   Section\n.students-section[_ngcontent-%COMP%] {\n    padding-top: var(--sqx-space-3);\n    border-top: 1px solid #f3f4f6;\n}\n\n.students-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: var(--sqx-space-3);\n}\n\n.students-label[_ngcontent-%COMP%] {\n    font-size: 0.6875rem;\n    font-weight: 600;\n    color: #9ca3af;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n}\n\n.students-count[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n    font-weight: 600;\n    color: var(--primary-color);\n}\n\n.students-avatars[_ngcontent-%COMP%] {\n    ::ng-deep .p-avatar {\n        width: 2.5rem;\n        height: 2.5rem;\n        border: 2px solid white;\n        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    }\n}\n\n//[_ngcontent-%COMP%]   View[_ngcontent-%COMP%]   Details[_ngcontent-%COMP%]   Button\n.view-details-btn[_ngcontent-%COMP%] {\n    width: 100%;\n    background: #EFF6FF !important;\n    color: var(--primary-color) !important;\n    border: none !important;\n    padding: 0.75rem 1.5rem;\n    font-weight: 600;\n    transition: all 0.2s;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    margin-top: auto;\n\n    &:hover {\n        background: #DBEAFE !important;\n    }\n}\n\n//[_ngcontent-%COMP%]   Empty[_ngcontent-%COMP%]   State\n.empty-state[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    text-align: center;\n    padding: 4rem 2rem;\n}\n\n.empty-icon[_ngcontent-%COMP%] {\n    font-size: 3rem;\n    color: #d1d5db;\n    margin-bottom: 1rem;\n}\n\n.empty-text[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n    font-weight: 600;\n    color: #6b7280;\n    margin: 0 0 0.5rem 0;\n}\n\n.empty-subtext[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n    color: #9ca3af;\n    margin: 0;\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BatchesComponent, [{
        type: Component,
        args: [{ selector: 'sqx-batches', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    ButtonModule,
                    InputTextModule,
                    AvatarModule,
                    AvatarGroupModule,
                    TagModule,
                    CardModule,
                    TooltipModule
                ], template: "<div class=\"batches-container\">\n    <!-- Simple Header like Dashboard -->\n    <div class=\"batches-header\">\n        <span class=\"p-input-icon-left search-wrapper\">\n            <i class=\"pi pi-search\"></i>\n            <input type=\"text\" pInputText [(ngModel)]=\"searchQuery\" placeholder=\"Search batches...\"\n                class=\"search-input\" />\n        </span>\n    </div>\n\n    <!-- Batch Cards Grid -->\n    <div class=\"batches-grid\">\n        @for (batch of filteredBatches(); track batch.id) {\n        <div class=\"batch-card\" (click)=\"viewBatchDetails(batch.id)\">\n            <!-- Card Header -->\n            <div class=\"card-header\">\n                <h3 class=\"batch-name\">{{ batch.name }}</h3>\n                <p-tag [value]=\"batch.studentCount + ' Students'\" severity=\"secondary\" class=\"student-badge\"></p-tag>\n            </div>\n\n            <!-- Description -->\n            <p class=\"batch-description\">{{ batch.description }}</p>\n\n            <!-- Date Info -->\n            <div class=\"date-row\">\n                <div class=\"date-item\">\n                    <i class=\"pi pi-calendar-plus\"></i>\n                    <div>\n                        <span class=\"date-label\">START DATE</span>\n                        <span class=\"date-value\">{{ formatDate(batch.startDate) }}</span>\n                    </div>\n                </div>\n                @if (batch.endDate) {\n                <div class=\"date-item\">\n                    <i class=\"pi pi-calendar-times\"></i>\n                    <div>\n                        <span class=\"date-label\">END DATE</span>\n                        <span class=\"date-value\">{{ formatDate(batch.endDate!) }}</span>\n                    </div>\n                </div>\n                }\n            </div>\n\n            <!-- Students Section -->\n            <div class=\"students-section\">\n                <div class=\"students-header\">\n                    <span class=\"students-label\">ENROLLED STUDENTS</span>\n                    <span class=\"students-count\">{{ batch.studentCount }}</span>\n                </div>\n                <p-avatarGroup styleClass=\"students-avatars\">\n                    @for (student of batch.students.slice(0, 5); track student.id) {\n                    <p-avatar [image]=\"student.avatar\" shape=\"circle\" size=\"normal\"></p-avatar>\n                    }\n                    @if (batch.students.length > 5) {\n                    <p-avatar [label]=\"'+' + (batch.students.length - 5)\" shape=\"circle\" size=\"normal\"\n                        [style]=\"{'background-color': 'var(--sqx-color-primary)', 'color': '#ffffff'}\"></p-avatar>\n                    }\n                </p-avatarGroup>\n            </div>\n\n            <!-- View Details Button -->\n            <button pButton label=\"View Details\" icon=\"pi pi-arrow-right\" iconPos=\"right\"\n                class=\"view-details-btn\"></button>\n        </div>\n        }\n\n        @if (filteredBatches().length === 0) {\n        <div class=\"empty-state\">\n            <i class=\"pi pi-inbox empty-icon\"></i>\n            <p class=\"empty-text\">No batches found</p>\n            <p class=\"empty-subtext\">Try adjusting your search query</p>\n        </div>\n        }\n    </div>\n</div>", styles: [".batches-container {\n    padding: var(--sqx-space-8);\n}\n\n// Simple Header like Dashboard\n.batches-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: var(--sqx-space-6);\n\n    @media (max-width: 768px) {\n        flex-direction: column;\n        align-items: flex-start;\n        gap: var(--sqx-space-4);\n    }\n}\n\n.page-title {\n    font-size: 32px;\n    font-weight: 700;\n    color: var(--sqx-color-text);\n    margin: 0;\n}\n\n// Search Input\n.search-wrapper {\n    position: relative;\n    width: 320px;\n\n    @media (max-width: 768px) {\n        width: 100%;\n    }\n\n    .pi-search {\n        position: absolute;\n        left: 1rem;\n        top: 50%;\n        transform: translateY(-50%);\n        color: #9ca3af;\n        font-size: 0.875rem;\n        z-index: 1;\n    }\n}\n\n.search-input {\n    width: 100%;\n    padding: 0.75rem 1rem 0.75rem 2.75rem !important;\n    border: 1px solid #e5e7eb;\n    border-radius: var(--sqx-radius-md);\n    font-size: 0.875rem;\n    transition: all 0.2s;\n\n    &:focus {\n        border-color: var(--primary-color);\n        box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);\n        outline: none;\n    }\n\n    &::placeholder {\n        color: #9ca3af;\n    }\n}\n\n// Batch Cards Grid\n.batches-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));\n    grid-auto-rows: 1fr;\n    gap: var(--sqx-space-5);\n\n    @media (max-width: 768px) {\n        grid-template-columns: 1fr;\n    }\n}\n\n.batch-card {\n    background: white;\n    border-radius: var(--sqx-radius-lg);\n    padding: var(--sqx-space-5);\n    cursor: pointer;\n    transition: all 0.2s ease;\n    border: 1px solid transparent;\n    display: flex;\n    flex-direction: column;\n    gap: var(--sqx-space-4);\n    height: 100%;\n\n    &:hover {\n        border-color: var(--primary-color);\n        box-shadow: 0 4px 12px rgba(108, 92, 231, 0.12);\n    }\n}\n\n// Card Header\n.card-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-start;\n    gap: 1rem;\n}\n\n.batch-name {\n    font-size: 1.125rem;\n    font-weight: 600;\n    color: var(--sqx-color-text);\n    margin: 0;\n    flex: 1;\n    line-height: 1.4;\n}\n\n.student-badge {\n    flex-shrink: 0;\n    background-color: #f3f4f6 !important;\n    color: #6b7280 !important;\n    border: none !important;\n}\n\n// Description\n.batch-description {\n    font-size: 0.875rem;\n    color: #6b7280;\n    line-height: 1.6;\n    margin: 0;\n    display: -webkit-box;\n    line-clamp: 2;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n}\n\n// Date Row\n.date-row {\n    display: flex;\n    gap: var(--sqx-space-4);\n    flex-wrap: wrap;\n}\n\n.date-item {\n    display: flex;\n    align-items: flex-start;\n    gap: 0.625rem;\n\n    i {\n        color: var(--primary-color);\n        font-size: 1rem;\n        margin-top: 2px;\n    }\n\n    div {\n        display: flex;\n        flex-direction: column;\n        gap: 0.125rem;\n    }\n}\n\n.date-label {\n    font-size: 0.6875rem;\n    font-weight: 600;\n    color: #9ca3af;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n}\n\n.date-value {\n    font-size: 0.875rem;\n    color: var(--sqx-color-text);\n    font-weight: 500;\n}\n\n// Students Section\n.students-section {\n    padding-top: var(--sqx-space-3);\n    border-top: 1px solid #f3f4f6;\n}\n\n.students-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-bottom: var(--sqx-space-3);\n}\n\n.students-label {\n    font-size: 0.6875rem;\n    font-weight: 600;\n    color: #9ca3af;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n}\n\n.students-count {\n    font-size: 0.875rem;\n    font-weight: 600;\n    color: var(--primary-color);\n}\n\n.students-avatars {\n    ::ng-deep .p-avatar {\n        width: 2.5rem;\n        height: 2.5rem;\n        border: 2px solid white;\n        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n    }\n}\n\n// View Details Button\n.view-details-btn {\n    width: 100%;\n    background: #EFF6FF !important;\n    color: var(--primary-color) !important;\n    border: none !important;\n    padding: 0.75rem 1.5rem;\n    font-weight: 600;\n    transition: all 0.2s;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 0.5rem;\n    margin-top: auto;\n\n    &:hover {\n        background: #DBEAFE !important;\n    }\n}\n\n// Empty State\n.empty-state {\n    grid-column: 1 / -1;\n    text-align: center;\n    padding: 4rem 2rem;\n}\n\n.empty-icon {\n    font-size: 3rem;\n    color: #d1d5db;\n    margin-bottom: 1rem;\n}\n\n.empty-text {\n    font-size: 1.125rem;\n    font-weight: 600;\n    color: #6b7280;\n    margin: 0 0 0.5rem 0;\n}\n\n.empty-subtext {\n    font-size: 0.875rem;\n    color: #9ca3af;\n    margin: 0;\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(BatchesComponent, { className: "BatchesComponent", filePath: "src/app/modules/batches/batches.component.ts", lineNumber: 31 }); })();
