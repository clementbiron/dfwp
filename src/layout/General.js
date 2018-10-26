import Svg4everybody from "../../build/node_modules/svg4everybody/dist/svg4everybody.min.js";
import Lazyload from "../../build/node_modules/vanilla-lazyload/dist/lazyload.min.js";
import { DOMReadyObject } from "../utils/DOMReadyObject.js";


/**
 * Layout general
 */
class General extends DOMReadyObject {

    constructor() {
        console.log('General.constructor()');
        super();

        //SVG for everybody
        this.svg4everybody = new Svg4everybody();

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