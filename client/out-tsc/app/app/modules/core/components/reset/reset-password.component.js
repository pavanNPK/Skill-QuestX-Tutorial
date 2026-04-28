import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
export class ResetPasswordComponent {
    static ɵfac = function ResetPasswordComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ResetPasswordComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ResetPasswordComponent, selectors: [["sqx-reset-password"]], decls: 5, vars: 0, consts: [[1, "page"]], template: function ResetPasswordComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0)(1, "h1");
            i0.ɵɵtext(2, "Reset Password");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "p");
            i0.ɵɵtext(4, "Set a new password.");
            i0.ɵɵdomElementEnd()();
        } }, encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ResetPasswordComponent, [{
        type: Component,
        args: [{ selector: 'sqx-reset-password', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"page\">\n  <h1>Reset Password</h1>\n  <p>Set a new password.</p>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(ResetPasswordComponent, { className: "ResetPasswordComponent", filePath: "src/app/modules/core/components/reset/reset-password.component.ts", lineNumber: 10 }); })();
