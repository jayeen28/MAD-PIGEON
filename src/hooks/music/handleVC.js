const { joinVoiceChannel, VoiceConnectionStatus, AudioPlayerStatus, createAudioResource } = require('@discordjs/voice');
const playerInstance = require('./player');

module.exports = {
    handleVC: (interaction, url) => {
        const player = playerInstance.init();
        const connection = joinVoiceChannel({
            channelId: process.env.VC_ID,
            guildId: process.env.GUILD_ID,
            adapterCreator: interaction.member.guild.voiceAdapterCreator,
        });

        const music = createAudioResource(url);

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
            connection.destroy();
        })
    }
}