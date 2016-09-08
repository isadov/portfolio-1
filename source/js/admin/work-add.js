'use strict';

function workAdd() {
  var form = $('.js-work-add-form');

  form.submit(function (e) {
    e.preventDefault();

    var $this = $(this);
    var data = new FormData($this[0]);

    console.log(data);

    $.ajax({
      url: '/admin/work',
      data: data,
      type: 'POST',
      processData: false,
      contentType: false
    }).then(function (data) {
      console.log(data);
      $.fancybox('<h1>' + data.message + '</h1>');
    }, function () {
      $.fancybox('<h1>Ошибка соединения с сервером</h1>');
    });
  });
}

module.exports = workAdd;