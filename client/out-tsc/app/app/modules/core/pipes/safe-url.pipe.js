import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class SafeUrlPipe {
    sanitizer;
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(url) {
        if (!url)
            return this.sanitizer.bypassSecurityTrustResourceUrl('');
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    static ɵfac = function SafeUrlPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || SafeUrlPipe)(i0.ɵɵdirectiveInject(i1.DomSanitizer, 16)); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "safeUrl", type: SafeUrlPipe, pure: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SafeUrlPipe, [{
        type: Pipe,
        args: [{
                name: 'safeUrl',
                standalone: true
            }]
    }], () => [{ type: i1.DomSanitizer }], null); })();
