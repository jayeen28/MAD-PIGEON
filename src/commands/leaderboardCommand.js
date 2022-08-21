const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const User = require('../models/leaderboard/user');
const { checkRole } = require('../entities/common/checkUser');

const makeReply = async (interaction) => {
    const allUsers = await User.find({});
    const sortedUsers = allUsers.sort((a, b) => b.points - a.points).slice(0, 10)
    const embedResult = new MessageEmbed()
        .setTitle('Leaderboard')
        .setColor('#0099ff')
        .addFields({
            name: 'Rank',
            value: sortedUsers.map((user, index) => `${index + 1}. ${user.userName} - ${user.points} points.`).join('\n')
        })
        .setTimestamp();
    interaction.reply({
        embeds: [embedResult],
        ephemeral: true
    })
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Leaderboard of this server."),
    async execute(interaction) {
        makeReply(interaction);
    }
}