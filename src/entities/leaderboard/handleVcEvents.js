const VcModel = require('../../models/leaderboard/vcModel');
const activityPoints = require('../../leaderboard/activityPoints/activityPoints');
const { handleUserData } = require('./handleUserData');
const client = require('../../client/client');

/**
 * This function handles the event for a specific user when he/she join the voice channel.
 * This function basically saves a object in the data base containing the entry time of the user at the voice channel. Because we have to compare the duration when the user leaves the voice channel.
 * @param {String} userId The id of the user who joined the channel.
 */
const handleStart = async (userId) => {
    try {
        const vcState = await new VcModel();
        vcState.userId = userId;
        vcState.startTime = new Date().getTime()
        await vcState.save()
    }
    catch (err) {
        console.error(err)
    }
}

/**
 * This function handles the event for a specific user when he/she leaves the voice channel.
 * Firstly it checks that if the user has spent more than one minute or not. If he has spent more than one minute then it will count it otherwise the function will return there.
 * If the user has spent more than on minute then it calculates the duration in minutes. After getting the duration it calles the user update function to handle the rest.
 * Lastly it deletes the data which has been created for the user when he had joined the channel.
 * @param {String} userId The id of the user who leaves the channel.
 */
const handleEnd = async (userId) => {
    try {
        const vcState = await VcModel.findOne({ userId });
        const duration = (new Date().getTime() - vcState.startTime) / 60000;
        if (duration > 1) {
            const totalPoints = Math.round(duration * activityPoints.voicechat);
            client.users.fetch(userId)
                .then(user => handleUserData({ ...user, type: 'voiceChat', value: totalPoints }))
                .catch(err => console.error(err))
        }
        await VcModel.deleteOne({ userId })
    }
    catch (err) {
        console.error(err)
    }
}

module.exports = { handleStart, handleEnd };