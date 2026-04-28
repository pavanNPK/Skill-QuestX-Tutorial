import { Component } from '@angular/core';
import * as i0 from "@angular/core";
export class ExamDocs {
    static ɵfac = function ExamDocs_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ExamDocs)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ExamDocs, selectors: [["sqx-exam-docs"]], decls: 16, vars: 0, consts: [[1, "page-container"], [1, "pdf-viewer-container"], [1, "pdf-toolbar"], [1, "tool-btn"], [1, "pi", "pi-download"], [1, "pi", "pi-print"], [1, "pdf-preview"], [1, "empty-state", 2, "border", "2px dashed var(--sqx-color-border)", "background", "#F9FAFB", "box-shadow", "none"], [1, "pi", "pi-file-pdf", "live-icon", 2, "color", "var(--sqx-color-muted)"]], template: function ExamDocs_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "button", 3);
            i0.ɵɵdomElement(4, "i", 4);
            i0.ɵɵtext(5, " Download");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(6, "button", 3);
            i0.ɵɵdomElement(7, "i", 5);
            i0.ɵɵtext(8, " Print");
            i0.ɵɵdomElementEnd()();
            i0.ɵɵdomElementStart(9, "div", 6)(10, "div", 7);
            i0.ɵɵdomElement(11, "i", 8);
            i0.ɵɵdomElementStart(12, "h2");
            i0.ɵɵtext(13, "No Document Available");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(14, "p");
            i0.ɵɵtext(15, "The sample exam document is currently unavailable.");
            i0.ɵɵdomElementEnd()()()()();
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ExamDocs, [{
        type: Component,
        args: [{ selector: 'sqx-exam-docs', imports: [], template: "<div class=\"page-container\">\n    <div class=\"pdf-viewer-container\">\n        <div class=\"pdf-toolbar\">\n            <button class=\"tool-btn\"><i class=\"pi pi-download\"></i> Download</button>\n            <button class=\"tool-btn\"><i class=\"pi pi-print\"></i> Print</button>\n        </div>\n\n        <div class=\"pdf-preview\">\n            <div class=\"empty-state\"\n                style=\"border: 2px dashed var(--sqx-color-border); background: #F9FAFB; box-shadow: none;\">\n                <i class=\"pi pi-file-pdf live-icon\" style=\"color: var(--sqx-color-muted);\"></i>\n                <h2>No Document Available</h2>\n                <p>The sample exam document is currently unavailable.</p>\n            </div>\n        </div>\n    </div>\n</div>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ExamDocs, { className: "ExamDocs", filePath: "src/app/modules/exams/exam-docs/exam-docs.ts", lineNumber: 9 }); })();
