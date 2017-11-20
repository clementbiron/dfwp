/**
 * DOMReadyObject
 * abstract class
 */
class DOMReadyObject{

    constructor(){

        //On ne peut pas instancier la class directement
        if (this.constructor === DOMReadyObject) {
            throw new Error("Cannot construct DOMReadyObject instances directly");
        }

        //Dom ready
        if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
            this.isDOMReady();
        } else {
            document.addEventListener("DOMContentLoaded", () => { 
                this.isDOMReady() 
            });
        }
    }
    
    isDOMReady(){}
}