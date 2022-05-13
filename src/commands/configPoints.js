const { SlashCommandBuilder } = require('@discordjs/builders');
const Points = require('../models/leaderboard/points');
const activitiesPoints = require('../leaderboard/activityPoints/activityPoints');
const { checkRole } = require('../hooks/leaderboard/checkUser');
/**
 * This function is used for updating point value both in database and locally.
 * @param {Object} interaction The interaction object.
 */
const updatePoints = async (interaction) => {
    const inputedPoints = interaction.options._hoistedOptions;
    if (isNaN(inputedPoints[1].value)) return interaction.reply({ content: 'Please enter a valid point value.', ephemeral: true });// If the point value is not a number.
    const pointName = inputedPoints[0].value;//points name
    if (Object.keys(activitiesPoints).indexOf(pointName) === -1) return interaction.reply({ content: "Please enter a valid point name. Point names are 'text', 'reaction', 'voicechat' and 'invites'. Input your desired one.", ephemeral: true });// If the point name is not a valid point name.
    const pointValue = parseInt(inputedPoints[1].value);//points value
    let points = await Points.findOne({ _id: activitiesPoints._id });//get the points from database
    points[pointName] = pointValue;//update the points
    activitiesPoints.setPoints = { [pointName]: pointValue };//update the points in the constructor
    await points.save()//save the points in database
    interaction.reply({//reply to the user
        content: `The value of "${pointName}" has been updated to ${pointValue}`,
        ephemeral: true
    })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('configpoints')
        .setDescription('This command will add point.')
        .addStringOption(option =>
            option.setName('pointname')
                .setDescription("Point names are 'text', 'reaction', 'voicechat' and 'invites'. Type your desired one.")
                .setRequired(true))
        .addStringOption(option =>
            option.setName('pointvalue')
                .setRequired(true)
                .setDescription('The value of point to add. Must be a number.')
        ),
    async execute(interaction) {
        const { normalUser } = await checkRole(interaction);
        if (!normalUser) {//if the user is the owner or the admin
            updatePoints(interaction);
        } else {
            interaction.reply({ content: 'You are not allowed to use this command.', ephemeral: true });
        }
    }
}