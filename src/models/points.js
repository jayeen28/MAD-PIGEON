const { Schema, model } = require('mongoose');

const pointsSchema = new Schema({
    text: {
        type: Number,
        required: true,
        default: 0
    },
    reaction: {
        type: Number,
        required: true,
        default: 0
    },
    voicechat: {
        type: Number,
        required: true,
        default: 0
    },
    invites: {
        type: Number,
        required: true,
        default: 0
    }
});

const Points = model('Points', pointsSchema);
module.exports = Points;