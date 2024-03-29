const { SlashCommandBuilder } = require('@discordjs/builders');
const { videoToMP3 } = require('../entities/music/videoToMp3');
const { handleVC } = require('../entities/music/handleVC');
const playerInstance = require('../entities/music/player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playmusic')
        .setDescription('This command will play music from a youtube link.')
        .addStringOption(option =>
            option.setName('youtubelink')
                .setDescription('The youtube link to play music from.')
                .setRequired(true)),
    async execute(interaction) {
        const inputedData = interaction.options._hoistedOptions;
        const youtubeLink = inputedData[0].value;
        await interaction.reply({ content: `Command received.` });
        const youtubeLinkRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/;
        const youtubeLinkMatch = youtubeLink.match(youtubeLinkRegex);
        if (!youtubeLinkMatch) return await interaction.editReply({ content: `Invalid youtube link (${youtubeLink}).` });
        if (playerInstance.playing) return await interaction.editReply({ content: 'There is already a song playing. Please stop the music first using "/controlmusic:stop" command.' });
        await interaction.editReply({ content: `Downloading audio . . .` });
        const res = await videoToMP3(youtubeLinkMatch[0]);
        if (!res) return await interaction.editReply({ content: `Invalid youtube link (${youtubeLink}).` });
        await handleVC(interaction, res, youtubeLinkMatch[0]);
    }
}