import { Component } from '@angular/core';
import * as i0 from "@angular/core";
export class LiveStream {
    static ɵfac = function LiveStream_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LiveStream)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LiveStream, selectors: [["sqx-live-stream"]], decls: 8, vars: 0, consts: [[1, "page-container", "live-stream-container"], [1, "live-stream-content"], [1, "empty-state"], [1, "pi", "pi-circle", "live-icon"]], template: function LiveStream_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
            i0.ɵɵdomElement(3, "i", 3);
            i0.ɵɵdomElementStart(4, "h2");
            i0.ɵɵtext(5, "No Live Stream Available");
            i0.ɵɵdomElementEnd();
            i0.ɵɵdomElementStart(6, "p");
            i0.ɵɵtext(7, "Check back later for upcoming live sessions");
            i0.ɵɵdomElementEnd()()()();
        } }, styles: [".live-stream-container[_ngcontent-%COMP%] {\n    min-height: calc(100vh - 140px); // subtract header height + padding\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding-bottom: 0; // Remove bottom padding if handled by flex centering\n}\n\n.live-stream-content[_ngcontent-%COMP%] {\n    width: 100%;\n    max-width: 600px;\n    display: flex;\n    justify-content: center;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n    width: 100%;\n\n    // Icon color override if needed, otherwise inherits from shared\n    .live-icon {\n        color: var(--sqx-color-primary);\n        font-size: 64px;\n        margin-bottom: var(--sqx-space-4);\n    }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LiveStream, [{
        type: Component,
        args: [{ selector: 'sqx-live-stream', imports: [], template: "<div class=\"page-container live-stream-container\">\n    <div class=\"live-stream-content\">\n        <div class=\"empty-state\">\n            <i class=\"pi pi-circle live-icon\"></i>\n            <h2>No Live Stream Available</h2>\n            <p>Check back later for upcoming live sessions</p>\n        </div>\n    </div>\n</div>", styles: [".live-stream-container {\n    min-height: calc(100vh - 140px); // subtract header height + padding\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    padding-bottom: 0; // Remove bottom padding if handled by flex centering\n}\n\n.live-stream-content {\n    width: 100%;\n    max-width: 600px;\n    display: flex;\n    justify-content: center;\n}\n\n.empty-state {\n    width: 100%;\n\n    // Icon color override if needed, otherwise inherits from shared\n    .live-icon {\n        color: var(--sqx-color-primary);\n        font-size: 64px;\n        margin-bottom: var(--sqx-space-4);\n    }\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LiveStream, { className: "LiveStream", filePath: "src/app/modules/classes/live-stream/live-stream.ts", lineNumber: 9 }); })();
