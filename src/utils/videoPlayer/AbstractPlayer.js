export class AbstractPlayer {
    	constructor (container) {
        	this.container = container;
        	this.player = null;

        	this.initialize = this.initialize.bind(this);
        	this.play = this.play.bind(this);
        	this.isReady = this.isReady.bind(this);
        	this.stop = this.stop.bind(this);
        	this.destroy = this.destroy.bind(this);
    }

    	initialize () { }
    	isReady () { }
    	play () { }
    	stop () { }
    	destroy () { }
}
