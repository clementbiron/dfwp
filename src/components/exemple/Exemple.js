import { DOMReadyObject } from '../../utils/DOMReadyObject.js';

/**
 * Exemple component
 */
export class Exemple extends DOMReadyObject{
	constructor() {
        console.log('Exemple.constructor()');
        super();
        this.class = '.exemple';
    }

     isDOMReady() {
        console.log('Exemple.isDOMReady()');
        super.isDOMReady();
        this.$dom = document.querySelector(this.class);
    }

    initAnim() {
        console.log('Exemple.initAnim()');
    }
}
