const { SlashCommandBuilder } = require('@discordjs/builders');
const saveAlert = require('../entities/opensea/manageAlert');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('alert')
        .setDescription("The bot will alert you when the collection floor price goes equal to or under your specified price.")
        .addStringOption(option =>
            option.setName('collectionslug')
                .setDescription('The collection slug of the collection.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`price`)
                .setRequired(true)
                .setDescription('Your desired price.')
        ),
    async execute(interaction) {
        saveAlert(interaction);
    }
}