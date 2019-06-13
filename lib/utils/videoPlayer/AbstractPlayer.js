"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractPlayer = exports.AbstractPlayer = function () {
    function AbstractPlayer(container) {
        _classCallCheck(this, AbstractPlayer);

        this.container = container;
        this.player = null;

        this.initialize = this.initialize.bind(this);
        this.play = this.play.bind(this);
        this.isReady = this.isReady.bind(this);
        this.stop = this.stop.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    _createClass(AbstractPlayer, [{
        key: "initialize",
        value: function initialize() {}
    }, {
        key: "isReady",
        value: function isReady() {}
    }, {
        key: "play",
        value: function play() {}
    }, {
        key: "stop",
        value: function stop() {}
    }, {
        key: "destroy",
        value: function destroy() {}
    }]);

    return AbstractPlayer;
}();