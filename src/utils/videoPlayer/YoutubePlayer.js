import { AbstractPlayer } from './AbstractPlayer';

export class YoutubePlayer extends AbstractPlayer {
    constructor(container) {
        super(container);

        if (!YoutubePlayer.api && typeof window.YT !== 'undefined') {
            YoutubePlayer.api = window.YT;
        }
    }

    initialize() {
        return new Promise((resolve) => {
            if (YoutubePlayer.api) {
                resolve();
            }

            if (YoutubePlayer.consumers.length === 0) {
                const script = document.createElement('script');
                script.setAttribute('src', 'https://www.youtube.com/iframe_api');
                document.head.appendChild(script);

                window.onYouTubeIframeAPIReady = function () {
                    YoutubePlayer.api = window.YT;
                    for (const consume of YoutubePlayer.consumers) {
                        consume();
                    }
                };
            }

            YoutubePlayer.consumers.push(resolve);
        });
    }

    play(id) {
        this.initialize()
            .then(() => {
                if (this.player) {
                    this.player.loadVideoById(id);

                    return 0;
                }

                this.player = new YoutubePlayer.api.Player(this.container, {
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
            });
    }

    destroy() {
        if (this.player) {
            this.player.destroy();
        }
    }
}

YoutubePlayer.api = null;
YoutubePlayer.consumers = [];
