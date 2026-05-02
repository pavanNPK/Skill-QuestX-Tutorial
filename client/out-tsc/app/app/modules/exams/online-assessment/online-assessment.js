import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/exam.service";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.id;
const _forTrack1 = ($index, $item) => $item.value;
function OnlineAssessment_Conditional_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1, "Loading online assessments...");
    i0.ɵɵelementEnd();
} }
function OnlineAssessment_Conditional_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function OnlineAssessment_Conditional_3_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 7);
    i0.ɵɵlistener("click", function OnlineAssessment_Conditional_3_For_2_Template_button_click_0_listener() { const exam_r3 = i0.ɵɵrestoreView(_r2).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.openExam(exam_r3)); });
    i0.ɵɵelementStart(1, "span", 8);
    i0.ɵɵelement(2, "i", 9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 10)(4, "strong");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "small");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(8, "i", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const exam_r3 = ctx.$implicit;
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(exam_r3.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", exam_r3.questionCount, " questions \u2022 ", exam_r3.durationMinutes, " minutes");
} }
function OnlineAssessment_Conditional_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵrepeaterCreate(1, OnlineAssessment_Conditional_3_For_2_Template, 9, 3, "button", 6, _forTrack0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.availableExams);
} }
function OnlineAssessment_Conditional_4_For_11_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 17);
    i0.ɵɵlistener("click", function OnlineAssessment_Conditional_4_For_11_Template_button_click_0_listener() { const section_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.startSection(section_r6)); });
    i0.ɵɵelementStart(1, "span");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "small");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "em");
    i0.ɵɵtext(8, "Start");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const section_r6 = ctx.$implicit;
    const ɵ$index_50_r7 = ctx.$index;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ɵ$index_50_r7 + 1);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(section_r6.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", section_r6.questions.length, " questions");
} }
function OnlineAssessment_Conditional_4_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 3)(1, "div", 12)(2, "button", 13);
    i0.ɵɵlistener("click", function OnlineAssessment_Conditional_4_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r4); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.mode.set("list")); });
    i0.ɵɵelement(3, "i", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div")(5, "h2");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 15);
    i0.ɵɵrepeaterCreate(10, OnlineAssessment_Conditional_4_For_11_Template, 9, 3, "button", 16, _forTrack0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.selectedExam.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r0.selectedExam.durationMinutes, " minutes \u2022 ", ctx_r0.selectedExam.questionCount, " questions");
    i0.ɵɵadvance(2);
    i0.ɵɵrepeater(ctx_r0.selectedExam.sections);
} }
function OnlineAssessment_Conditional_5_Conditional_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.error);
} }
function OnlineAssessment_Conditional_5_Conditional_22_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "input", 31);
    i0.ɵɵtwoWayListener("ngModelChange", function OnlineAssessment_Conditional_5_Conditional_22_Template_input_ngModelChange_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r0 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r0.answers[ctx_r0.currentQuestion.id], $event) || (ctx_r0.answers[ctx_r0.currentQuestion.id] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.answers[ctx_r0.currentQuestion.id]);
} }
function OnlineAssessment_Conditional_5_Conditional_23_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r10 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 32)(1, "input", 33);
    i0.ɵɵtwoWayListener("ngModelChange", function OnlineAssessment_Conditional_5_Conditional_23_For_2_Template_input_ngModelChange_1_listener($event) { i0.ɵɵrestoreView(_r10); const ctx_r0 = i0.ɵɵnextContext(3); i0.ɵɵtwoWayBindingSet(ctx_r0.answers[ctx_r0.currentQuestion.id], $event) || (ctx_r0.answers[ctx_r0.currentQuestion.id] = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r11 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("name", ctx_r0.currentQuestion.id)("value", option_r11.value);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r0.answers[ctx_r0.currentQuestion.id]);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r11.label);
} }
function OnlineAssessment_Conditional_5_Conditional_23_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵrepeaterCreate(1, OnlineAssessment_Conditional_5_Conditional_23_For_2_Template, 4, 4, "label", 32, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.currentQuestion.options);
} }
function OnlineAssessment_Conditional_5_Conditional_24_For_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "label", 32)(1, "input", 34);
    i0.ɵɵlistener("change", function OnlineAssessment_Conditional_5_Conditional_24_For_2_Template_input_change_1_listener($event) { const option_r13 = i0.ɵɵrestoreView(_r12).$implicit; const ctx_r0 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r0.toggleMulti(ctx_r0.currentQuestion, option_r13.value, $event.target.checked)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const option_r13 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("checked", ctx_r0.isMultiChecked(ctx_r0.currentQuestion, option_r13.value));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(option_r13.label);
} }
function OnlineAssessment_Conditional_5_Conditional_24_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵrepeaterCreate(1, OnlineAssessment_Conditional_5_Conditional_24_For_2_Template, 4, 2, "label", 32, _forTrack1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵrepeater(ctx_r0.currentQuestion.options);
} }
function OnlineAssessment_Conditional_5_Conditional_28_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 35);
    i0.ɵɵlistener("click", function OnlineAssessment_Conditional_5_Conditional_28_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r14); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.submitAssessment()); });
    i0.ɵɵtext(1, "Submit");
    i0.ɵɵelementEnd();
} }
function OnlineAssessment_Conditional_5_Conditional_29_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 35);
    i0.ɵɵlistener("click", function OnlineAssessment_Conditional_5_Conditional_29_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r15); const ctx_r0 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r0.nextQuestion()); });
    i0.ɵɵtext(1, "Next");
    i0.ɵɵelementEnd();
} }
function OnlineAssessment_Conditional_5_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "div", 18)(2, "button", 13);
    i0.ɵɵlistener("click", function OnlineAssessment_Conditional_5_Template_button_click_2_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.backToSections()); });
    i0.ɵɵelement(3, "i", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 19)(5, "h2");
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 20);
    i0.ɵɵelement(10, "i", 21);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵconditionalCreate(12, OnlineAssessment_Conditional_5_Conditional_12_Template, 2, 1, "div", 22);
    i0.ɵɵelementStart(13, "div", 23)(14, "div", 24)(15, "span");
    i0.ɵɵtext(16);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span");
    i0.ɵɵtext(18);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "div", 25)(20, "h3");
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(22, OnlineAssessment_Conditional_5_Conditional_22_Template, 1, 1, "input", 26);
    i0.ɵɵconditionalCreate(23, OnlineAssessment_Conditional_5_Conditional_23_Template, 3, 0, "div", 27);
    i0.ɵɵconditionalCreate(24, OnlineAssessment_Conditional_5_Conditional_24_Template, 3, 0, "div", 27);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "div", 28)(26, "button", 29);
    i0.ɵɵlistener("click", function OnlineAssessment_Conditional_5_Template_button_click_26_listener() { i0.ɵɵrestoreView(_r8); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.prevQuestion()); });
    i0.ɵɵtext(27, "Previous");
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(28, OnlineAssessment_Conditional_5_Conditional_28_Template, 2, 0, "button", 30)(29, OnlineAssessment_Conditional_5_Conditional_29_Template, 2, 0, "button", 30);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.selectedExam.title);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.selectedSection.title);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.formattedTime);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.error ? 12 : -1);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate2("Question ", ctx_r0.currentQuestionIndex() + 1, " of ", ctx_r0.selectedSection.questions.length);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", ctx_r0.answeredCount, " answered");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.currentQuestion.prompt);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.currentQuestion.type === "blank" ? 22 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.currentQuestion.type === "single_select" ? 23 : -1);
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.currentQuestion.type === "multi_select" ? 24 : -1);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", ctx_r0.isFirstQuestion);
    i0.ɵɵadvance(2);
    i0.ɵɵconditional(ctx_r0.isLastQuestion ? 28 : 29);
} }
function OnlineAssessment_Conditional_6_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Submitted automatically when the timer ended.");
    i0.ɵɵelementEnd();
} }
function OnlineAssessment_Conditional_6_Template(rf, ctx) { if (rf & 1) {
    const _r16 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelement(1, "i", 36);
    i0.ɵɵelementStart(2, "h2");
    i0.ɵɵtext(3, "Assessment submitted");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "p");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵconditionalCreate(6, OnlineAssessment_Conditional_6_Conditional_6_Template, 2, 0, "span");
    i0.ɵɵelementStart(7, "button", 35);
    i0.ɵɵlistener("click", function OnlineAssessment_Conditional_6_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r16); const ctx_r0 = i0.ɵɵnextContext(); ctx_r0.mode.set("list"); ctx_r0.selectedExam = null; return i0.ɵɵresetView(ctx_r0.selectedSection = null); });
    i0.ɵɵtext(8, "Back to exams");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate2("", ctx_r0.submissionResult.answeredCount, " of ", ctx_r0.submissionResult.questionCount, " questions answered.");
    i0.ɵɵadvance();
    i0.ɵɵconditional(ctx_r0.submissionResult.autoSubmitted ? 6 : -1);
} }
export class OnlineAssessment {
    examService;
    mode = signal('list', ...(ngDevMode ? [{ debugName: "mode" }] : []));
    loading = true;
    error = '';
    availableExams = [];
    selectedExam = null;
    selectedSection = null;
    currentQuestionIndex = signal(0, ...(ngDevMode ? [{ debugName: "currentQuestionIndex" }] : []));
    answers = {};
    remainingSeconds = 0;
    submissionResult = null;
    timerId = null;
    destroy$ = new Subject();
    constructor(examService) {
        this.examService = examService;
    }
    ngOnInit() {
        this.loadExams();
    }
    ngOnDestroy() {
        this.stopTimer();
        this.destroy$.next();
        this.destroy$.complete();
    }
    get currentQuestion() {
        return this.selectedSection?.questions[this.currentQuestionIndex()] ?? null;
    }
    get isFirstQuestion() {
        return this.currentQuestionIndex() === 0;
    }
    get isLastQuestion() {
        return this.currentQuestionIndex() === (this.selectedSection?.questions.length ?? 0) - 1;
    }
    get formattedTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    get answeredCount() {
        return Object.values(this.answers).filter((value) => Array.isArray(value) ? value.length > 0 : String(value ?? '').trim()).length;
    }
    loadExams() {
        this.loading = true;
        this.error = '';
        this.examService.getAvailableExams().pipe(takeUntil(this.destroy$)).subscribe({
            next: (exams) => {
                this.availableExams = exams;
                this.loading = false;
                if (!exams.length)
                    this.error = 'No online assessments are available yet.';
            },
            error: () => {
                this.loading = false;
                this.error = 'Could not load online assessments.';
            },
        });
    }
    openExam(exam) {
        this.loading = true;
        this.error = '';
        this.examService.getExam(exam.id).pipe(takeUntil(this.destroy$)).subscribe({
            next: (detail) => {
                this.selectedExam = detail;
                this.selectedSection = null;
                this.currentQuestionIndex.set(0);
                this.mode.set('section');
                this.loading = false;
            },
            error: () => {
                this.loading = false;
                this.error = 'Could not open this assessment.';
            },
        });
    }
    startSection(section) {
        if (!this.selectedExam)
            return;
        this.selectedSection = section;
        this.currentQuestionIndex.set(0);
        this.answers = {};
        this.submissionResult = null;
        this.remainingSeconds = this.selectedExam.durationMinutes * 60;
        this.mode.set('exam');
        this.startTimer();
    }
    backToSections() {
        this.stopTimer();
        this.mode.set(this.selectedExam ? 'section' : 'list');
    }
    nextQuestion() {
        if (!this.isLastQuestion)
            this.currentQuestionIndex.update((index) => index + 1);
    }
    prevQuestion() {
        if (!this.isFirstQuestion)
            this.currentQuestionIndex.update((index) => index - 1);
    }
    toggleMulti(question, value, checked) {
        const current = Array.isArray(this.answers[question.id]) ? this.answers[question.id] : [];
        this.answers[question.id] = checked ? [...current, value] : current.filter((item) => item !== value);
    }
    isMultiChecked(question, value) {
        const current = this.answers[question.id];
        return Array.isArray(current) && current.includes(value);
    }
    submitAssessment(autoSubmitted = false) {
        if (!this.selectedExam || !this.selectedSection)
            return;
        this.stopTimer();
        const payload = this.selectedSection.questions.map((question) => ({
            questionId: question.id,
            value: this.answers[question.id] ?? '',
        }));
        this.examService.submitExam(this.selectedExam.id, payload, autoSubmitted).pipe(takeUntil(this.destroy$)).subscribe({
            next: (result) => {
                this.submissionResult = result;
                this.mode.set('submitted');
            },
            error: () => {
                this.error = 'Could not submit assessment. Please try again.';
                this.startTimer();
            },
        });
    }
    startTimer() {
        this.stopTimer();
        this.timerId = setInterval(() => {
            this.remainingSeconds = Math.max(0, this.remainingSeconds - 1);
            if (this.remainingSeconds === 0)
                this.submitAssessment(true);
        }, 1000);
    }
    stopTimer() {
        if (this.timerId)
            clearInterval(this.timerId);
        this.timerId = null;
    }
    static ɵfac = function OnlineAssessment_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OnlineAssessment)(i0.ɵɵdirectiveInject(i1.ExamService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OnlineAssessment, selectors: [["sqx-online-assessment"]], decls: 7, vars: 5, consts: [[1, "assessment-page"], [1, "empty-state"], [1, "exam-list"], [1, "exam-index"], [1, "exam-shell"], [1, "submitted-card"], ["type", "button", 1, "exam-row"], ["type", "button", 1, "exam-row", 3, "click"], [1, "exam-icon"], [1, "pi", "pi-file-edit"], [1, "exam-info"], [1, "pi", "pi-chevron-right"], [1, "exam-index-header"], ["type", "button", 1, "icon-btn", 3, "click"], [1, "pi", "pi-chevron-left"], [1, "section-list"], ["type", "button", 1, "section-row"], ["type", "button", 1, "section-row", 3, "click"], [1, "exam-toolbar"], [1, "exam-title"], [1, "timer"], [1, "pi", "pi-clock"], [1, "inline-error"], [1, "question-card"], [1, "question-header"], [1, "question-content"], ["type", "text", "placeholder", "Type your answer", 1, "blank-input", 3, "ngModel"], [1, "options-list"], [1, "question-actions"], [1, "btn", "btn-secondary", 3, "click", "disabled"], [1, "btn", "btn-primary"], ["type", "text", "placeholder", "Type your answer", 1, "blank-input", 3, "ngModelChange", "ngModel"], [1, "option"], ["type", "radio", 3, "ngModelChange", "name", "value", "ngModel"], ["type", "checkbox", 3, "change", "checked"], [1, "btn", "btn-primary", 3, "click"], [1, "pi", "pi-check-circle"]], template: function OnlineAssessment_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵconditionalCreate(1, OnlineAssessment_Conditional_1_Template, 2, 0, "div", 1)(2, OnlineAssessment_Conditional_2_Template, 2, 1, "div", 1);
            i0.ɵɵconditionalCreate(3, OnlineAssessment_Conditional_3_Template, 3, 0, "div", 2);
            i0.ɵɵconditionalCreate(4, OnlineAssessment_Conditional_4_Template, 12, 3, "div", 3);
            i0.ɵɵconditionalCreate(5, OnlineAssessment_Conditional_5_Template, 30, 13, "div", 4);
            i0.ɵɵconditionalCreate(6, OnlineAssessment_Conditional_6_Template, 9, 3, "div", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.loading ? 1 : ctx.error && ctx.mode() !== "exam" ? 2 : -1);
            i0.ɵɵadvance(2);
            i0.ɵɵconditional(ctx.mode() === "list" && !ctx.loading && !ctx.error ? 3 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.mode() === "section" && ctx.selectedExam ? 4 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.mode() === "exam" && ctx.selectedExam && ctx.selectedSection && ctx.currentQuestion ? 5 : -1);
            i0.ɵɵadvance();
            i0.ɵɵconditional(ctx.mode() === "submitted" && ctx.submissionResult ? 6 : -1);
        } }, dependencies: [CommonModule, FormsModule, i2.DefaultValueAccessor, i2.RadioControlValueAccessor, i2.NgControlStatus, i2.NgModel], styles: [".assessment-page[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 100vh;\n  background: #F9FAFB;\n  padding: 2rem;\n}\n\n.empty-state[_ngcontent-%COMP%], \n.exam-list[_ngcontent-%COMP%], \n.exam-index[_ngcontent-%COMP%], \n.exam-shell[_ngcontent-%COMP%], \n.submitted-card[_ngcontent-%COMP%] {\n  max-width: 1180px;\n  margin: 0 auto;\n}\n\n.exam-list[_ngcontent-%COMP%], \n.section-list[_ngcontent-%COMP%] {\n  background: #FFFFFF;\n  border: 1px solid #E5E7EB;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 4px 12px rgba(17, 24, 39, 0.04);\n}\n\n.exam-row[_ngcontent-%COMP%], \n.section-row[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  border-bottom: 1px solid #E5E7EB;\n  background: #FFFFFF;\n  min-height: 76px;\n  padding: 1rem 1.25rem;\n  display: grid;\n  align-items: center;\n  gap: 1rem;\n  color: #111827;\n  text-align: left;\n  cursor: pointer;\n\n  &:last-child {\n    border-bottom: 0;\n  }\n\n  &:hover {\n    background: #F9FAFB;\n  }\n}\n\n.exam-row[_ngcontent-%COMP%] {\n  grid-template-columns: 48px minmax(0, 1fr) 24px;\n\n  .exam-icon {\n    width: 40px;\n    height: 40px;\n    border-radius: 10px;\n    background: #EEF2FF;\n    color: var(--sqx-color-primary);\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .exam-info {\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n\n    strong {\n      font-size: 18px;\n      font-weight: 800;\n    }\n\n    small {\n      color: #6B7280;\n      font-size: 13px;\n      font-weight: 700;\n    }\n  }\n\n  > i {\n    color: #9CA3AF;\n  }\n}\n\n.exam-index-header[_ngcontent-%COMP%], \n.exam-toolbar[_ngcontent-%COMP%] {\n  background: #FFFFFF;\n  border: 1px solid #E5E7EB;\n  border-radius: 12px;\n  padding: 1.25rem;\n  margin-bottom: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  box-shadow: 0 4px 12px rgba(17, 24, 39, 0.04);\n}\n\n.exam-index-header[_ngcontent-%COMP%] {\n  h2 {\n    margin: 0 0 0.25rem;\n    color: #111827;\n    font-size: 24px;\n    font-weight: 800;\n  }\n\n  p {\n    margin: 0;\n    color: #6B7280;\n    font-weight: 700;\n  }\n}\n\n.section-row[_ngcontent-%COMP%] {\n  grid-template-columns: 44px minmax(0, 1fr) 120px 90px;\n\n  span {\n    width: 32px;\n    height: 32px;\n    border-radius: 8px;\n    background: #EEF2FF;\n    color: var(--sqx-color-primary);\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: 800;\n  }\n\n  strong {\n    font-size: 16px;\n    font-weight: 800;\n  }\n\n  small {\n    color: #6B7280;\n    font-size: 13px;\n    font-weight: 700;\n    text-align: right;\n  }\n\n  em {\n    color: var(--sqx-color-primary);\n    font-style: normal;\n    font-weight: 800;\n    text-align: right;\n  }\n}\n\n.icon-btn[_ngcontent-%COMP%] {\n  width: 42px;\n  height: 42px;\n  border: 1px solid #D9D6F0;\n  border-radius: 10px;\n  background: #FFFFFF;\n  color: var(--sqx-color-primary);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n\n  &:hover {\n    background: #F5F3FF;\n    border-color: var(--sqx-color-primary);\n  }\n}\n\n.exam-toolbar[_ngcontent-%COMP%] {\n  justify-content: space-between;\n\n  .exam-title {\n    min-width: 0;\n    flex: 1;\n\n    h2 {\n      margin: 0 0 0.25rem;\n      color: #111827;\n      font-size: 22px;\n      font-weight: 800;\n    }\n\n    p {\n      margin: 0;\n      color: #6B7280;\n      font-weight: 700;\n    }\n  }\n}\n\n.timer[_ngcontent-%COMP%] {\n  min-width: 104px;\n  height: 42px;\n  border-radius: 10px;\n  background: #EEF2FF;\n  color: var(--sqx-color-primary);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-size: 16px;\n  font-weight: 900;\n}\n\n.inline-error[_ngcontent-%COMP%] {\n  max-width: 1180px;\n  margin: 0 auto 1rem;\n  padding: 0.875rem 1rem;\n  border-radius: 10px;\n  border: 1px solid #FCA5A5;\n  background: #FEF2F2;\n  color: #991B1B;\n  font-weight: 700;\n}\n\n.question-card[_ngcontent-%COMP%] {\n  background: #FFFFFF;\n  border: 1px solid #E5E7EB;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.06);\n}\n\n.question-header[_ngcontent-%COMP%] {\n  min-height: 56px;\n  border-bottom: 1px solid #E5E7EB;\n  padding: 0 1.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: #4B5563;\n  font-size: 14px;\n  font-weight: 800;\n}\n\n.question-content[_ngcontent-%COMP%] {\n  padding: 1.75rem 1.5rem 2rem;\n\n  h3 {\n    margin: 0 0 1.5rem;\n    color: #111827;\n    font-size: 22px;\n    line-height: 1.45;\n    font-weight: 800;\n  }\n}\n\n.blank-input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: 56px;\n  border: 1px solid #D1D5DB;\n  border-radius: 10px;\n  padding: 0 1rem;\n  color: #111827;\n  background: #FFFFFF;\n  font: inherit;\n  font-size: 16px;\n\n  &:focus {\n    outline: none;\n    border-color: var(--sqx-color-primary);\n    box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.12);\n  }\n}\n\n.options-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.875rem;\n}\n\n.option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.875rem;\n  padding: 1rem;\n  background: #F9FAFB;\n  border: 1px solid #E5E7EB;\n  border-radius: 10px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n\n  &:hover {\n    border-color: var(--sqx-color-primary);\n    background: #F5F3FF;\n  }\n\n  input {\n    width: 20px;\n    height: 20px;\n    accent-color: var(--sqx-color-primary);\n  }\n\n  span {\n    color: #111827;\n    font-size: 15px;\n    font-weight: 650;\n  }\n\n  &:has(input:checked) {\n    border-color: var(--sqx-color-primary);\n    background: #F5F3FF;\n\n    span {\n      color: var(--sqx-color-primary);\n    }\n  }\n}\n\n.question-actions[_ngcontent-%COMP%] {\n  border-top: 1px solid #E5E7EB;\n  padding: 1rem 1.5rem;\n  display: flex;\n  justify-content: space-between;\n}\n\n.btn[_ngcontent-%COMP%] {\n  min-height: 44px;\n  border: 0;\n  border-radius: 8px;\n  padding: 0 1.25rem;\n  font: inherit;\n  font-weight: 800;\n  cursor: pointer;\n\n  &:disabled {\n    opacity: 0.55;\n    cursor: not-allowed;\n  }\n\n  &.btn-secondary {\n    background: #E5E7EB;\n    color: #111827;\n  }\n\n  &.btn-primary {\n    background: var(--sqx-color-primary);\n    color: #FFFFFF;\n\n    &:hover:not(:disabled) {\n      background: var(--sqx-color-primary-dark);\n    }\n  }\n}\n\n.submitted-card[_ngcontent-%COMP%] {\n  background: #FFFFFF;\n  border: 1px solid #E5E7EB;\n  border-radius: 12px;\n  padding: 2rem;\n  text-align: center;\n  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.06);\n\n  i {\n    color: var(--sqx-color-primary);\n    font-size: 44px;\n  }\n\n  h2 {\n    margin: 1rem 0 0.5rem;\n    color: #111827;\n  }\n\n  p,\n  span {\n    color: #6B7280;\n    display: block;\n    margin-bottom: 1rem;\n  }\n}\n\n@media (max-width: 768px) {\n  .assessment-page[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n\n  .exam-toolbar[_ngcontent-%COMP%], \n   .exam-index-header[_ngcontent-%COMP%] {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .section-row[_ngcontent-%COMP%] {\n    grid-template-columns: 40px minmax(0, 1fr);\n\n    small,\n    em {\n      grid-column: 2 / 3;\n      text-align: left;\n    }\n  }\n\n  .question-actions[_ngcontent-%COMP%] {\n    gap: 0.75rem;\n\n    .btn {\n      flex: 1;\n    }\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OnlineAssessment, [{
        type: Component,
        args: [{ selector: 'sqx-online-assessment', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"assessment-page\">\n  @if (loading) {\n  <div class=\"empty-state\">Loading online assessments...</div>\n  } @else if (error && mode() !== 'exam') {\n  <div class=\"empty-state\">{{ error }}</div>\n  }\n\n  @if (mode() === 'list' && !loading && !error) {\n  <div class=\"exam-list\">\n    @for (exam of availableExams; track exam.id) {\n    <button type=\"button\" class=\"exam-row\" (click)=\"openExam(exam)\">\n      <span class=\"exam-icon\"><i class=\"pi pi-file-edit\"></i></span>\n      <span class=\"exam-info\">\n        <strong>{{ exam.title }}</strong>\n        <small>{{ exam.questionCount }} questions \u2022 {{ exam.durationMinutes }} minutes</small>\n      </span>\n      <i class=\"pi pi-chevron-right\"></i>\n    </button>\n    }\n  </div>\n  }\n\n  @if (mode() === 'section' && selectedExam) {\n  <div class=\"exam-index\">\n    <div class=\"exam-index-header\">\n      <button type=\"button\" class=\"icon-btn\" (click)=\"mode.set('list')\"><i class=\"pi pi-chevron-left\"></i></button>\n      <div>\n        <h2>{{ selectedExam.title }}</h2>\n        <p>{{ selectedExam.durationMinutes }} minutes \u2022 {{ selectedExam.questionCount }} questions</p>\n      </div>\n    </div>\n    <div class=\"section-list\">\n      @for (section of selectedExam.sections; track section.id; let i = $index) {\n      <button type=\"button\" class=\"section-row\" (click)=\"startSection(section)\">\n        <span>{{ i + 1 }}</span>\n        <strong>{{ section.title }}</strong>\n        <small>{{ section.questions.length }} questions</small>\n        <em>Start</em>\n      </button>\n      }\n    </div>\n  </div>\n  }\n\n  @if (mode() === 'exam' && selectedExam && selectedSection && currentQuestion) {\n  <div class=\"exam-shell\">\n    <div class=\"exam-toolbar\">\n      <button type=\"button\" class=\"icon-btn\" (click)=\"backToSections()\"><i class=\"pi pi-chevron-left\"></i></button>\n      <div class=\"exam-title\">\n        <h2>{{ selectedExam.title }}</h2>\n        <p>{{ selectedSection.title }}</p>\n      </div>\n      <div class=\"timer\"><i class=\"pi pi-clock\"></i>{{ formattedTime }}</div>\n    </div>\n\n    @if (error) {\n    <div class=\"inline-error\">{{ error }}</div>\n    }\n\n    <div class=\"question-card\">\n      <div class=\"question-header\">\n        <span>Question {{ currentQuestionIndex() + 1 }} of {{ selectedSection.questions.length }}</span>\n        <span>{{ answeredCount }} answered</span>\n      </div>\n\n      <div class=\"question-content\">\n        <h3>{{ currentQuestion.prompt }}</h3>\n\n        @if (currentQuestion.type === 'blank') {\n        <input class=\"blank-input\" type=\"text\" placeholder=\"Type your answer\"\n          [(ngModel)]=\"answers[currentQuestion.id]\" />\n        }\n\n        @if (currentQuestion.type === 'single_select') {\n        <div class=\"options-list\">\n          @for (option of currentQuestion.options; track option.value) {\n          <label class=\"option\">\n            <input type=\"radio\" [name]=\"currentQuestion.id\" [value]=\"option.value\"\n              [(ngModel)]=\"answers[currentQuestion.id]\" />\n            <span>{{ option.label }}</span>\n          </label>\n          }\n        </div>\n        }\n\n        @if (currentQuestion.type === 'multi_select') {\n        <div class=\"options-list\">\n          @for (option of currentQuestion.options; track option.value) {\n          <label class=\"option\">\n            <input type=\"checkbox\" [checked]=\"isMultiChecked(currentQuestion, option.value)\"\n              (change)=\"toggleMulti(currentQuestion, option.value, $any($event.target).checked)\" />\n            <span>{{ option.label }}</span>\n          </label>\n          }\n        </div>\n        }\n      </div>\n\n      <div class=\"question-actions\">\n        <button class=\"btn btn-secondary\" (click)=\"prevQuestion()\" [disabled]=\"isFirstQuestion\">Previous</button>\n        @if (isLastQuestion) {\n        <button class=\"btn btn-primary\" (click)=\"submitAssessment()\">Submit</button>\n        } @else {\n        <button class=\"btn btn-primary\" (click)=\"nextQuestion()\">Next</button>\n        }\n      </div>\n    </div>\n  </div>\n  }\n\n  @if (mode() === 'submitted' && submissionResult) {\n  <div class=\"submitted-card\">\n    <i class=\"pi pi-check-circle\"></i>\n    <h2>Assessment submitted</h2>\n    <p>{{ submissionResult.answeredCount }} of {{ submissionResult.questionCount }} questions answered.</p>\n    @if (submissionResult.autoSubmitted) {\n    <span>Submitted automatically when the timer ended.</span>\n    }\n    <button class=\"btn btn-primary\" (click)=\"mode.set('list'); selectedExam = null; selectedSection = null\">Back to exams</button>\n  </div>\n  }\n</div>\n", styles: [".assessment-page {\n  width: 100%;\n  min-height: 100vh;\n  background: #F9FAFB;\n  padding: 2rem;\n}\n\n.empty-state,\n.exam-list,\n.exam-index,\n.exam-shell,\n.submitted-card {\n  max-width: 1180px;\n  margin: 0 auto;\n}\n\n.exam-list,\n.section-list {\n  background: #FFFFFF;\n  border: 1px solid #E5E7EB;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 4px 12px rgba(17, 24, 39, 0.04);\n}\n\n.exam-row,\n.section-row {\n  width: 100%;\n  border: 0;\n  border-bottom: 1px solid #E5E7EB;\n  background: #FFFFFF;\n  min-height: 76px;\n  padding: 1rem 1.25rem;\n  display: grid;\n  align-items: center;\n  gap: 1rem;\n  color: #111827;\n  text-align: left;\n  cursor: pointer;\n\n  &:last-child {\n    border-bottom: 0;\n  }\n\n  &:hover {\n    background: #F9FAFB;\n  }\n}\n\n.exam-row {\n  grid-template-columns: 48px minmax(0, 1fr) 24px;\n\n  .exam-icon {\n    width: 40px;\n    height: 40px;\n    border-radius: 10px;\n    background: #EEF2FF;\n    color: var(--sqx-color-primary);\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n  }\n\n  .exam-info {\n    display: flex;\n    flex-direction: column;\n    gap: 0.25rem;\n\n    strong {\n      font-size: 18px;\n      font-weight: 800;\n    }\n\n    small {\n      color: #6B7280;\n      font-size: 13px;\n      font-weight: 700;\n    }\n  }\n\n  > i {\n    color: #9CA3AF;\n  }\n}\n\n.exam-index-header,\n.exam-toolbar {\n  background: #FFFFFF;\n  border: 1px solid #E5E7EB;\n  border-radius: 12px;\n  padding: 1.25rem;\n  margin-bottom: 1rem;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  box-shadow: 0 4px 12px rgba(17, 24, 39, 0.04);\n}\n\n.exam-index-header {\n  h2 {\n    margin: 0 0 0.25rem;\n    color: #111827;\n    font-size: 24px;\n    font-weight: 800;\n  }\n\n  p {\n    margin: 0;\n    color: #6B7280;\n    font-weight: 700;\n  }\n}\n\n.section-row {\n  grid-template-columns: 44px minmax(0, 1fr) 120px 90px;\n\n  span {\n    width: 32px;\n    height: 32px;\n    border-radius: 8px;\n    background: #EEF2FF;\n    color: var(--sqx-color-primary);\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: 800;\n  }\n\n  strong {\n    font-size: 16px;\n    font-weight: 800;\n  }\n\n  small {\n    color: #6B7280;\n    font-size: 13px;\n    font-weight: 700;\n    text-align: right;\n  }\n\n  em {\n    color: var(--sqx-color-primary);\n    font-style: normal;\n    font-weight: 800;\n    text-align: right;\n  }\n}\n\n.icon-btn {\n  width: 42px;\n  height: 42px;\n  border: 1px solid #D9D6F0;\n  border-radius: 10px;\n  background: #FFFFFF;\n  color: var(--sqx-color-primary);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n\n  &:hover {\n    background: #F5F3FF;\n    border-color: var(--sqx-color-primary);\n  }\n}\n\n.exam-toolbar {\n  justify-content: space-between;\n\n  .exam-title {\n    min-width: 0;\n    flex: 1;\n\n    h2 {\n      margin: 0 0 0.25rem;\n      color: #111827;\n      font-size: 22px;\n      font-weight: 800;\n    }\n\n    p {\n      margin: 0;\n      color: #6B7280;\n      font-weight: 700;\n    }\n  }\n}\n\n.timer {\n  min-width: 104px;\n  height: 42px;\n  border-radius: 10px;\n  background: #EEF2FF;\n  color: var(--sqx-color-primary);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  font-size: 16px;\n  font-weight: 900;\n}\n\n.inline-error {\n  max-width: 1180px;\n  margin: 0 auto 1rem;\n  padding: 0.875rem 1rem;\n  border-radius: 10px;\n  border: 1px solid #FCA5A5;\n  background: #FEF2F2;\n  color: #991B1B;\n  font-weight: 700;\n}\n\n.question-card {\n  background: #FFFFFF;\n  border: 1px solid #E5E7EB;\n  border-radius: 12px;\n  overflow: hidden;\n  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.06);\n}\n\n.question-header {\n  min-height: 56px;\n  border-bottom: 1px solid #E5E7EB;\n  padding: 0 1.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: #4B5563;\n  font-size: 14px;\n  font-weight: 800;\n}\n\n.question-content {\n  padding: 1.75rem 1.5rem 2rem;\n\n  h3 {\n    margin: 0 0 1.5rem;\n    color: #111827;\n    font-size: 22px;\n    line-height: 1.45;\n    font-weight: 800;\n  }\n}\n\n.blank-input {\n  width: 100%;\n  min-height: 56px;\n  border: 1px solid #D1D5DB;\n  border-radius: 10px;\n  padding: 0 1rem;\n  color: #111827;\n  background: #FFFFFF;\n  font: inherit;\n  font-size: 16px;\n\n  &:focus {\n    outline: none;\n    border-color: var(--sqx-color-primary);\n    box-shadow: 0 0 0 3px rgba(91, 75, 196, 0.12);\n  }\n}\n\n.options-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0.875rem;\n}\n\n.option {\n  display: flex;\n  align-items: center;\n  gap: 0.875rem;\n  padding: 1rem;\n  background: #F9FAFB;\n  border: 1px solid #E5E7EB;\n  border-radius: 10px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n\n  &:hover {\n    border-color: var(--sqx-color-primary);\n    background: #F5F3FF;\n  }\n\n  input {\n    width: 20px;\n    height: 20px;\n    accent-color: var(--sqx-color-primary);\n  }\n\n  span {\n    color: #111827;\n    font-size: 15px;\n    font-weight: 650;\n  }\n\n  &:has(input:checked) {\n    border-color: var(--sqx-color-primary);\n    background: #F5F3FF;\n\n    span {\n      color: var(--sqx-color-primary);\n    }\n  }\n}\n\n.question-actions {\n  border-top: 1px solid #E5E7EB;\n  padding: 1rem 1.5rem;\n  display: flex;\n  justify-content: space-between;\n}\n\n.btn {\n  min-height: 44px;\n  border: 0;\n  border-radius: 8px;\n  padding: 0 1.25rem;\n  font: inherit;\n  font-weight: 800;\n  cursor: pointer;\n\n  &:disabled {\n    opacity: 0.55;\n    cursor: not-allowed;\n  }\n\n  &.btn-secondary {\n    background: #E5E7EB;\n    color: #111827;\n  }\n\n  &.btn-primary {\n    background: var(--sqx-color-primary);\n    color: #FFFFFF;\n\n    &:hover:not(:disabled) {\n      background: var(--sqx-color-primary-dark);\n    }\n  }\n}\n\n.submitted-card {\n  background: #FFFFFF;\n  border: 1px solid #E5E7EB;\n  border-radius: 12px;\n  padding: 2rem;\n  text-align: center;\n  box-shadow: 0 10px 30px rgba(17, 24, 39, 0.06);\n\n  i {\n    color: var(--sqx-color-primary);\n    font-size: 44px;\n  }\n\n  h2 {\n    margin: 1rem 0 0.5rem;\n    color: #111827;\n  }\n\n  p,\n  span {\n    color: #6B7280;\n    display: block;\n    margin-bottom: 1rem;\n  }\n}\n\n@media (max-width: 768px) {\n  .assessment-page {\n    padding: 1rem;\n  }\n\n  .exam-toolbar,\n  .exam-index-header {\n    align-items: stretch;\n    flex-direction: column;\n  }\n\n  .section-row {\n    grid-template-columns: 40px minmax(0, 1fr);\n\n    small,\n    em {\n      grid-column: 2 / 3;\n      text-align: left;\n    }\n  }\n\n  .question-actions {\n    gap: 0.75rem;\n\n    .btn {\n      flex: 1;\n    }\n  }\n}\n"] }]
    }], () => [{ type: i1.ExamService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OnlineAssessment, { className: "OnlineAssessment", filePath: "src/app/modules/exams/online-assessment/online-assessment.ts", lineNumber: 24 }); })();
