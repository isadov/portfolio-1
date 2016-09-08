'use strict';

function auth() {
  var form = $('.js-authform');

  form.submit(function (e) {
    e.preventDefault();

    var $this = $(this);
    var data = {
      login: $this.find('input[name="login"]').val(),
      password: $this.find('input[name="password"]').val(),
      ishuman: $this.find('input[name="ishuman"]:checked').val(),
      norobot: $this.find('input[name="norobot"]:checked').val()
    };

    $.ajax({
      url: '/login',
      data: JSON.stringify(data),
      type: 'POST',
      contentType: 'application/json'
    }).then(function (data) {
      console.log(data);
      switch (data.status) {
        case 'success':
          window.location.assign(data.redirect);
          break;
        case 'error':
          $.fancybox('<h1>' + data.message + '</h1>');
          break;
      }
    }, function () {
      $.fancybox('<h1>Ошибка соединения с сервером</h1>');
    });
  })
}

module.exports = auth;