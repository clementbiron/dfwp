export class ScrollDirection {

    constructor() {
        this.scrollData = {
            position: null,
            direction: null,
            hasDirectionChange: false
        }

        window.addEventListener('scroll', (e) => this.setScrollDirection(e));
    }

    setScrollDirection(e) {
        let newScrollData = {};
        newScrollData.position = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);

        //On stocke la direction
        if (newScrollData.position > this.scrollData.position) {
            newScrollData.direction = 'down';
        } else {
            newScrollData.direction = 'up';
        }

        //Si on change de direction
        if (this.scrollData.direction != newScrollData.direction) {
            newScrollData.hasDirectionChange = true;
        }

        //On dispatch un event
        window.dispatchEvent(new CustomEvent('ScrollDirection_scrollchange', { detail: newScrollData }));

        //On stocke les données
        this.scrollData = newScrollData;
    }
}