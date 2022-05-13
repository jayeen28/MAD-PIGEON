const client = require('../client');
// listen message reaction events
client.on('messageReactionAdd', async (reaction, user) => {
    console.log('new reaction')
});
// listen message reaction remove events
client.on('messageReactionRemove', async (reaction, user) => {
    console.log('reaction removed')
})