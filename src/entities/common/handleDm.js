const client = require('../../client/client');
/**
 * This function is used for sending dm by the bot.
 * @param {String} userId The id of the target user.
 * @param {Number} level The new level of the user.
 */
const handleDm = async (userId, message) => {
  try {
    user = await client.users.fetch(userId)
    try {
      await user.send(message)
    } catch (error) {
      console.log(error)
    }
  }
  catch (error) {
    console.error('Something went wrong while sending dm.', error)
  }
}

module.exports = handleDm;