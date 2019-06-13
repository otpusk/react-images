import { AbstractPlayer } from './AbstractPlayer';

export class VimeoPlayer extends AbstractPlayer {
    constructor(container) {
        super(container);

        if (!VimeoPlayer.api && typeof window.Vimeo !== 'undefined') {
            VimeoPlayer.api = window.Vimeo;
        }
    }

    initialize() {
        return new Promise((resolve) => {
            if (VimeoPlayer.api) {
                resolve();
            }

            if (VimeoPlayer.consumers.length === 0) {
                const script = document.createElement('script');
                script.setAttribute('src', 'https://player.vimeo.com/api/player.js');
                script.onload = () => {
                    if (window.Vimeo) {
                        VimeoPlayer.api = window.Vimeo;
                        for (const consume of VimeoPlayer.consumers) {
                            consume();
                        }
                    }
                }
                document.head.appendChild(script);
            }

            VimeoPlayer.consumers.push(resolve);
        });
    }

    play(id) {
        this.initialize()
            .then(() => {
                if (this.player) {
                    this.player.loadVideo(id);
                    return 0;
                }
                this.player = new VimeoPlayer.api.Player(this.container, {
                    id,
                    height: this.container.clientHeight,
                    width: this.container.clientWidth
                });

                this.player.setVolume(0);
                this.player.play();
            });
    }
}

VimeoPlayer.api = null;
VimeoPlayer.consumers = [];