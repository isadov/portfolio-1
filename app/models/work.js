'use strict';

let mongoose = require('../mongoose');
let getSlug = require('speakingurl');

var Work = new mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  }
});

Work.statics.add = function (name, description, link, img) {
  return new this({
    slug: getSlug(name),
    name: name,
    description: description,
    link: link,
    img: img
  }).save();
};

Work.statics.getAll = function () {
  return this.find({});
};

module.exports = mongoose.model('Work', Work);
