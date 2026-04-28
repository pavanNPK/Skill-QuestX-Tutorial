import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoaderOverlayComponent } from './shared/components/loader-overlay/loader-overlay.component';
import { LoaderService } from './shared/services/loader.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/toast";
export class App {
    loader = inject(LoaderService);
    static ɵfac = function App_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || App)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: App, selectors: [["sqx-root"]], decls: 3, vars: 1, consts: [["theme", "black", 3, "visible"]], template: function App_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "p-toast")(1, "router-outlet")(2, "sqx-loader-overlay", 0);
        } if (rf & 2) {
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("visible", ctx.loader.visible());
        } }, dependencies: [RouterOutlet, ToastModule, i1.Toast, LoaderOverlayComponent], encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(App, [{
        type: Component,
        args: [{ selector: 'sqx-root', imports: [RouterOutlet, ToastModule, LoaderOverlayComponent], template: "<p-toast />\n<router-outlet></router-outlet>\n<sqx-loader-overlay [visible]=\"loader.visible()\" theme=\"black\" />\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(App, { className: "App", filePath: "src/app/app.ts", lineNumber: 13 }); })();
