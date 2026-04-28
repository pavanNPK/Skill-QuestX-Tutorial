import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../core/components/navbar/navbar.component';
import { HeaderComponent } from '../core/components/header/header';
import * as i0 from "@angular/core";
export class HomeComponent {
    static ɵfac = function HomeComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || HomeComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: HomeComponent, selectors: [["sqx-home"]], decls: 5, vars: 0, consts: [[1, "content-area"], [1, "main-content"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "sqx-navbar");
            i0.ɵɵelementStart(1, "div", 0);
            i0.ɵɵelement(2, "sqx-header");
            i0.ɵɵelementStart(3, "main", 1);
            i0.ɵɵelement(4, "router-outlet");
            i0.ɵɵelementEnd()();
        } }, dependencies: [RouterOutlet, NavbarComponent, HeaderComponent], styles: ["//[_ngcontent-%COMP%]   Content[_ngcontent-%COMP%]   area[_ngcontent-%COMP%]   (header + main)\n.content-area[_ngcontent-%COMP%] {\n    margin-left: 220px; // Width of sidebar\n    min-height: 100vh;\n    display: flex;\n    flex-direction: column;\n}\n\n//[_ngcontent-%COMP%]   Main[_ngcontent-%COMP%]   Content\n.main-content[_ngcontent-%COMP%] {\n    flex: 1;\n    background: var(--sqx-color-bg);\n    overflow-y: auto;\n}\n\n@media (max-width: 768px) {\n    .content-area[_ngcontent-%COMP%] {\n        margin-left: 0;\n    }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HomeComponent, [{
        type: Component,
        args: [{ selector: 'sqx-home', standalone: true, imports: [RouterOutlet, NavbarComponent, HeaderComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<sqx-navbar></sqx-navbar>\n<div class=\"content-area\">\n  <sqx-header></sqx-header>\n  <main class=\"main-content\">\n    <router-outlet></router-outlet>\n  </main>\n</div>", styles: ["// Content area (header + main)\n.content-area {\n    margin-left: 220px; // Width of sidebar\n    min-height: 100vh;\n    display: flex;\n    flex-direction: column;\n}\n\n// Main Content\n.main-content {\n    flex: 1;\n    background: var(--sqx-color-bg);\n    overflow-y: auto;\n}\n\n@media (max-width: 768px) {\n    .content-area {\n        margin-left: 0;\n    }\n}"] }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/modules/home/home.component.ts", lineNumber: 14 }); })();
