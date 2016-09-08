let express = require('express');
let app = express();
let path = require('path');
let fs = require('fs');
let session = require('express-session');
let bodyParser = require('body-parser');

let config = require('./config');
let main = require('./routes/main.js');
let admin = require('./routes/admin.js');

let mongoose = require('./mongoose');
let MongoStore = require('connect-mongo')(session);

// Сессии
app.use(session({
  secret: config.secure.sessionSecret,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

// Парсер тела запроса
app.use(bodyParser.json());

// Предоставление статических файлов
app.use(express.static(path.resolve(__dirname, config.path.static)));
app.use('/upload', express.static(path.resolve(__dirname, config.path.upload)));

// Jade
app.set('views', path.resolve(__dirname, config.path.templates));
app.set('view engine', 'jade');

// Подключаем контент
fs.readFile(path.resolve(__dirname, config.path.content), 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err.message);
  }
  app.locals = JSON.parse(data);
});

// Маршруты
app.use('/', main);
app.use('/admin', admin);

// 404
app.use(function(req, res, next) {
  res.status(404);

  if (req.accepts('html')) {
    res.render('error/error', {
      error: {
        code: '404',
        message: 'Страницы не существует'
      }
    });
    return;
  }

  if (req.accepts('json')) {
    res.send({
      status: 'error',
      error: '404 - Страницы не существует'
    });
    return;
  }

  next();
});

// 500
app.use(function(err, req, res, next){
  res.status(err.status || 500);

  if (req.accepts('html')) {
    res.render('error/error', {
      error: {
        code: '500',
        message: 'Ошибка сервера'
      }
    });
    return;
  }

  if (req.accepts('json')) {
    res.send({
      status: 'error',
      error: '500 - Ошибка сервера'
    });
    return;
  }

  next();
});

app.listen(config.http.port, config.http.port, function () {
  if (!fs.existsSync(path.resolve(__dirname, config.path.upload))) {
    fs.mkdirSync(path.resolve(__dirname, config.path.upload));
  }
});