const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sample')
        .setDescription('This is a sample command to test.'),
    async execute(interaction) {
        interaction.reply('Command executed.');
    }
}