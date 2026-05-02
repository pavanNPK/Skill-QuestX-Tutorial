import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
export class ExamService {
    http = inject(HttpClient);
    apiUrl = environment.apiUrl;
    getAvailableExams() {
        return this.http.get(`${this.apiUrl}/exams/available`);
    }
    getExam(examId) {
        return this.http.get(`${this.apiUrl}/exams/${examId}`);
    }
    submitExam(examId, answers, autoSubmitted = false) {
        return this.http.post(`${this.apiUrl}/exams/${examId}/submit`, {
            answers,
            autoSubmitted,
        });
    }
    static ɵfac = function ExamService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ExamService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ExamService, factory: ExamService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ExamService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
