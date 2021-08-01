const config = require('config.json')
const mongoose = require('mongoose')
const connectionOpt = { useCreateIndex: true, useFindAndModify: true, useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(config.connectionString, connectionOpt);
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
}