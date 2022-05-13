const { SlashCommandBuilder } = require('@discordjs/builders');
const User = require('../models/user');
// Logger
const logger = require('../extras/logger');

/**
 * This function is used for showing the position of the user in the leaderboard.
 * @param {Object} interaction The interaction object.
 */
const showPosition = async (interaction) => {
    const allUsers = await User.find({});
    const sortedUsers = allUsers.sort((a, b) => b.points - a.points);
    let getPositionIndex = sortedUsers.findIndex(user => user.userId === interaction.user.id)
    if (getPositionIndex === -1) {
        // if user data doesn't exists then create a new user data with the necessary informations.
        const { username, id, discriminator } = interaction.user;
        const user = new User({
            userName: username,
            userId: id,
            nameHash: `${username}#${discriminator}`,
            points: 0,
        })
        await user.save();
        sortedUsers.push(user);
        getPositionIndex = sortedUsers.length + 1
    }
    const embedMessage = {
        color: '0x0099ff',
        title: `Hello ${interaction.user.username}!`,
        fields: [
            {
                name: 'Position',
                value: `Your position is ${getPositionIndex + 1} among ${sortedUsers.length} users.`,
            },
            {
                name: 'Points',
                value: `Your have total ${sortedUsers[getPositionIndex].points}`
            },
            {
                name: 'Level',
                value: `Your level is ${sortedUsers[getPositionIndex].level}`
            }
        ]
    }
    interaction.reply({
        embeds: [embedMessage],
        ephemeral: true
    })
    logger({
        message: `${interaction?.user?.username} has requested to see their position in the leaderboard.`,
        type: 'info'
    })
}

//register the position command
module.exports = {
    data: new SlashCommandBuilder()
        .setName("position")
        .setDescription("This command will show your position in the leaderboard."),
    async execute(interaction) {
        showPosition(interaction);
    }
}