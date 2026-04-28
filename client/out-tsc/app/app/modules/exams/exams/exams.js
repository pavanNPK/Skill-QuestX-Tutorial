import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as i0 from "@angular/core";
export class Exams {
    static ɵfac = function Exams_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Exams)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Exams, selectors: [["sqx-exams"]], decls: 1, vars: 0, template: function Exams_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "router-outlet");
        } }, dependencies: [RouterOutlet], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Exams, [{
        type: Component,
        args: [{ selector: 'sqx-exams', imports: [RouterOutlet], template: "<router-outlet></router-outlet>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Exams, { className: "Exams", filePath: "src/app/modules/exams/exams/exams.ts", lineNumber: 10 }); })();
