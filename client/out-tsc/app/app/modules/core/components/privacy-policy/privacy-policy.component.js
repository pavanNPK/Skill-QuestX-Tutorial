import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
export class PrivacyPolicyComponent {
    static ɵfac = function PrivacyPolicyComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PrivacyPolicyComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PrivacyPolicyComponent, selectors: [["sqx-privacy-policy"]], decls: 5, vars: 0, consts: [[1, "page"]], template: function PrivacyPolicyComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0)(1, "h1");
            i0.ɵɵtext(2, "Privacy Policy");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "p");
            i0.ɵɵtext(4, "Privacy policy content goes here.");
            i0.ɵɵdomElementEnd()();
        } }, encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PrivacyPolicyComponent, [{
        type: Component,
        args: [{ selector: 'sqx-privacy-policy', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"page\">\n  <h1>Privacy Policy</h1>\n  <p>Privacy policy content goes here.</p>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PrivacyPolicyComponent, { className: "PrivacyPolicyComponent", filePath: "src/app/modules/core/components/privacy-policy/privacy-policy.component.ts", lineNumber: 10 }); })();
