import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
export class PageNotFoundComponent {
    static ɵfac = function PageNotFoundComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || PageNotFoundComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PageNotFoundComponent, selectors: [["sqx-page-not-found"]], decls: 5, vars: 0, consts: [[1, "page"]], template: function PageNotFoundComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "section", 0)(1, "h1");
            i0.ɵɵtext(2, "Page Not Found");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(3, "p");
            i0.ɵɵtext(4, "The page you are looking for does not exist.");
            i0.ɵɵdomElementEnd()();
        } }, encapsulation: 2, changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PageNotFoundComponent, [{
        type: Component,
        args: [{ selector: 'sqx-page-not-found', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, template: "<section class=\"page\">\n  <h1>Page Not Found</h1>\n  <p>The page you are looking for does not exist.</p>\n</section>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(PageNotFoundComponent, { className: "PageNotFoundComponent", filePath: "src/app/modules/core/components/page-not-found/page-not-found.component.ts", lineNumber: 10 }); })();
