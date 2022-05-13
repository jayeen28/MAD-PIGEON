const User = require('../../models/leaderboard/user');
const handleLevel = require('./handleLevel');
const activityPoints = require('../../leaderboard/activityPoints/activityPoints');
const handleDm = require('./handleDm');

//This object contains the points add and remove methods
const addOrRemovePoints = {
    /**
     * This is the point adding method.
     * @param {String} id The discord id of the user.
     * @param {String} type The type of the activities is need to be removed.
     * @param {Number} value The value to be removed.
     * @returns returns null if user doesn't exists in data or returns "Added".
     */
    add: async ({ id, type = '', value }) => {
        let isExists = await User.findOne({ userId: id });
        //if exists then update the points and update the activities data with the parameters type and value.
        if (isExists) {
            if (type.length) isExists.activities[`${type}`] += 1;
            isExists.points += value;
            let { checkedLevel, added } = await handleLevel(isExists);
            if (added) {
                isExists.points += added;
                handleDm(id, `You have been rewarded with ${added} points.`);
            }
            isExists.level = checkedLevel;
            await isExists.save();
            return 'Added';
        }
        return null
    },
    /**
     * This is the point removing method.
     * @param {String} id The discord id of the user.
     * @param {String} type The type of the activities is need to be removed.
     * @param {Number} value The value to be removed.
     * @returns returns null if user doesn't exists in data or returns "Removed".
     */
    remove: async ({ id, type = '', value }) => {
        try {
            let isExists = await User.findOne({ userId: id });
            if (isExists) {
                isExists.points -= value;
                data = await handleLevel(isExists);
                isExists.level = data.checkedLevel;
                if (type.length) isExists.activities[`${type}`] -= 1;
                await isExists.save();
                return 'Removed';
            }
            return null;
        } catch (err) {
            console.error(err);
            // throw new Error('Points not removed');
        }
    }
}

/**
 * This function handles the user data updates.
 * @param {String} id The id of the specific user.
 * @param {String} username The user name.
 * @param {String} desciminatior It carries name hash of the user which will be stored in the database.
 * @param {String} type The type of the activities is required to update.
 * @param {Number} value The vlaue of the activites is required to update. 
 */
const handleUserData = async ({ id, username, discriminator, type, value }) => {
    try {//check if user data is exists in the data base or not.
        const addRes = await addOrRemovePoints.add({ id, type, value })
        if (!addRes) {
            // if user data doesn't exists then create a new user data with the given informations.
            const user = new User({
                userName: username,
                userId: id,
                nameHash: `${username}#${discriminator}`,
                points: activityPoints[`${type}`],
                level: 0,
                activities: {
                    [`${type}`]: 1
                }
            })
            await user.save();
        }
    } catch (err) {
        console.error(err);
    }
}
module.exports = { handleUserData, addOrRemovePoints };