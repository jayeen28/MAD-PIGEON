const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    nameHash: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    level: {
        type: Number,
        required: true,
        default: 0
    },
    activities: {
        text: {
            type: Number,
            default: 0,
            required: false
        },
        reaction: {
            type: Number,
            default: 0,
            required: false
        },
        voiceChat: {
            type: Number,
            default: 0,
            required: false
        },
        invites: {
            type: Number,
            default: 0,
            required: false
        }
    }
})

const User = model('User', userSchema)
module.exports = User;