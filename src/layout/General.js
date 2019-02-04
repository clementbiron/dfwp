import Lazyload from "../../build/node_modules/vanilla-lazyload/dist/lazyload.min.js";
import "../utils/VHMobile.js";
import { DOMReadyObject } from "../utils/DOMReadyObject.js";

/**
 * Layout general
 */
class General extends DOMReadyObject {

    constructor() {
        console.log('General.constructor()');
        super();

        //Lazyload
        this.lazyload = new Lazyload({
            elements_selector: ".lazy"
        });
        
        //DOM ready 
        Promise.all([document.ready()]).then(() => {

        });
    }

    isDOMReady() {
        console.log('General.isDOMReady()');
        super.isDOMReady();
    }
}

export const generalLayout = new General();