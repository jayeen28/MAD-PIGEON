const { joinVoiceChannel, VoiceConnectionStatus, AudioPlayerStatus, createAudioResource } = require('@discordjs/voice');
const playerInstance = require('./player');
const client = require('../../client/client');

module.exports = {
    handleVC: (interaction, audioUrl, youtubeLink) => {
        const targetChannel = interaction.member.voice.channel;
        if (!targetChannel) return interaction.reply({ content: 'You need to be in a voice channel to use this command.', ephemeral: true });
        interaction.reply({ content: `Now playing: ${youtubeLink}` });
        const player = playerInstance.init();
        const connection = joinVoiceChannel({
            channelId: targetChannel.id,
            guildId: process.env.GUILD_ID,
            adapterCreator: interaction.member.guild.voiceAdapterCreator,
        });

        const music = createAudioResource(audioUrl);

        connection.on(VoiceConnectionStatus.Ready, () => {
            console.log('[+] Connected to voice channel.');
            connection.subscribe(player)
            player.on('error', (err) => console.log(err))
            player.play(music)
        });
        connection.on(VoiceConnectionStatus.Disconnected, async () => {
            console.log('[+] Disconnected from voice channel.');
            try {
                connection.destroy();
            } catch (e) { console.error(e) }
        })
        player.on(AudioPlayerStatus.Playing, () => {
            playerInstance.playing = true;
            console.log('[+] Started playing audio.');
        })
        player.on(AudioPlayerStatus.Idle, () => {
            playerInstance.playing = false;
            connection.destroy();
        })
    }
}