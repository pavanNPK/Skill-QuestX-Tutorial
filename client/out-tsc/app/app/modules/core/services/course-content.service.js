import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import * as i0 from "@angular/core";
export class CourseContentService {
    http = inject(HttpClient);
    apiUrl = environment.apiUrl;
    getAvailableCourses() {
        const url = `${this.apiUrl}/courses/content/available`;
        this.logRequest('GET', url);
        return this.http.get(url).pipe(tap((courses) => this.logSuccess('GET', url, { courses: courses.length })), catchError((error) => this.logError('GET', url, error)));
    }
    getContent(courseId) {
        const url = `${this.apiUrl}/courses/${courseId}/content`;
        this.logRequest('GET', url);
        return this.http.get(url).pipe(tap((content) => this.logSuccess('GET', url, {
            courseId: content.courseId,
            status: content.status,
            mode: content.mode,
            modules: content.modules.length,
        })), catchError((error) => this.logError('GET', url, error)));
    }
    importContent(courseId, payload) {
        const url = `${this.apiUrl}/courses/${courseId}/content/import`;
        this.logRequest('POST', url);
        return this.http.post(url, payload).pipe(tap((content) => this.logSuccess('POST', url, { courseId: content.courseId, status: content.status })), catchError((error) => this.logError('POST', url, error)));
    }
    saveDraft(courseId, payload) {
        const url = `${this.apiUrl}/courses/${courseId}/content`;
        this.logRequest('PATCH', url);
        return this.http.patch(url, payload).pipe(tap((content) => this.logSuccess('PATCH', url, { courseId: content.courseId, status: content.status })), catchError((error) => this.logError('PATCH', url, error)));
    }
    publish(courseId) {
        const url = `${this.apiUrl}/courses/${courseId}/content/publish`;
        this.logRequest('POST', url);
        return this.http.post(url, {}).pipe(tap((content) => this.logSuccess('POST', url, { courseId: content.courseId, status: content.status })), catchError((error) => this.logError('POST', url, error)));
    }
    unpublish(courseId) {
        const url = `${this.apiUrl}/courses/${courseId}/content/unpublish`;
        this.logRequest('POST', url);
        return this.http.post(url, {}).pipe(tap((content) => this.logSuccess('POST', url, { courseId: content.courseId, status: content.status })), catchError((error) => this.logError('POST', url, error)));
    }
    uploadAsset(courseId, file) {
        const formData = new FormData();
        formData.append('file', file);
        const url = `${this.apiUrl}/courses/${courseId}/content/assets`;
        this.logRequest('POST', url, { fileName: file.name, fileType: file.type, fileSize: file.size });
        return this.http.post(url, formData).pipe(tap((asset) => this.logSuccess('POST', url, { assetId: asset.id, assetUrl: asset.url })), catchError((error) => this.logError('POST', url, error)));
    }
    absoluteAssetUrl(url) {
        if (!url)
            return '';
        if (/^https?:\/\//.test(url))
            return url;
        return `${this.apiUrl.replace(/\/api$/, '')}${url}`;
    }
    logRequest(method, url, details) {
        console.info('[CourseContent API] Request', { method, url, details });
    }
    logSuccess(method, url, details) {
        console.info('[CourseContent API] Success', { method, url, details });
    }
    logError(method, url, error) {
        console.error('[CourseContent API] Error', {
            method,
            url,
            error,
        });
        return throwError(() => error);
    }
    static ɵfac = function CourseContentService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CourseContentService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: CourseContentService, factory: CourseContentService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CourseContentService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
