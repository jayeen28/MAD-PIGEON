const { addOrRemovePoints } = require('./handleUserData');
const findUser = require('./handleFindUser');
// Logger
const logger = require('../../extras/logger');

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

const handlePoints = async (interaction, method) => {//method = add or remove
    const inputedData = interaction.options._hoistedOptions;//get the inputed data
    if (isNaN(inputedData[0].value)) return hitReply(interaction, 'Please enter a valid point value.');//if the inputed data is not a number
    const userData = inputedData[1].value;//get the user data;
    const points = parseInt(inputedData[0].value);//get the points
    findUser(userData, interaction)//search the user
        .then(userInfo => {
            addOrRemovePoints[`${method}`]({ id: userInfo.userId, value: points });//add or remove the points
            const msg = `${method === 'add' ? 'Added' : 'Removed'} ${points} point ${method === 'add' ? 'to' : 'from'
                } ${userInfo.userName}`;//return the message
            hitReply(interaction, msg)

            logger({
                message: msg,
                type: 'info'
            })
        })
        .catch(err => hitReply(interaction, err.message))
}

module.exports = handlePoints;