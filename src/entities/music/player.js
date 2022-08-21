const { createAudioPlayer } = require('@discordjs/voice');

class CreatePlayer {
    constructor() {
        this.player = null;
        this.playing = false;
    }
    init() {
        return this.player = createAudioPlayer();
    }
    pause(interaction) {
        this.player.pause();
        this.playing = false;
        interaction.reply({ content: `${interaction.user.username} paused the music.` });
    }
    play(interaction) {
        this.player.unpause();
        this.playing = true;
        interaction.reply({ content: `${interaction.user.username} unpaused the music.` });
    }
    stop(interaction) {
        this.player.stop();
        this.playing = false;
        interaction.reply({ content: `${interaction.user.username} stoped the music.` });
    }
}

const playerInstance = new CreatePlayer();

module.exports = playerInstance;