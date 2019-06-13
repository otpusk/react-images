'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VimeoPlayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractPlayer2 = require('./AbstractPlayer');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VimeoPlayer = exports.VimeoPlayer = function (_AbstractPlayer) {
    _inherits(VimeoPlayer, _AbstractPlayer);

    function VimeoPlayer(container) {
        _classCallCheck(this, VimeoPlayer);

        var _this = _possibleConstructorReturn(this, (VimeoPlayer.__proto__ || Object.getPrototypeOf(VimeoPlayer)).call(this, container));

        if (!VimeoPlayer.api && typeof window.Vimeo !== 'undefined') {
            VimeoPlayer.api = window.Vimeo;
        }
        return _this;
    }

    _createClass(VimeoPlayer, [{
        key: 'initialize',
        value: function initialize() {
            return new Promise(function (resolve) {
                if (VimeoPlayer.api) {
                    resolve();
                }

                if (VimeoPlayer.consumers.length === 0) {
                    var script = document.createElement('script');
                    script.setAttribute('src', 'https://player.vimeo.com/api/player.js');
                    script.onload = function () {
                        if (window.Vimeo) {
                            VimeoPlayer.api = window.Vimeo;
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = VimeoPlayer.consumers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var consume = _step.value;

                                    consume();
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                    }
                                } finally {
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }
                        }
                    };
                    document.head.appendChild(script);
                }

                VimeoPlayer.consumers.push(resolve);
            });
        }
    }, {
        key: 'play',
        value: function play(id) {
            var _this2 = this;

            this.initialize().then(function () {
                if (_this2.player) {
                    _this2.player.loadVideo(id);
                    return 0;
                }
                _this2.player = new VimeoPlayer.api.Player(_this2.container, {
                    id: id,
                    height: _this2.container.clientHeight,
                    width: _this2.container.clientWidth
                });

                _this2.player.setVolume(0);
                _this2.player.play();
            });
        }
    }]);

    return VimeoPlayer;
}(_AbstractPlayer2.AbstractPlayer);

VimeoPlayer.api = null;
VimeoPlayer.consumers = [];