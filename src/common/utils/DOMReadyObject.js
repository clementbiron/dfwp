/**
 * DOMReadyObject
 * abstract class
 */
class DOMReadyObject{

    constructor(){

        //On ne peut pas instancier la class directement
        if (new.target === DOMReadyObject) {
            throw new TypeError("Cannot construct DOMReadyObject instances directly");
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