/**
 * Layout general
 */
class General extends DOMReadyObject{

    constructor() {
        console.log('General.constructor()');
        super();
    }

    isDOMReady(){
        console.log('General.isDOMReady()');
        super.isDOMReady();
    }
}

const general = new General();