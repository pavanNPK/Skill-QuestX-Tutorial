import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.value;
function OnlineAssessment_Conditional_12_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 14)(1, "input", 15);
    i0.ɵɵtwoWayListener("ngModelChange", function OnlineAssessment_Conditional_12_For_2_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.currentQuestion.selectedOption, $event) || (ctx_r1.currentQuestion.selectedOption = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", "q" + ctx_r1.currentQuestion.id)("value", option_r3.value);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.currentQuestion.selectedOption);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r3.label);
} }
function OnlineAssessment_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵrepeaterCreate(1, OnlineAssessment_Conditional_12_For_2_Template, 4, 4, "label", 14, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r1.currentQuestion.options);
} }
function OnlineAssessment_Conditional_13_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16);
    i0.ɵɵelement(1, "i", 19);
    i0.ɵɵelementStart(2, "a", 20);
    i0.ɵɵtext(3, "View Reference Document");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("href", ctx_r1.currentQuestion.pdfUrl, i0.ɵɵsanitizeUrl);
} }
function OnlineAssessment_Conditional_13_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵconditionalCreate(1, OnlineAssessment_Conditional_13_Conditional_1_Template, 4, 1, "div", 16);
    i0.ɵɵelementStart(2, "div", 17)(3, "label");
    i0.ɵɵtext(4, "Your Answer");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "textarea", 18);
    i0.ɵɵtwoWayListener("ngModelChange", function OnlineAssessment_Conditional_13_Template_textarea_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.currentQuestion.textAnswer, $event) || (ctx_r1.currentQuestion.textAnswer = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r1.currentQuestion.pdfUrl ? 1 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.currentQuestion.textAnswer);
} }
function OnlineAssessment_Conditional_17_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 21);
    i0.ɵɵlistener("click", function OnlineAssessment_Conditional_17_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.submitAssessment()); });
    i0.ɵɵtext(1, "Submit");
    i0.ɵɵelementEnd();
} }
function OnlineAssessment_Conditional_18_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 22);
    i0.ɵɵlistener("click", function OnlineAssessment_Conditional_18_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.nextQuestion()); });
    i0.ɵɵtext(1, "Next");
    i0.ɵɵelementEnd();
} }
export class OnlineAssessment {
    currentQuestionIndex = signal(0, ...(ngDevMode ? [{ debugName: "currentQuestionIndex" }] : []));
    questions = [
        {
            id: 1,
            type: 'mcq',
            text: 'What is the correct way to declare a variable in Python?',
            options: [
                { value: 'a', label: 'var x = 5' },
                { value: 'b', label: 'x = 5' },
                { value: 'c', label: 'int x = 5' },
                { value: 'd', label: 'declare x = 5' }
            ]
        },
        {
            id: 2,
            type: 'mcq',
            text: 'Which collection is ordered, changeable, and allows duplicate members?',
            options: [
                { value: 'a', label: 'Tuple' },
                { value: 'b', label: 'Set' },
                { value: 'c', label: 'List' },
                { value: 'd', label: 'Dictionary' }
            ]
        },
        {
            id: 3,
            type: 'mcq',
            text: 'How do you insert COMMENTS in Python code?',
            options: [
                { value: 'a', label: '# This is a comment' },
                { value: 'b', label: '// This is a comment' },
                { value: 'c', label: '/* This is a comment */' },
                { value: 'd', label: '<!-- This is a comment -->' }
            ]
        },
        {
            id: 4,
            type: 'text',
            text: 'Explain the difference between a list and a tuple in Python. Refer to the attached document if needed.',
            pdfUrl: 'assets/docs/python-data-structures.pdf', // Mock URL
            textAnswer: ''
        },
        {
            id: 5,
            type: 'mcq',
            text: 'What is the correct file extension for Python files?',
            options: [
                { value: 'a', label: '.pt' },
                { value: 'b', label: '.pyt' },
                { value: 'c', label: '.py' },
                { value: 'd', label: '.python' }
            ]
        }
    ];
    get currentQuestion() {
        return this.questions[this.currentQuestionIndex()];
    }
    get isFirstQuestion() {
        return this.currentQuestionIndex() === 0;
    }
    get isLastQuestion() {
        return this.currentQuestionIndex() === this.questions.length - 1;
    }
    nextQuestion() {
        if (!this.isLastQuestion) {
            this.currentQuestionIndex.update(i => i + 1);
        }
    }
    prevQuestion() {
        if (!this.isFirstQuestion) {
            this.currentQuestionIndex.update(i => i - 1);
        }
    }
    submitAssessment() {
        console.log('Assessment Submitted');
        const answers = this.questions.map(q => ({
            questionId: q.id,
            selectedOption: q.selectedOption,
            textAnswer: q.textAnswer
        }));
        console.log('Answers:', answers);
        // Handle submission logic
    }
    static ɵfac = function OnlineAssessment_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OnlineAssessment)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OnlineAssessment, selectors: [["sqx-online-assessment"]], decls: 19, vars: 9, consts: [[1, "assessment-page"], [1, "assessment-container"], [1, "question-card"], [1, "question-header"], [1, "question-number"], [1, "time-remaining"], [1, "pi", "pi-clock"], [1, "question-content"], [1, "options-list"], [1, "text-answer-section"], [1, "question-actions"], [1, "btn", "btn-secondary", 3, "click", "disabled"], [1, "btn", "btn-primary", "submit-btn"], [1, "btn", "btn-primary"], [1, "option"], ["type", "radio", 3, "ngModelChange", "name", "value", "ngModel"], [1, "pdf-link"], [1, "answer-area"], ["rows", "6", "placeholder", "Type your answer here...", 1, "form-control", 3, "ngModelChange", "ngModel"], [1, "pi", "pi-file-pdf"], ["target", "_blank", 3, "href"], [1, "btn", "btn-primary", "submit-btn", 3, "click"], [1, "btn", "btn-primary", 3, "click"]], template: function OnlineAssessment_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "span", 4);
            i0.ɵɵtext(5);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "span", 5);
            i0.ɵɵelement(7, "i", 6);
            i0.ɵɵtext(8, " 45:00");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 7)(10, "h3");
            i0.ɵɵtext(11);
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(12, OnlineAssessment_Conditional_12_Template, 3, 0, "div", 8);
            i0.ɵɵconditionalCreate(13, OnlineAssessment_Conditional_13_Template, 6, 2, "div", 9);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 10)(15, "button", 11);
            i0.ɵɵlistener("click", function OnlineAssessment_Template_button_click_15_listener() { return ctx.prevQuestion(); });
            i0.ɵɵtext(16, " Previous ");
            i0.ɵɵelementEnd();
            i0.ɵɵconditionalCreate(17, OnlineAssessment_Conditional_17_Template, 2, 0, "button", 12)(18, OnlineAssessment_Conditional_18_Template, 2, 0, "button", 13);
            i0.ɵɵelementEnd()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate2("Question ", ctx.currentQuestionIndex() + 1, " of ", ctx.questions.length);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx.currentQuestion.text);
            i0.ɵɵadvance();
            i0.ɵɵconditional(!ctx.currentQuestion.type || ctx.currentQuestion.type === "mcq" ? 12 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.currentQuestion.type === "text" ? 13 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("disabled", ctx.isFirstQuestion);
            i0.ɵɵproperty("disabled", ctx.isFirstQuestion);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.isLastQuestion ? 17 : 18);
        } }, dependencies: [CommonModule, FormsModule, i1.DefaultValueAccessor, i1.RadioControlValueAccessor, i1.NgControlStatus, i1.NgModel], styles: [".assessment-page[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 100vh;\n    background: #F9FAFB;\n    padding: var(--sqx-space-4);\n}\n\n.assessment-container[_ngcontent-%COMP%] {\n    margin: 0 auto;\n}\n\n.question-card[_ngcontent-%COMP%] {\n    background: white;\n    border: 1px solid var(--sqx-color-border);\n    border-radius: var(--sqx-radius-lg);\n    padding: var(--sqx-space-4);\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n\n.question-header[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding-bottom: var(--sqx-space-4);\n    margin-bottom: var(--sqx-space-5);\n    border-bottom: 1px solid var(--sqx-color-border);\n\n    .question-number {\n        font-size: 14px;\n        font-weight: 600;\n        color: var(--sqx-color-text);\n    }\n\n    .time-remaining {\n        display: flex;\n        align-items: center;\n        gap: var(--sqx-space-2);\n        font-size: 14px;\n        font-weight: 600;\n        color: var(--sqx-color-primary);\n\n        i {\n            font-size: 16px;\n        }\n    }\n}\n\n.question-content[_ngcontent-%COMP%] {\n    margin-bottom: var(--sqx-space-6);\n\n    h3 {\n        font-size: 18px;\n        font-weight: 600;\n        color: var(--sqx-color-text);\n        margin: 0 0 var(--sqx-space-5) 0;\n        line-height: 1.5;\n    }\n\n    .text-answer-section {\n        display: flex;\n        flex-direction: column;\n        gap: 1rem;\n\n        .pdf-link {\n            display: flex;\n            align-items: center;\n            gap: 8px;\n\n            i {\n                color: #dc2626; // PDF red\n                font-size: 1.1rem;\n            }\n\n            a {\n                color: var(--sqx-color-primary);\n                text-decoration: none;\n                font-weight: 500;\n                font-size: 14px;\n\n                &:hover {\n                    text-decoration: underline;\n                }\n            }\n        }\n\n\n\n        .answer-area {\n            display: flex;\n            flex-direction: column;\n            gap: 10px;\n\n            label {\n                font-size: 14px;\n                font-weight: 600;\n                color: var(--sqx-color-text);\n            }\n\n            textarea {\n                width: 100%;\n                padding: 1rem;\n                border: 1px solid var(--sqx-color-border);\n                border-radius: var(--sqx-radius-md);\n                font-family: inherit;\n                font-size: 14px;\n                line-height: 1.6;\n                color: var(--sqx-color-text);\n                background: #F9FAFB;\n                transition: all 0.2s;\n                resize: vertical;\n\n                &:focus {\n                    background: white;\n                    border-color: var(--sqx-color-primary);\n                    outline: none;\n                    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);\n                }\n            }\n        }\n    }\n}\n\n.options-list[_ngcontent-%COMP%] {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sqx-space-3);\n}\n\n.option[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n    padding: var(--sqx-space-4);\n    background: #F9FAFB;\n    border: 2px solid transparent;\n    border-radius: var(--sqx-radius-md);\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    &:hover {\n        background: #F3F4F6;\n        border-color: var(--sqx-color-primary);\n    }\n\n    input[type=\"radio\"] {\n        width: 20px;\n        height: 20px;\n        cursor: pointer;\n        accent-color: var(--sqx-color-primary);\n    }\n\n    span {\n        font-size: 15px;\n        color: var(--sqx-color-text);\n        flex: 1;\n    }\n\n    &:has(input:checked) {\n        background: rgba(108, 92, 231, 0.1);\n        border-color: var(--sqx-color-primary);\n\n        span {\n            font-weight: 500;\n            color: var(--sqx-color-primary);\n        }\n    }\n}\n\n.question-actions[_ngcontent-%COMP%] {\n    display: flex;\n    justify-content: space-between;\n    padding-top: var(--sqx-space-5);\n    border-top: 1px solid var(--sqx-color-border);\n\n    .btn {\n        padding: 12px 24px;\n        font-size: 14px;\n        font-weight: 600;\n        border-radius: var(--sqx-radius-sm); // Fixed: Changed from radius-md to radius-sm\n        border: none;\n        cursor: pointer;\n        transition: all 0.2s ease;\n\n        &.disabled {\n            opacity: 0.5;\n            cursor: not-allowed;\n\n            &:hover {\n                background: #E5E7EB; // Keep original background for disabled state\n            }\n        }\n\n        &.btn-secondary {\n            background: #E5E7EB;\n            color: var(--sqx-color-text);\n\n            &:hover:not(.disabled) {\n                background: #D1D5DB;\n            }\n        }\n\n        &.btn-primary {\n            background: var(--sqx-color-primary);\n            color: white;\n\n            &:hover {\n                background: #5a4bc7;\n            }\n        }\n\n        &.submit-btn {\n            background: #10B981; // Green for submit\n\n            &:hover {\n                background: #059669;\n            }\n        }\n    }\n}\n\n//[_ngcontent-%COMP%]   Responsive[_ngcontent-%COMP%]   Design\n@media[_ngcontent-%COMP%]   (max-width[_ngcontent-%COMP%]: 768px) {\n    .assessment-page {\n        padding: var(--sqx-space-4);\n    }\n\n    .question-card {\n        padding: var(--sqx-space-4);\n    }\n\n    .question-header {\n        flex-direction: column;\n        align-items: flex-start;\n        gap: var(--sqx-space-2);\n    }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OnlineAssessment, [{
        type: Component,
        args: [{ selector: 'sqx-online-assessment', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"assessment-page\">\n    <div class=\"assessment-container\">\n        <div class=\"question-card\">\n            <div class=\"question-header\">\n                <span class=\"question-number\">Question {{ currentQuestionIndex() + 1 }} of {{ questions.length }}</span>\n                <span class=\"time-remaining\"><i class=\"pi pi-clock\"></i> 45:00</span>\n            </div>\n\n            <div class=\"question-content\">\n                <h3>{{ currentQuestion.text }}</h3>\n\n                @if (!currentQuestion.type || currentQuestion.type === 'mcq') {\n                <div class=\"options-list\">\n                    @for (option of currentQuestion.options; track option.value) {\n                    <label class=\"option\">\n                        <input type=\"radio\" [name]=\"'q' + currentQuestion.id\" [value]=\"option.value\"\n                            [(ngModel)]=\"currentQuestion.selectedOption\" />\n                        <span>{{ option.label }}</span>\n                    </label>\n                    }\n                </div>\n                }\n\n                @if (currentQuestion.type === 'text') {\n                <div class=\"text-answer-section\">\n                    @if (currentQuestion.pdfUrl) {\n                    <div class=\"pdf-link\">\n                        <i class=\"pi pi-file-pdf\"></i>\n                        <a [href]=\"currentQuestion.pdfUrl\" target=\"_blank\">View Reference Document</a>\n                    </div>\n                    }\n                    <div class=\"answer-area\">\n                        <label>Your Answer</label>\n                        <textarea [(ngModel)]=\"currentQuestion.textAnswer\" rows=\"6\"\n                            placeholder=\"Type your answer here...\" class=\"form-control\"></textarea>\n                    </div>\n                </div>\n                }\n            </div>\n\n            <div class=\"question-actions\">\n                <button class=\"btn btn-secondary\" (click)=\"prevQuestion()\" [disabled]=\"isFirstQuestion\"\n                    [class.disabled]=\"isFirstQuestion\">\n                    Previous\n                </button>\n\n                @if (isLastQuestion) {\n                <button class=\"btn btn-primary submit-btn\" (click)=\"submitAssessment()\">Submit</button>\n                } @else {\n                <button class=\"btn btn-primary\" (click)=\"nextQuestion()\">Next</button>\n                }\n            </div>\n        </div>\n    </div>\n</div>", styles: [".assessment-page {\n    width: 100%;\n    min-height: 100vh;\n    background: #F9FAFB;\n    padding: var(--sqx-space-4);\n}\n\n.assessment-container {\n    margin: 0 auto;\n}\n\n.question-card {\n    background: white;\n    border: 1px solid var(--sqx-color-border);\n    border-radius: var(--sqx-radius-lg);\n    padding: var(--sqx-space-4);\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);\n}\n\n.question-header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding-bottom: var(--sqx-space-4);\n    margin-bottom: var(--sqx-space-5);\n    border-bottom: 1px solid var(--sqx-color-border);\n\n    .question-number {\n        font-size: 14px;\n        font-weight: 600;\n        color: var(--sqx-color-text);\n    }\n\n    .time-remaining {\n        display: flex;\n        align-items: center;\n        gap: var(--sqx-space-2);\n        font-size: 14px;\n        font-weight: 600;\n        color: var(--sqx-color-primary);\n\n        i {\n            font-size: 16px;\n        }\n    }\n}\n\n.question-content {\n    margin-bottom: var(--sqx-space-6);\n\n    h3 {\n        font-size: 18px;\n        font-weight: 600;\n        color: var(--sqx-color-text);\n        margin: 0 0 var(--sqx-space-5) 0;\n        line-height: 1.5;\n    }\n\n    .text-answer-section {\n        display: flex;\n        flex-direction: column;\n        gap: 1rem;\n\n        .pdf-link {\n            display: flex;\n            align-items: center;\n            gap: 8px;\n\n            i {\n                color: #dc2626; // PDF red\n                font-size: 1.1rem;\n            }\n\n            a {\n                color: var(--sqx-color-primary);\n                text-decoration: none;\n                font-weight: 500;\n                font-size: 14px;\n\n                &:hover {\n                    text-decoration: underline;\n                }\n            }\n        }\n\n\n\n        .answer-area {\n            display: flex;\n            flex-direction: column;\n            gap: 10px;\n\n            label {\n                font-size: 14px;\n                font-weight: 600;\n                color: var(--sqx-color-text);\n            }\n\n            textarea {\n                width: 100%;\n                padding: 1rem;\n                border: 1px solid var(--sqx-color-border);\n                border-radius: var(--sqx-radius-md);\n                font-family: inherit;\n                font-size: 14px;\n                line-height: 1.6;\n                color: var(--sqx-color-text);\n                background: #F9FAFB;\n                transition: all 0.2s;\n                resize: vertical;\n\n                &:focus {\n                    background: white;\n                    border-color: var(--sqx-color-primary);\n                    outline: none;\n                    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);\n                }\n            }\n        }\n    }\n}\n\n.options-list {\n    display: flex;\n    flex-direction: column;\n    gap: var(--sqx-space-3);\n}\n\n.option {\n    display: flex;\n    align-items: center;\n    gap: var(--sqx-space-3);\n    padding: var(--sqx-space-4);\n    background: #F9FAFB;\n    border: 2px solid transparent;\n    border-radius: var(--sqx-radius-md);\n    cursor: pointer;\n    transition: all 0.2s ease;\n\n    &:hover {\n        background: #F3F4F6;\n        border-color: var(--sqx-color-primary);\n    }\n\n    input[type=\"radio\"] {\n        width: 20px;\n        height: 20px;\n        cursor: pointer;\n        accent-color: var(--sqx-color-primary);\n    }\n\n    span {\n        font-size: 15px;\n        color: var(--sqx-color-text);\n        flex: 1;\n    }\n\n    &:has(input:checked) {\n        background: rgba(108, 92, 231, 0.1);\n        border-color: var(--sqx-color-primary);\n\n        span {\n            font-weight: 500;\n            color: var(--sqx-color-primary);\n        }\n    }\n}\n\n.question-actions {\n    display: flex;\n    justify-content: space-between;\n    padding-top: var(--sqx-space-5);\n    border-top: 1px solid var(--sqx-color-border);\n\n    .btn {\n        padding: 12px 24px;\n        font-size: 14px;\n        font-weight: 600;\n        border-radius: var(--sqx-radius-sm); // Fixed: Changed from radius-md to radius-sm\n        border: none;\n        cursor: pointer;\n        transition: all 0.2s ease;\n\n        &.disabled {\n            opacity: 0.5;\n            cursor: not-allowed;\n\n            &:hover {\n                background: #E5E7EB; // Keep original background for disabled state\n            }\n        }\n\n        &.btn-secondary {\n            background: #E5E7EB;\n            color: var(--sqx-color-text);\n\n            &:hover:not(.disabled) {\n                background: #D1D5DB;\n            }\n        }\n\n        &.btn-primary {\n            background: var(--sqx-color-primary);\n            color: white;\n\n            &:hover {\n                background: #5a4bc7;\n            }\n        }\n\n        &.submit-btn {\n            background: #10B981; // Green for submit\n\n            &:hover {\n                background: #059669;\n            }\n        }\n    }\n}\n\n// Responsive Design\n@media (max-width: 768px) {\n    .assessment-page {\n        padding: var(--sqx-space-4);\n    }\n\n    .question-card {\n        padding: var(--sqx-space-4);\n    }\n\n    .question-header {\n        flex-direction: column;\n        align-items: flex-start;\n        gap: var(--sqx-space-2);\n    }\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OnlineAssessment, { className: "OnlineAssessment", filePath: "src/app/modules/exams/online-assessment/online-assessment.ts", lineNumber: 22 }); })();
