const mongoose = require('mongoose');
const {logger} = require('../../utils/logger');
const runEnv = {
    local: 'localhost:27017',
    prod: 'mongo'
}

mongoose
    .connect(`mongodb://${runEnv.prod}/Tasks`, { useNewUrlParser: true })
    .catch(e => {
        logger.error({error: e.message}, 'Connection error');
    })

const db = mongoose.connection;

module.exports = db;