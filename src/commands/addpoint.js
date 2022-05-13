const { SlashCommandBuilder } = require('@discordjs/builders');
const handlePoints = require('../hooks/leaderboard/handlePoints');
const { checkRole } = require('../hooks/leaderboard/checkUser');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addpoint')
        .setDescription('This command will add point for the user. Type in the username as @username.')
        .addStringOption(option =>
            option.setName('point')
                .setDescription('The amount of point to add.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName(`username`)
                .setRequired(true)
                .setDescription('The user to add point. Type in the username as @username')
        ),
    async execute(interaction) {
        const { normalUser } = await checkRole(interaction);
        if (!normalUser) {//if the user is the owner or the admin
            handlePoints(interaction, 'add');
        } else {
            interaction.reply({ content: 'You are not allowed to use this command.', ephemeral: true });
        }
    }
}