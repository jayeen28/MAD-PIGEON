//This is the root of the app don't edit anything here
require('dotenv').config();
const connectDB = require('./db/connect');
connectDB(process.env.MONGO_URL);
const client = require('./client/client');
require('./client/activities/message');
require('./client/activities/reaction');
require('./client/interactions/interactions');
const handleRegCommands = require('./hooks/regCommands');
// Logger
const logger = require('./extras/logger');

/**
 * Trigger when bot is ready.
 */
client.on('ready', () => {
    logger({
        message: 'Bot is ready.',
        type: 'success'
    })
    handleRegCommands();//regting the commands
});

client.login(process.env.BOT_TOKEN);