/**
 * Layout general
 */
class General extends DOMReadyFactory{

    constructor() {
        console.log('General.constructor()');
        super();
    }

    isDOMReady(){
        console.log('General.isDOMReady()');
        super.isDOMReady();
    }
}

const generalLayout = new General();