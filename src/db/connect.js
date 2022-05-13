const mongoose = require('mongoose');
// Logger
const logger = require('../extras/logger');

const connectDB = (dbUrl) => {
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => logger({
        message: 'Connected to the database.',
        type: 'success'
    }))
        .catch(err => logger({
            message: err,
            type: 'error'
        }))
}
module.exports = connectDB;