import {DOMReadyObject} from "../utils/DOMReadyObject.js";
import {exempleCollection} from "../components/exemple/ExempleCollection.js";

/**
 * Layout general
 */
class General extends DOMReadyObject{

    constructor() {
        console.log('General.constructor()');
        super();
        svg4everybody();
        console.log('exempleCollection : ',exempleCollection);
    }

    isDOMReady(){
        console.log('General.isDOMReady()');
        super.isDOMReady();
    }
}

export const generalLayout = new General();

