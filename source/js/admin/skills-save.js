'use strict';

function skillsSave() {
  $('.js-skills-save').submit(function (e) {
    e.preventDefault();
    
    var data = {};

    // Собираем данные с формы
    $('.js-skill').each(function () {
      var $this = $(this);
      var category = $this.data('category');
      var skill = $this.data('skill');

      if (!(category in data)) {
        data[category] = {};
      }

      data[category][skill] = $this.val();
    });

    $.ajax({
      url: '/admin/skills',
      data: JSON.stringify(data),
      type: 'POST',
      contentType: 'application/json'
    }).then(function (data) {
      $.fancybox('<h1>' + data.message + '</h1>');
    }, function () {
      $.fancybox('<h1>Ошибка соединения с сервером</h1>');
    });
  });
}

module.exports = skillsSave;
