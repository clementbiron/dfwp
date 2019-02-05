import Lazyload from "../../build/node_modules/vanilla-lazyload/dist/lazyload.min.js";
import { DOMReadyObject } from "../utils/DOMReadyObject.js";
import "../utils/VHMobile.js";
import { ScrollDirection } from "../utils/ScrollDirection.js";

/**
 * Layout general
 */
class General extends DOMReadyObject {

    constructor() {
        console.log('General.constructor()');
        super();

        //IE 11
        this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

        //ladyload
        (this.lazyload === undefined) ? this.lazyload = new Lazyload({ elements_selector: ".lazy" }) : this.lazyload.update();

        //Create component
    }

    isDOMReady() {
        console.log('General.isDOMReady()');
        super.isDOMReady();
    }
}

export const generalLayout = new General();