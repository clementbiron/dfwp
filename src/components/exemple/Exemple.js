/**
 * Exemple compoenent
 */
class Exemple extends DOMReadyFactory {

	constructor() {
		console.log('Exemple.constructor()');
		super();
		this.domTargetClass = '.exemple';
	}

	isDOMReady() {
		console.log('Exemple.isDOMReady()');
		super.isDOMReady();
		this.$domTarget = document.querySelector(this.domTargetClass);
		if (this.$domTarget != null) {
			//console.log(this.$domTarget);
		}
	}
}
const exempleComponent = new Exemple();
