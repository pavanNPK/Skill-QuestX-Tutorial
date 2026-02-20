import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface BreadcrumbItem {
    label?: string; // Optional (e.g. for Home icon)
    url?: string;
    command?: () => void;
    title?: string; // For Tooltip
    icon?: string; // Add icon support as it is used in code
}

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    private titleSubject = new BehaviorSubject<string>('');
    private breadcrumbsSubject = new BehaviorSubject<BreadcrumbItem[]>([]);

    title$ = this.titleSubject.asObservable();
    breadcrumbs$ = this.breadcrumbsSubject.asObservable();

    updateTitle(title: string) {
        this.titleSubject.next(title);
    }

    updateBreadcrumbs(breadcrumbs: BreadcrumbItem[]) {
        this.breadcrumbsSubject.next(breadcrumbs);
    }

    reset() {
        this.titleSubject.next('');
        this.breadcrumbsSubject.next([]);
    }

    hasTitleOverride(): boolean {
        return !!this.titleSubject.value;
    }

    hasBreadcrumbOverride(): boolean {
        return this.breadcrumbsSubject.value.length > 0;
    }
}
