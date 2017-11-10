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
/**
 * Exemple compoenent
 */
class Exemple extends DOMReadyObject {
	constructor() {
		console.log('Exemple.constructor()');
		super();
		this.$domTargetClass = '.exemple';
	}

	isDOMReady() {
		console.log('Exemple.isDOMReady()');
		super.isDOMReady();
		this.$domTarget = document.querySelector(this.$domTargetClass);
		if (this.$domTarget != null) {
			//console.log(this.$domTarget);
		}
	}
}
const exemple = new Exemple();

/**
 * Pour la page d'accueil
 */
class Home extends DOMReadyObject{

    constructor(){
        console.log('Home.constructor()');
        super();
        this.$domTargetClass = '.home';
    }

    isDOMReady(){
        console.log('Home.isDOMReady()');
        super.isDOMReady();
        this.$domTarget = document.querySelector(this.$domTargetClass);
        if (this.$domTarget != null){
            //console.log(this.$domTarget);
        }
    }
}

const home = new Home();
