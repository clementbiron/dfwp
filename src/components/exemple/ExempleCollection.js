/**
 * Exemple collections
 */
class ExempleCollection extends DOMReadyObject {

    constructor() {
        console.log('ExempleCollection.constructor()');
        super();
        this.class = '.exemple';
        this.exemples = new Set();
    }

    isDOMReady() {
        console.log('ExempleCollection.isDOMReady()');
        super.isDOMReady();
        this.$exemples = document.querySelectorAll(this.class);
        if(this.$exemples.length > 0){
            for (const $exemple of this.$exemples){;
                this.exemples.add(new Exemple($exemple));
            }
            console.log('ExempleCollection exemples',this.exemples);
        }
    }
}

const exempleCollection = new ExempleCollection();
