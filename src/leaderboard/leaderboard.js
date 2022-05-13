const client = require('../client/client');
const { MessageEmbed } = require('discord.js');
const User = require('../models/user');
const log = require('../extras/logger');
const logger = require('../extras/logger');

const intervalMiliseconds = process.env.LEADERBOARD_UPDATE_INTERVAL * 60 * 60 * 1000;

/**
 * This function is used for manage the data of the leaderboard.
 * @param {Object} channel The channel where the leaderboard will be shown.
 */
const manageData = async (channel) => {
    const allUsers = await User.find({});//get all users
    if (allUsers.length === 0) return;//if there is no users return.

    const sortedUsers = allUsers.sort((a, b) => b.points - a.points);//sort users by points.
    const cloneSortedUser = [...sortedUsers];
    const shortArrays = [];
    if (sortedUsers.length > 10) {//if the array is bigger than 10, split it.
        while (cloneSortedUser.length > 0) {
            const shortArray = cloneSortedUser.splice(0, 10);//get the first 10 users
            shortArrays.push(shortArray);
        }
    } else {
        shortArrays.push(cloneSortedUser);
    }
    shortArrays.forEach(users => {//for each short array, create a message embed.
        const embedResult = new MessageEmbed()
            .setTitle('Leaderboard')
            .setColor('#0099ff')
            .addFields({
                name: 'Rank',
                value: users.map((user) => `${sortedUsers.findIndex(usr => usr.id === user.id) + 1}. ${user.userName} - ${user.points} points.`).join('\n')
            })
            .setTimestamp();
        channel.send({//send the message embed.
            embeds: [embedResult]
        }).then(msg => setTimeout(() => msg.delete(), intervalMiliseconds));
    })
    logger({
        message: 'Leaderboard updated.',
        type: 'info'
    })
}

/**
 * This function is used for run the interval of the leaderboard.
 * @param {Object} channel The channel where the leaderboard will be shown.
 */
const runInterval = async (channel) => {
    await channel.bulkDelete(100);//delete all messages in the channel.
    manageData(channel);
    setInterval(() => {
        manageData(channel)
    }, intervalMiliseconds);
}

client.channels.fetch(process.env.LEADERBOARD_CHANNEL_ID)//get the channel where the leaderboard will be shown.
    .then(channel => {
        runInterval(channel)
    })