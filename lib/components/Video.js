'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../utils/videoPlayer/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Core


// Instruments


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

var Video = function (_Component) {
	_inherits(Video, _Component);

	function Video(props) {
		_classCallCheck(this, Video);

		var _this = _possibleConstructorReturn(this, (Video.__proto__ || Object.getPrototypeOf(Video)).call(this, props));

		_this.node = (0, _react.createRef)();
		return _this;
	}

	_createClass(Video, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (this.node.current) {
				var _props = this.props,
				    id = _props.id,
				    provider = _props.provider;

				switch (provider) {
					case 'youtube':
						this.player = new _index.YoutubePlayer(this.node.current);
						break;
					case 'vimeo':
						this.player = new _index.VimeoPlayer(this.node.current);
						break;
					default:
						this.player = new _index.AbstractPlayer(this.node.current);
				}

				this.player.play(id);
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate(_ref) {
			var prevId = _ref.id,
			    prevProvider = _ref.provider;
			var _props2 = this.props,
			    id = _props2.id,
			    provider = _props2.provider;

			var videoChanged = prevId !== id;
			var providerChanged = prevProvider !== provider;

			if (providerChanged) {
				this.player.destroy();

				switch (provider) {
					case 'youtube':
						this.player = new _index.YoutubePlayer(this.node.current);
						break;
					case 'vimeo':
						this.player = new _index.VimeoPlayer(this.node.current);
						break;
				}

				this.player.play(id);
			} else if (videoChanged) {
				this.player.play(id);
			}
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.player.destroy();
		}
	}, {
		key: 'render',
		value: function render() {
			var className = this.props.className;


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