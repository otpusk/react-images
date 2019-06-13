// Core
import React, { Component, createRef } from 'react';

// Instruments
import { YoutubePlayer, VimeoPlayer, AbstractPlayer } from '../utils/videoPlayer/index';

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

export default class Video extends Component {
	constructor(props) {
		super(props);
		this.node = createRef();
	}

	componentDidMount() {
		if (this.node.current) {
			const { id, provider } = this.props;
			switch (provider) {
				case 'youtube':
					this.player = new YoutubePlayer(this.node.current);
					break;
				case 'vimeo':
					this.player = new VimeoPlayer(this.node.current);
					break;
				default:
					this.player = new AbstractPlayer(this.node.current);
			}

			this.player.play(id);
		}
	}

	componentDidUpdate({ id: prevId, provider: prevProvider }) {
		const { id, provider } = this.props;
		const videoChanged = prevId !== id;
		const providerChanged = prevProvider !== provider;

		if (providerChanged) {
			this.player.destroy();

			switch (provider) {
				case 'youtube':
					this.player = new YoutubePlayer(this.node.current);
					break;
				case 'vimeo':
					this.player = new VimeoPlayer(this.node.current);
					break;
			}

			this.player.play(id);
		}
		else if (videoChanged) {
			this.player.play(id);
		}
	}

	componentWillUnmount() {
		this.player.destroy();
	}


	render() {
		const { className } = this.props;

		return (<figure className={className} style={STYLES.FIGURE}>
			<div ref={this.node} style={STYLES.IFRAME} />
		</figure>);
	}
};

