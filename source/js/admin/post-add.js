'use strict';

function postAdd() {
  var form = $('.js-post-add-form');

  form.submit(function (e) {
    e.preventDefault();

    var $this = $(this);
    var data = {
      title: $this.find('input[name="title"]').val(),
      date: $this.find('input[name="date"]').val(),
      text: $this.find('textarea[name="text"]').val()
    };

    $.ajax({
      url: '/admin/post',
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

module.exports = postAdd;