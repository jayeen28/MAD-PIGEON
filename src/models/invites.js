const { Schema, model } = require('mongoose');

const inviteSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    uses: {
        type: Number,
        required: true,
        default: 0
    },
    invitor: {
        type: String,
        required: true
    }
})

const Invites = model('Invites', inviteSchema);
module.exports = Invites;