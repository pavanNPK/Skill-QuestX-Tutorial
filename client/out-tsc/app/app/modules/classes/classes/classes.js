import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as i0 from "@angular/core";
export class Classes {
    static ɵfac = function Classes_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Classes)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Classes, selectors: [["sqx-classes"]], decls: 1, vars: 0, template: function Classes_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "router-outlet");
        } }, dependencies: [RouterOutlet], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Classes, [{
        type: Component,
        args: [{ selector: 'sqx-classes', imports: [RouterOutlet], template: "<router-outlet></router-outlet>" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Classes, { className: "Classes", filePath: "src/app/modules/classes/classes/classes.ts", lineNumber: 10 }); })();
