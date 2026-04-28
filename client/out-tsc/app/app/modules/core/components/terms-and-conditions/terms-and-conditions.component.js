import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
export class TermsAndConditionsComponent {
    static ɵfac = function TermsAndConditionsComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TermsAndConditionsComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TermsAndConditionsComponent, selectors: [["sqx-terms-and-conditions"]], decls: 5, vars: 0, consts: [[1, "page"]], template: function TermsAndConditionsComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0)(1, "h1");
            i0.ɵɵtext(2, "Terms and Conditions");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "p");
            i0.ɵɵtext(4, "Terms and conditions content goes here.");
            i0.ɵɵdomElementEnd()();
        } }, encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TermsAndConditionsComponent, [{
        type: Component,
        args: [{ selector: 'sqx-terms-and-conditions', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"page\">\n  <h1>Terms and Conditions</h1>\n  <p>Terms and conditions content goes here.</p>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(TermsAndConditionsComponent, { className: "TermsAndConditionsComponent", filePath: "src/app/modules/core/components/terms-and-conditions/terms-and-conditions.component.ts", lineNumber: 10 }); })();
