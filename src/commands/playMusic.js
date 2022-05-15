const { SlashCommandBuilder } = require('@discordjs/builders');
const { videoToMP3 } = require('../hooks/videoToMp3');
const { handleVC } = require('../hooks/handleVC');
const playerInstance = require('../hooks/player');

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
        if (playerInstance.playing) return interaction.reply({ content: 'There is already a song playing. Please stop the music first using "/controlmusic:stop" command.', ephemeral: true });
        const youtubeLinkRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/;
        const youtubeLinkMatch = youtubeLink.match(youtubeLinkRegex);
        if (!youtubeLinkMatch) return interaction.reply({ content: 'Invalid youtube link.', ephemeral: true });
        interaction.reply({ content: `Playing ${youtubeLinkMatch[0]}...` });
        videoToMP3(youtubeLinkMatch[0])
            .then(url => handleVC(interaction, url))
            .catch(err => console.error(err));
    }
}