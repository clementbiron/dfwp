/**
 * Layout general
 */
class General extends DOMReadyObject{

    constructor() {
        console.log('General.constructor()');
        super();
        svg4everybody();
    }

    isDOMReady(){
        console.log('General.isDOMReady()');
        super.isDOMReady();
    }
}

const generalLayout = new General();