// use of this file is:
// Core pipe file. It formats or sanitizes values reused across the app.
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
    name: 'safeUrl',
    standalone: true
})
export class SafeUrlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    transform(url: string | undefined | null): SafeResourceUrl {
        if (!url) return this.sanitizer.bypassSecurityTrustResourceUrl('');
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
