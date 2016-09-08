'use strict';

const config = {
  http: {
    host: 'localhost',
    port: 3000
  },
  db: {
    host: 'localhost',
    port: '27017',
    name: 'portfolio',
    user: '',
    password: ''
  },
  path: {
    // Статические файлы
    static: '../build/',
    templates: '../build/template/pages',
    // Файл с контентом по умолчанию
    content: '../build/template/data/content.json',
    // Папка загрузки
    upload: 'upload'
  },
  secure: {
    // Мастер-соль
    salt: 'salt',
    // Длина генерируемой соли в байтах
    saltBytes: 16,
    // Алгоритм хэширования
    algoritm: 'sha512',
    // Секрет сесии :)
    sessionSecret: 'sessionSecret'
  },
  // Допустимые типы загружаемых изображений
  avaibleUploadFileTypes: [
    'image/gif',
    'image/jpeg',
    'image/png',
    'image/pjpeg'
  ],
  // Максимальный размер загружаемого файла в байтах
  maxUploadFileSize: 5000000
};

module.exports = config;