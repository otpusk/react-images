'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.YoutubePlayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractPlayer2 = require('./AbstractPlayer');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YoutubePlayer = exports.YoutubePlayer = function (_AbstractPlayer) {
    _inherits(YoutubePlayer, _AbstractPlayer);

    function YoutubePlayer(container) {
        _classCallCheck(this, YoutubePlayer);

        var _this = _possibleConstructorReturn(this, (YoutubePlayer.__proto__ || Object.getPrototypeOf(YoutubePlayer)).call(this, container));

        if (!YoutubePlayer.api && typeof window.YT !== 'undefined') {
            YoutubePlayer.api = window.YT;
        }
        return _this;
    }

    _createClass(YoutubePlayer, [{
        key: 'initialize',
        value: function initialize() {
            return new Promise(function (resolve) {
                if (YoutubePlayer.api) {
                    resolve();
                }

                if (YoutubePlayer.consumers.length === 0) {
                    var script = document.createElement('script');
                    script.setAttribute('src', 'https://www.youtube.com/iframe_api');
                    document.head.appendChild(script);

                    window.onYouTubeIframeAPIReady = function () {
                        YoutubePlayer.api = window.YT;
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = YoutubePlayer.consumers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
                    };
                }

                YoutubePlayer.consumers.push(resolve);
            });
        }
    }, {
        key: 'play',
        value: function play(id) {
            var _this2 = this;

            this.initialize().then(function () {
                if (_this2.player) {
                    _this2.player.loadVideoById(id);

                    return 0;
                }

                _this2.player = new YoutubePlayer.api.Player(_this2.container, {
                    videoId: id,
                    playerVars: {
                        controls: 1,
                        modestbranding: 1,
                        showinfo: 0,
                        disablekb: 1,
                        rel: 0
                    },
                    events: {
                        onReady: function onReady() {
                            _this2.player.playVideo();
                            _this2.player.mute();
                        }
                    }
                });
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            if (this.player) {
                this.player.destroy();
            }
        }
    }]);

    return YoutubePlayer;
}(_AbstractPlayer2.AbstractPlayer);

YoutubePlayer.api = null;
YoutubePlayer.consumers = [];