const { Schema, model } = require('mongoose');

const alertSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    collectionSlug: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "complete"]
    }
});

const Alert = model('Alert', alertSchema);
module.exports = Alert;