const client = require('../client')
//listen message events.
client.on('messageCreate', async (message) => {
    console.log('new message')
});
//listen message delete events.
client.on('messageDelete', async (message) => {
    console.log('message deleted')
})