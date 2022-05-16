const { joinVoiceChannel, VoiceConnectionStatus, AudioPlayerStatus, createAudioResource } = require('@discordjs/voice');
const playerInstance = require('./player');
const logger = require('../../extras/logger');

module.exports = {
    handleVC: async (interaction, audioUrl, youtubeLink) => {
        const targetChannel = interaction.member.voice.channel;
        if (!targetChannel) return await interaction.editReply({ content: 'You need to be in a voice channel to use this command.' });
        const player = playerInstance.init();
        const connection = joinVoiceChannel({
            channelId: targetChannel.id,
            guildId: process.env.GUILD_ID,
            adapterCreator: interaction.member.guild.voiceAdapterCreator,
        });

        const music = createAudioResource(audioUrl);

        connection.on(VoiceConnectionStatus.Ready, async () => {
            logger({ message: `Connected to ${targetChannel.name}`, type: 'success' });
            connection.subscribe(player);
            player.on('error', (err) => console.log(err));
            await interaction.editReply({ content: `Process completed.` });
            player.play(music);
        });
        connection.on(VoiceConnectionStatus.Disconnected, async () => {
            try {
                connection.destroy();
                logger({ message: `Disconnected from ${targetChannel.name}`, type: 'warning' });
            } catch (e) { console.error(e) }
        })
        player.on(AudioPlayerStatus.Playing, async () => {
            playerInstance.playing = true;
            logger({ message: `Started playing music`, type: 'success' });
            await interaction.followUp({ content: `Now playing: ${youtubeLink}`, ephemeral: false });
        })
        player.on(AudioPlayerStatus.Idle, () => {
            logger({ message: `Music finished.`, type: 'success' });
            playerInstance.playing = false;
            connection.destroy();
        })
    }
}