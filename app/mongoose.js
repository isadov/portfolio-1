'use strict';

let mongoose = require('mongoose');
let config = require('./config');
let options = {
  user: config.db.user,
  pass: config.db.pass
};
let host = config.db.host;
let port = config.db.port;
let db = config.db.name;

mongoose.connect(`mongodb://${host}:${port}/${db}`, options);

// TODO: переделать как в content.json и перенести в models
mongoose.model('skillscategory', {
  name: String,
  skills: Array
});

module.exports = mongoose;