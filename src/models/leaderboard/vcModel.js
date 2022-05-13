const { Schema, model } = require('mongoose');

const vcSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    }
});

const VcModel = model('VcModel', vcSchema);
module.exports = VcModel;