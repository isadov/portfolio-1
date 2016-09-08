'use strict';

module.exports = function () {
  function validate(form) {
    var
      inputs = form.find('input, textarea'),
      empty = false,
      emailError = false;

    inputs.each(function () {
      var
        $this = $(this),
        value = $this.val();

      if (value === '') {
        empty = true;
        return;
      }

      if ($this.attr('type') === 'email') {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        emailError = !re.test(value);
      }
    });

    if (empty) {
      $.fancybox('<h1>Вы заполнили не все поля формы!</h1>');
      return false;
    }

    if (emailError) {
      $.fancybox('<h1>Введите корректный email!</h1>');
      return false;
    }

    return true;
  }

  $('form input[type=submit]').click(function (e) {
    var form = $(this).closest('form');

    return validate(form);
  });
};