'use strict';

let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
let multiparty = require('multiparty');
let getSlug = require('speakingurl');

let mongoose = require('../mongoose');
let config = require('../config');

let Post = require('../models/post');
let Work = require('../models/work');


// Защита
router.use('*', function (req, res, next) {
  if (req.session.login) {
    next();
  } else {
    res.redirect('/#auth');
  }
});

router.get('/', function (req, res) {
  let Model = mongoose.model('skillscategory');

  Model.find().exec(function (error, data) {
    let skills = data.reduce(function (prev, cur) {
      prev[cur.name] = cur.skills.reduce(function (prev, cur) {
        prev[cur.name] = cur.percent;

        return prev;
      }, {});

      return prev;
    }, {});

    res.render('admin/admin', {
      skills: skills
    });
  });
});

router.post('/skills', function (req, res) {
  let data = req.body;
  let skillCategoriesData = [];

  for (let name in data) {
    let skillCategoryData = {
      name: name,
      skills: []
    };
    let Model = mongoose.model('skillscategory');

    for (let skill in data[name]) {
      skillCategoryData.skills.push({
        name: skill,
        percent: data[name][skill]
      });
    }

    Model.update({name: name}, skillCategoryData).then(function (data) {
      console.log('Skills update: ' + data);
    });
  }

  res.send({
    status: 'success',
    message: 'Изменения успешно сохранены'
  });
});

router.post('/post', function (req, res) {
  let data = req.body;

  Post.add(data.title, data.date, data.text).then(function () {
    res.send({
      status: 'success',
      message: 'Запись добавлена'
    });
  }, function () {
    res.send({
      status: 'error',
      message: 'Проблемы c сохранением в БД :('
    });
  });
});

router.post('/work', function (req, res) {
  let form = new multiparty.Form();

  form.parse(req, function (error, fields, files) {
    if (!fields.name || !fields.description || !fields.link || !files.image) {
      console.log(!fields.name, !fields.description, !fields.link, !files.image);
      res.send({
        status: 'error',
        message: 'Все поля должны быть заполнены'
      });

      return;
    }

    let name = fields.name[0];
    let description = fields.description[0];
    let link = fields.link[0];
    let image = files.image[0];

    if (config.avaibleUploadFileTypes.indexOf(image.headers['content-type']) < 0) {
      res.send({
        status: 'error',
        message: 'Недопустимый формат изображения'
      });

      return;
    }

    if (image.size > config.maxUploadFileSize) {
      res.send({
        status: 'error',
        message: 'Изображение должно быть меньше 5мб'
      });

      return;
    }

    var ext = path.extname(image.path);
    var relativePath = config.path.upload + '/' + getSlug(fields.name[0]) + ext;
    var uploadPath = path.resolve(__dirname, '../' + relativePath);

    fs.renameSync(image.path, uploadPath);

    Work.add(name, description, link, relativePath).then(function () {
      res.send({
        status: 'success',
        message: 'Работа добавлена'
      });
    });
  });
});

module.exports = router;