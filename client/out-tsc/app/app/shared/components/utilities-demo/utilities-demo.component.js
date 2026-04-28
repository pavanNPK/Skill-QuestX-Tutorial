import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "primeng/button";
import * as i2 from "primeng/inputtext";
export class UtilitiesDemoComponent {
    static ɵfac = function UtilitiesDemoComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UtilitiesDemoComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UtilitiesDemoComponent, selectors: [["sqx-utilities-demo"]], decls: 36, vars: 1, consts: [[1, "p-6"], [1, "text-3xl", "font-bold", "mb-4"], [1, "mb-8"], [1, "text-xl", "font-semibold", "mb-2"], [1, "flex", "flex-wrap", "gap-2"], ["label", "Submit", "icon", "pi pi-check"], ["label", "Delete", "icon", "pi pi-trash", "severity", "danger"], ["label", "Search", "icon", "pi pi-search", "severity", "secondary"], ["label", "Settings", "icon", "pi pi-cog", "severity", "info", 3, "outlined"], [1, "flex", "flex-column", "gap-2"], ["for", "username"], ["pInputText", "", "id", "username", "aria-describedby", "username-help", 1, "w-full", "md:w-20rem"], ["id", "username-help"], [1, "grid"], [1, "col-12", "md:col-6", "lg:col-3"], [1, "p-3", "border-round-sm", "bg-primary", "font-bold", "text-center"], [1, "p-3", "border-round-sm", "bg-primary-reverse", "font-bold", "text-center"]], template: function UtilitiesDemoComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "h1", 1);
            i0.ɵɵtext(2, "PrimeNG + PrimeFlex Verification");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(3, "section", 2)(4, "h2", 3);
            i0.ɵɵtext(5, "PrimeNG Buttons & PrimeIcons");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(6, "div", 4);
            i0.ɵɵelement(7, "p-button", 5)(8, "p-button", 6)(9, "p-button", 7)(10, "p-button", 8);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(11, "section", 2)(12, "h2", 3);
            i0.ɵɵtext(13, "PrimeNG Inputs");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 9)(15, "label", 10);
            i0.ɵɵtext(16, "Username");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(17, "input", 11);
            i0.ɵɵelementStart(18, "small", 12);
            i0.ɵɵtext(19, "Enter your username to reset your password.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(20, "section")(21, "h2", 3);
            i0.ɵɵtext(22, "PrimeFlex Grid System");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 13)(24, "div", 14)(25, "div", 15);
            i0.ɵɵtext(26, "Col 1");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(27, "div", 14)(28, "div", 16);
            i0.ɵɵtext(29, "Col 2");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(30, "div", 14)(31, "div", 15);
            i0.ɵɵtext(32, "Col 3");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(33, "div", 14)(34, "div", 16);
            i0.ɵɵtext(35, "Col 4");
            i0.ɵɵelementEnd()()()()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("outlined", true);
        } }, dependencies: [CommonModule, ButtonModule, i1.Button, InputTextModule, i2.InputText], styles: [".demo[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n  padding: 16px;\n}\n\n.title[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin: 0;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--sqx-color-muted);\n}\n\n.card[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n  padding: 16px;\n  border: 1px solid var(--sqx-color-border);\n  border-radius: var(--sqx-radius-md);\n  background: var(--sqx-color-surface);\n}\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px 12px;\n  border-radius: 9999px;\n  background: #eef2ff;\n  color: #3730a3;\n  font-weight: 600;\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UtilitiesDemoComponent, [{
        type: Component,
        args: [{ selector: 'sqx-utilities-demo', standalone: true, imports: [CommonModule, ButtonModule, InputTextModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"p-6\">\n  <h1 class=\"text-3xl font-bold mb-4\">PrimeNG + PrimeFlex Verification</h1>\n\n  <section class=\"mb-8\">\n    <h2 class=\"text-xl font-semibold mb-2\">PrimeNG Buttons & PrimeIcons</h2>\n    <div class=\"flex flex-wrap gap-2\">\n      <p-button label=\"Submit\" icon=\"pi pi-check\"></p-button>\n      <p-button label=\"Delete\" icon=\"pi pi-trash\" severity=\"danger\"></p-button>\n      <p-button label=\"Search\" icon=\"pi pi-search\" severity=\"secondary\"></p-button>\n      <p-button label=\"Settings\" icon=\"pi pi-cog\" severity=\"info\" [outlined]=\"true\"></p-button>\n    </div>\n  </section>\n\n  <section class=\"mb-8\">\n    <h2 class=\"text-xl font-semibold mb-2\">PrimeNG Inputs</h2>\n    <div class=\"flex flex-column gap-2\">\n      <label for=\"username\">Username</label>\n      <input pInputText id=\"username\" aria-describedby=\"username-help\" class=\"w-full md:w-20rem\" />\n      <small id=\"username-help\">Enter your username to reset your password.</small>\n    </div>\n  </section>\n\n  <section>\n    <h2 class=\"text-xl font-semibold mb-2\">PrimeFlex Grid System</h2>\n    <div class=\"grid\">\n      <div class=\"col-12 md:col-6 lg:col-3\">\n        <div class=\"p-3 border-round-sm bg-primary font-bold text-center\">Col 1</div>\n      </div>\n      <div class=\"col-12 md:col-6 lg:col-3\">\n        <div class=\"p-3 border-round-sm bg-primary-reverse font-bold text-center\">Col 2</div>\n      </div>\n      <div class=\"col-12 md:col-6 lg:col-3\">\n        <div class=\"p-3 border-round-sm bg-primary font-bold text-center\">Col 3</div>\n      </div>\n      <div class=\"col-12 md:col-6 lg:col-3\">\n        <div class=\"p-3 border-round-sm bg-primary-reverse font-bold text-center\">Col 4</div>\n      </div>\n    </div>\n  </section>\n</div>", styles: [".demo {\n  display: grid;\n  gap: 16px;\n  padding: 16px;\n}\n\n.title {\n  font-size: 24px;\n  margin: 0;\n}\n\n.subtitle {\n  margin: 0;\n  color: var(--sqx-color-muted);\n}\n\n.card {\n  display: grid;\n  gap: 12px;\n  padding: 16px;\n  border: 1px solid var(--sqx-color-border);\n  border-radius: var(--sqx-radius-md);\n  background: var(--sqx-color-surface);\n}\n\n.badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 6px 12px;\n  border-radius: 9999px;\n  background: #eef2ff;\n  color: #3730a3;\n  font-weight: 600;\n}\n"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UtilitiesDemoComponent, { className: "UtilitiesDemoComponent", filePath: "src/app/shared/components/utilities-demo/utilities-demo.component.ts", lineNumber: 14 }); })();
