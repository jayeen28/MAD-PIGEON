const client = require('../client');
const { handleUserData, addOrRemovePoints } = require('../../hooks/handleUserData');
const activityPoints = require('../../activityPoints/activityPoints');
// listen message reaction events
client.on('messageReactionAdd', async (reaction, user) => {
    handleUserData({ ...user, type: 'reaction', value: activityPoints.reaction })
});
// listen message reaction remove events
client.on('messageReactionRemove', async (reaction, user) => {
    addOrRemovePoints.remove({ ...user, type: 'reaction', value: activityPoints.reaction })
})