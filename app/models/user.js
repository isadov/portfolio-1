'use strict';

let mongoose = require('../mongoose');
let crypto = require('crypto');


let config = require('../config');

var User = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

User.statics.add = function (login, password, cb) {
  let that = this;

  getSalt(function (salt) {
    return new that({
      login: login,
      password: hashPassword(password, salt),
      salt: salt
    }).save().then(cb);
  });
};

User.statics.check = function (login, password, cb) {
  return this.findOne({
    login: login
  }).then(function (user) {
    if (!user) {
      cb('error');
    }

    if (hashPassword(password, user.salt) === user.password) {
      return Promise.resolve(user);
    } else {
      return Promise.reject('Error!');
    }
  });
};

function getSalt(cb) {
  crypto.randomBytes(config.secure.saltBytes, function (err, salt) {
    if (err) {
      cb(err)
    }

    cb(salt.toString('base64'));
  });
}

function hashPassword(password, salt) {
  const hasher = crypto.createHash(config.secure.algoritm);

  return hasher.update(password + salt + config.secure.salt).digest('base64');
}

module.exports = mongoose.model('User', User);