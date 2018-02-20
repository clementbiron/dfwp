//Document ready Promise
document.ready = () => {
    return new Promise(resolve => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            document.addEventListener('DOMContentLoaded', resolve);
        }
    });
};

/**
 * DOMReadyObject
 * abstract class
 */
export class DOMReadyObject {
    constructor() {
        //On ne peut pas instancier la class directement
        if (this.constructor === DOMReadyObject) {
            throw new Error(
                'Cannot construct DOMReadyObject instances directly'
            );
        }

        document.ready().then(() => {
            this.isDOMReady();
        });
    }

    isDOMReady() { }
}
