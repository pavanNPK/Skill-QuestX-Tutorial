import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
export class AccessDeniedComponent {
    static ɵfac = function AccessDeniedComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AccessDeniedComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AccessDeniedComponent, selectors: [["sqx-access-denied"]], decls: 5, vars: 0, consts: [[1, "page"]], template: function AccessDeniedComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0)(1, "h1");
            i0.ɵɵtext(2, "Access Denied");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "p");
            i0.ɵɵtext(4, "You do not have permission to view this page.");
            i0.ɵɵdomElementEnd()();
        } }, encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AccessDeniedComponent, [{
        type: Component,
        args: [{ selector: 'sqx-access-denied', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"page\">\n  <h1>Access Denied</h1>\n  <p>You do not have permission to view this page.</p>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AccessDeniedComponent, { className: "AccessDeniedComponent", filePath: "src/app/modules/core/components/access-denied/access-denied.component.ts", lineNumber: 10 }); })();
