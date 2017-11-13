/**
 * DOMReadyObject
 * abstract class
 */
class DOMReadyFactory{

    constructor(){

        //On ne peut pas instancier la class directement
        if (this.constructor === DOMReadyFactory) {
            throw new TypeError("Cannot construct DOMReadyFactory instances directly");
        }

        //Dom ready
        if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
            this.isDOMReady();
        } else {
            document.addEventListener("DOMContentLoaded", this.isDOMReady.bind(this));
        }
    }
    
    isDOMReady(){}
}