const client = require('../client')
const { handleStart, handleEnd } = require('../../entities/leaderboard/handleVcEvents');
const logger = require('../../extras/logger');

const VC_ID = process.env.VC_ID;

// This module handles the voice chat events.
client.on('voiceStateUpdate', async (oldState, newState) => {
    const isBot = client.users.cache.get(newState.id).bot;
    if (isBot) return;
    if (newState.channelId === VC_ID) {
        logger({
            message: `${newState.id} joined the voice channel.`,
            type: 'info'
        })
        handleStart(newState.id);
    } else {
        if (oldState.channelId === VC_ID) {
            logger({
                message: `${oldState.id} left the voice channel.`,
                type: 'info'
            })
            handleEnd(oldState.id);
        }
    }
})