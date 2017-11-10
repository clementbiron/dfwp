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
