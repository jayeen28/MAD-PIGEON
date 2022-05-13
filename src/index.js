//This is the root of the app don't edit anything here
require('dotenv').config();
const connectDB = require('./db/connect');
connectDB(process.env.MONGO_URL);
require('./activityPoints/activityPoints');
const client = require('./client/client');
require('./client/activities/message');
require('./client/activities/voiceChat');
require('./client/activities/inviteTracking');
require('./client/activities/reaction');
require('./client/interactions/interactions');
const activitiesPoints = require('./activityPoints/activityPoints');
const handleRegCommands = require('./hooks/handleRegCommands');
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
    require('./leaderboard/leaderboard');//require the leaderboard in when bot is ready.
});