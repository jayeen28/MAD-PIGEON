const client = require('../client')
const { handleStart, handleEnd } = require('../../hooks/leaderboard/handleVcEvents');
const logger = require('../../extras/logger');

const amaVcId = process.env.VC_ID;

// This module handles the voice chat events.
client.on('voiceStateUpdate', async (oldState, newState) => {
    if (newState.channelId === amaVcId) {
        logger({
            message: `${newState.id} joined the voice channel.`,
            type: 'info'
        })
        handleStart(newState.id);
    } else {
        if (oldState.channelId === amaVcId) {
            logger({
                message: `${oldState.id} left the voice channel.`,
                type: 'info'
            })
            handleEnd(oldState.id);
        }
    }
})