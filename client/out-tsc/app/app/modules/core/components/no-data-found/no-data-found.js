import { Component } from '@angular/core';
import * as i0 from "@angular/core";
export class NoDataFound {
    static ɵfac = function NoDataFound_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || NoDataFound)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: NoDataFound, selectors: [["sqx-no-data-found"]], decls: 2, vars: 0, template: function NoDataFound_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "p");
            i0.ɵɵtext(1, "no-data-found works!");
            i0.ɵɵdomElementEnd();
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(NoDataFound, [{
        type: Component,
        args: [{ selector: 'sqx-no-data-found', imports: [], template: "<p>no-data-found works!</p>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(NoDataFound, { className: "NoDataFound", filePath: "src/app/modules/core/components/no-data-found/no-data-found.ts", lineNumber: 9 }); })();
