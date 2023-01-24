import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll {
    constructor(els, thresholdPercent) {
        this.itemsToReveal = els;
        this.thresholdPercent = thresholdPercent;
        this.browserHeight = window.innerHeight;
        this.hideInitially();
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
        this.events();
    }

    events() {
        window.addEventListener("scroll", this.scrollThrottle);
        window.addEventListener("resize", debounce(() => {
            console.log("Resize just ran");
            this.browserHeight = window.innerHeight
        }, 333))
    }

    calcCaller() {
        console.log("Scroll function ran");
        this.itemsToReveal.forEach(el => {
            if(el.isRevealed == false) {
                this.calculateIfScrolledTo(el)
            }
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }

    calculateIfScrolledTo(el) {
        if (window.scrollY + this.browserHeight > el.offsetTop) {
            console.log("Element was calculated");
            let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
            if(scrollPercent < this.thresholdPercent) {
                el.classList.add("reveal-item--is-visible");
                el.isRevealed = true;
                if(el.isLastItem) {
                    window.removeEventListener("scroll", this.scrollThrottle);
                }
            }
        }
    }
    hideInitially() {
        this.itemsToReveal.forEach((el) => {
            el.classList.add("reveal-item")
            el.isRevealed = false;
        });
    }
}

export default RevealOnScroll;