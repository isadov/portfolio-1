'use strict';

let mongoose = require('../mongoose');
let getSlug = require('speakingurl');

var Post = new mongoose.Schema({
  hash: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

Post.statics.add = function (title, date, text) {
  return new this({
    hash: getSlug(title),
    title: title,
    date: date,
    text: text
  }).save();
};

Post.statics.getAll = function () {
  return this.find({});
};

module.exports = mongoose.model('Post', Post);
