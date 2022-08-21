const { SlashCommandBuilder } = require('@discordjs/builders');
const handlePoints = require('../entities/leaderboard/handlePoints');
const { checkRole } = require('../entities/common/checkUser');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removepoint')
        .setDescription('This command will remove point from the user.')
        .addStringOption(option =>
            option.setName('point')
                .setDescription('The amount of point to remove.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('username')
                .setRequired(true)
                .setDescription('The user to remove point from.')
        ),
    async execute(interaction) {
        const { normalUser } = await checkRole(interaction);
        if (!normalUser) {//if the user is the owner or the admin
            handlePoints(interaction, 'remove');
        } else {
            interaction.reply({ content: 'You are not allowed to use this command.', ephemeral: true });
        }
    }
}