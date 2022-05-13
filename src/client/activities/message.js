const client = require('../client')
const { handleUserData, addOrRemovePoints } = require('../../hooks/leaderboard/handleUserData');
const activityPoints = require('../../leaderboard/activityPoints/activityPoints');
//listen message events.
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    handleUserData({ ...message.author, type: 'text', value: activityPoints.text });
});
//listen message delete events.
client.on('messageDelete', async (message) => {
    if (message.author?.bot) return;//validation for bot
    if (message.author) {//validation if no author exists in the data.
        addOrRemovePoints.remove({ ...message.author, type: 'text', value: activityPoints.text });
    }
})