// Core
import React, { Component, createRef } from 'react';

const YOUTUBE_API = 'https://www.youtube.com/iframe_api';
const YOUTUBE_API_CONSUMERS = [];
const STYLES = {
	FIGURE: {
		width: '100vw',
		maxWidth: '1024px',
		position: 'relative',
		overflow: 'hidden',
		paddingTop: '56.25%',
	},
	IFRAME: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		border: 0,
	},
};

function initYoutubeApi () {
	const script = document.createElement('script');
	script.setAttribute('src', YOUTUBE_API);
	document.head.appendChild(script);

	window.onYouTubeIframeAPIReady = function () {
		for (const consumer of YOUTUBE_API_CONSUMERS) {
			consumer(window.YT);
		}
	};
}

export default class Video extends Component {
	constructor (props) {
		super(props);

		const ready = Boolean(window.YT);

		this.state = { ready, api: window.YT };
		this.node = createRef();
		this.player = null;

		if (!ready) {
			YOUTUBE_API_CONSUMERS.length === 0 && initYoutubeApi();
			YOUTUBE_API_CONSUMERS.push((YT) => this.setState({
				ready: true,
				api: YT,
			}));
		}

		this.createPlayer = this.createPlayer.bind(this);
		this.changeVideo = this.changeVideo.bind(this);
	}

	componentDidUpdate ({ id: prevId }) {
		const { changeVideo, createPlayer } = this;
		const { ready } = this.state;
		const { id } = this.props;
		const initialized = !!this.player;
		const videoChanged = prevId !== id;

		ready && !initialized && createPlayer();
		ready && initialized && videoChanged && changeVideo(id);
	}

	componentWillUnmount () {
		this.player && this.player.destroy();
	}

	createPlayer () {
		const { id } = this.props;

		this.player = new window.YT.Player(this.node.current, {
			videoId: id,
			playerVars: {
				controls: 1,
				modestbranding: 1,
				showinfo: 0,
				disablekb: 1,
				rel: 0,
			},
			events: {
				onReady: () => {
					this.player.playVideo();
					this.player.mute();
				},
			},
		});
	}

	changeVideo (videoId) {
		'loadVideoById' in this.player && this.player.loadVideoById(videoId);
	}


	render () {
		const { ready } = this.state;
		const { className } = this.props;

		if (!ready) {
			return null;
		}

		return (<figure className={className} style={STYLES.FIGURE}>
			<div ref={this.node} style={STYLES.IFRAME} />
		</figure>);
	}
};

