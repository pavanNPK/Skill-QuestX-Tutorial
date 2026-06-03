// use of this file is:
// Core service file. It provides app-wide API/state helpers shared by multiple features.
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

    // use of this is:
    // Sets the global page title shown by the header component.
    updateTitle(title: string) {
        this.titleSubject.next(title);
    }

    // use of this is:
    // Sets global breadcrumb items shown by the header component.
    updateBreadcrumbs(breadcrumbs: BreadcrumbItem[]) {
        this.breadcrumbsSubject.next(breadcrumbs);
    }

    // use of this is:
    // Clears title and breadcrumbs when leaving a feature page.
    reset() {
        this.titleSubject.next('');
        this.breadcrumbsSubject.next([]);
    }

    // use of this is:
    // Lets header know whether a feature has provided its own title.
    hasTitleOverride(): boolean {
        return !!this.titleSubject.value;
    }

    // use of this is:
    // Lets header know whether feature breadcrumbs should replace defaults.
    hasBreadcrumbOverride(): boolean {
        return this.breadcrumbsSubject.value.length > 0;
    }
}
