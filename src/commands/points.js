const { SlashCommandBuilder } = require('@discordjs/builders');
const activitiesPoints = require('../leaderboard/activityPoints/activityPoints');//get the points from the required location.
// Logger
const logger = require('../extras/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('points')
        .setDescription('This command will show the points for the user interactions.'),
    async execute(interaction) {
        const { text, reaction, voicechat, invites } = activitiesPoints;
        const embedMessage = {
            color: '0x0099ff',
            title: `The points are`,
            fields: [
                {
                    name: 'Points:',
                    value: `Text: ${text} , Reaction: ${reaction} , Voicechat: ${voicechat} , Invites: ${invites} .`,
                }
            ]
        }
        interaction.reply({
            embeds: [embedMessage],
            ephemeral: true
        })
        logger({
            message: `${interaction?.user?.username} has requested to see default points for activities.`,
            type: 'info'
        })
    }
}