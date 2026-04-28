import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
function LoaderOverlayComponent_Conditional_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵdomElementStart(0, "div", 1);
    i0.ɵɵdomElement(1, "div", 2);
    i0.ɵɵdomElementStart(2, "div", 3)(3, "div", 4);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵdomElementStart(4, "svg", 5);
    i0.ɵɵdomElement(5, "circle", 6);
    i0.ɵɵdomElementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("theme-white", ctx_r0.theme() === "white")("theme-black", ctx_r0.theme() === "black");
} }
export class LoaderOverlayComponent {
    /** When true, overlay is visible. */
    visible = input(false, ...(ngDevMode ? [{ debugName: "visible" }] : []));
    /** 'white' | 'black' – blur backdrop color. */
    theme = input('black', ...(ngDevMode ? [{ debugName: "theme" }] : []));
    static ɵfac = function LoaderOverlayComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LoaderOverlayComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LoaderOverlayComponent, selectors: [["sqx-loader-overlay"]], inputs: { visible: [1, "visible"], theme: [1, "theme"] }, decls: 1, vars: 1, consts: [[1, "loader-overlay", 3, "theme-white", "theme-black"], [1, "loader-overlay"], [1, "loader-backdrop"], [1, "loader-center"], [1, "loader-svg-wrap"], ["viewBox", "0 0 50 50", "aria-hidden", "true", 1, "loader-svg"], ["cx", "25", "cy", "25", "r", "20", "fill", "none", "stroke-width", "3", "stroke", "currentColor", "stroke-linecap", "round", 1, "loader-circle"]], template: function LoaderOverlayComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵconditionalCreate(0, LoaderOverlayComponent_Conditional_0_Template, 6, 4, "div", 0);
        } if (rf & 2) {
            i0.ɵɵconditional(ctx.visible() ? 0 : -1);
        } }, dependencies: [CommonModule], styles: [".loader-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 9999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: auto;\n\n  .loader-backdrop {\n    position: absolute;\n    inset: 0;\n    backdrop-filter: blur(6px);\n    -webkit-backdrop-filter: blur(6px);\n  }\n\n  &.theme-black .loader-backdrop {\n    background: rgba(0, 0, 0, 0.35);\n  }\n\n  &.theme-white .loader-backdrop {\n    background: rgba(255, 255, 255, 0.5);\n  }\n\n  .loader-center {\n    position: relative;\n    z-index: 1;\n  }\n\n  .loader-svg-wrap {\n    width: 56px;\n    height: 56px;\n    color: var(--sqx-loader-color, #fff);\n  }\n\n  &.theme-white .loader-svg-wrap {\n    color: var(--sqx-loader-color, #333);\n  }\n\n  .loader-svg {\n    width: 100%;\n    height: 100%;\n    animation: _ngcontent-%COMP%_sqx-loader-rotate 0.8s linear infinite;\n  }\n\n  .loader-circle {\n    stroke-dasharray: 90 150;\n    stroke-dashoffset: 0;\n    animation: _ngcontent-%COMP%_sqx-loader-dash 1.5s ease-in-out infinite;\n  }\n}\n\n@keyframes _ngcontent-%COMP%_sqx-loader-rotate {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes _ngcontent-%COMP%_sqx-loader-dash {\n  0% {\n    stroke-dasharray: 90 150;\n    stroke-dashoffset: 0;\n  }\n  50% {\n    stroke-dasharray: 60 150;\n    stroke-dashoffset: -35;\n  }\n  100% {\n    stroke-dasharray: 90 150;\n    stroke-dashoffset: -90;\n  }\n}"], changeDetection: 0 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoaderOverlayComponent, [{
        type: Component,
        args: [{ selector: 'sqx-loader-overlay', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "@if (visible()) {\n  <div class=\"loader-overlay\" [class.theme-white]=\"theme() === 'white'\" [class.theme-black]=\"theme() === 'black'\">\n    <div class=\"loader-backdrop\"></div>\n    <div class=\"loader-center\">\n      <div class=\"loader-svg-wrap\">\n        <svg class=\"loader-svg\" viewBox=\"0 0 50 50\" aria-hidden=\"true\">\n          <circle class=\"loader-circle\" cx=\"25\" cy=\"25\" r=\"20\" fill=\"none\" stroke-width=\"3\" stroke=\"currentColor\" stroke-linecap=\"round\" />\n        </svg>\n      </div>\n    </div>\n  </div>\n}\n", styles: [".loader-overlay {\n  position: fixed;\n  inset: 0;\n  z-index: 9999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  pointer-events: auto;\n\n  .loader-backdrop {\n    position: absolute;\n    inset: 0;\n    backdrop-filter: blur(6px);\n    -webkit-backdrop-filter: blur(6px);\n  }\n\n  &.theme-black .loader-backdrop {\n    background: rgba(0, 0, 0, 0.35);\n  }\n\n  &.theme-white .loader-backdrop {\n    background: rgba(255, 255, 255, 0.5);\n  }\n\n  .loader-center {\n    position: relative;\n    z-index: 1;\n  }\n\n  .loader-svg-wrap {\n    width: 56px;\n    height: 56px;\n    color: var(--sqx-loader-color, #fff);\n  }\n\n  &.theme-white .loader-svg-wrap {\n    color: var(--sqx-loader-color, #333);\n  }\n\n  .loader-svg {\n    width: 100%;\n    height: 100%;\n    animation: sqx-loader-rotate 0.8s linear infinite;\n  }\n\n  .loader-circle {\n    stroke-dasharray: 90 150;\n    stroke-dashoffset: 0;\n    animation: sqx-loader-dash 1.5s ease-in-out infinite;\n  }\n}\n\n@keyframes sqx-loader-rotate {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes sqx-loader-dash {\n  0% {\n    stroke-dasharray: 90 150;\n    stroke-dashoffset: 0;\n  }\n  50% {\n    stroke-dasharray: 60 150;\n    stroke-dashoffset: -35;\n  }\n  100% {\n    stroke-dasharray: 90 150;\n    stroke-dashoffset: -90;\n  }\n}\n"] }]
    }], null, { visible: [{ type: i0.Input, args: [{ isSignal: true, alias: "visible", required: false }] }], theme: [{ type: i0.Input, args: [{ isSignal: true, alias: "theme", required: false }] }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LoaderOverlayComponent, { className: "LoaderOverlayComponent", filePath: "src/app/shared/components/loader-overlay/loader-overlay.component.ts", lineNumber: 12 }); })();
