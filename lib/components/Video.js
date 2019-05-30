'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Core


var YOUTUBE_API = 'https://www.youtube.com/iframe_api';
var YOUTUBE_API_CONSUMERS = [];
var STYLES = {
	FIGURE: {
		width: '100vw',
		maxWidth: '1024px',
		position: 'relative',
		overflow: 'hidden',
		paddingTop: '56.25%'
	},
	IFRAME: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		border: 0
	}
};

window.onYouTubeIframeAPIReady = function () {
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = YOUTUBE_API_CONSUMERS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var consumer = _step.value;

			consumer(window.YT);
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

var Video = function (_Component) {
	_inherits(Video, _Component);

	function Video(props) {
		_classCallCheck(this, Video);

		var _this = _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).call(this, props));

		var ready = Boolean(window.YT);

		_this.state = { ready: ready, api: window.YT };
		_this.node = (0, _react.createRef)();
		_this.player = null;

		if (!ready) {
			if (YOUTUBE_API_CONSUMERS.length === 0) {
				var script = document.createElement('script');
				script.setAttribute('src', YOUTUBE_API);
				document.head.appendChild(script);
			}

			YOUTUBE_API_CONSUMERS.push(function (YT) {
				return _this.setState({
					ready: true,
					api: YT
				});
			});
		}

		_this.createPlayer = _this.createPlayer.bind(_this);
		_this.changeVideo = _this.changeVideo.bind(_this);
		return _this;
	}

	_createClass(Video, [{
		key: 'componentDidUpdate',
		value: function componentDidUpdate(_ref) {
			var prevId = _ref.id;
			var changeVideo = this.changeVideo,
			    createPlayer = this.createPlayer;
			var ready = this.state.ready;
			var id = this.props.id;

			var initialized = !!this.player;
			var videoChanged = prevId !== id;

			ready && !initialized && createPlayer();
			ready && initialized && videoChanged && changeVideo(id);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.player && this.player.destroy();
		}
	}, {
		key: 'createPlayer',
		value: function createPlayer() {
			var _this2 = this;

			var id = this.props.id;


			this.player = new window.YT.Player(this.node.current, {
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
		}
	}, {
		key: 'changeVideo',
		value: function changeVideo(videoId) {
			'loadVideoById' in this.player && this.player.loadVideoById(videoId);
		}
	}, {
		key: 'render',
		value: function render() {
			var ready = this.state.ready;
			var className = this.props.className;


			if (!ready) {
				return null;
			}

			return _react2.default.createElement(
				'figure',
				{ className: className, style: STYLES.FIGURE },
				_react2.default.createElement('div', { ref: this.node, style: STYLES.IFRAME })
			);
		}
	}]);

	return Video;
}(_react.Component);

exports.default = Video;
;