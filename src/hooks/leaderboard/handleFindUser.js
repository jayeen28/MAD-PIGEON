const User = require('../../models/leaderboard/user');

//hit reply duplication need to be fixed.
/**
 * This function is used for giving reply to the user.
 * @param {Object} interaction The interaction object.
 * @param {String} content The content of the reply.
 */
const hitReply = async (interaction, content) => {
    interaction.reply({
        content,
        ephemeral: true
    })
}

/**
 * This function is used for searching the user data in the database.
 * @param {String} key The key of the user data object. 
 * @param {String} value The value of the user data object.
 * @returns {Object} user if user found otherwise @returns {null}
 */
const searchUser = async (key, value) => {
    if (key.length === 0 && value.length === 0) return;
    let searchParam = {};
    searchParam[`${key}`] = value;
    const user = await User.findOne(searchParam);
    if (user) return user;
    return null;
}

/**
 * This function is used for searching the user data in the database.
 * @param {String} userData The user data to search.
 * @param {Number} points The points to be added or removed.
 * @param {Object} interaction The interaction object.
 * @param {String} method The method to be used for adding or removing the points.
 * @returns {String} The message to be replied after the points are added or removed. If faild then the error message thrown.
 */
const findUser = async (userData, interaction) => {
    if (userData == "") { hitReply(interaction, 'Please enter a user to remove point from.'); return }

    // Type of Query
    let queryType = userData.includes('#') ? 'nameHash' : (userData.startsWith('<@') || parseInt(userData)) ? 'userId' : 'userName';

    var queryBuilder;
    var error = false;
    switch (queryType) {
        case 'nameHash':
            const nameHashRes = await searchUser('nameHash', userData);
            if (!nameHashRes) error = true;
            queryBuilder = nameHashRes
            break;

        case 'userId':
            const idRes = await searchUser('userId', userData.replace(/[<@!>]/g, ''));
            if (!idRes) error = true;
            queryBuilder = idRes;
            break;

        case 'userName':
            const nameRes = await searchUser('userName', userData);
            if (!nameRes) error = true;
            queryBuilder = nameRes;
            break;

        default:
            throw new Error('Not found any user with the given information. We recommend you to use the user id or mention the username.')
    }
    if (error) throw new Error('This user has not done any interaction with the server.')
    return queryBuilder;
}

module.exports = findUser;