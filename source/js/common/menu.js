'use strict';

module.exports = function () {
  var
    menu = $('#js-menu'),
    items = menu.find('.menu__item');

  $('#js-menu-checkbox').change(function () {
    if (!menu.hasClass('menu_opened')) {
      var delay = 0.35;
      menu.addClass('menu_opened');

      items.each(function () {
        delay = delay + 0.1;
        $(this).addClass('bounceIn').css('animation-delay', delay + 's');
      });
    } else {
      items.removeClass('bounceIn');
      menu.removeClass('menu_opened');
    }
  });
};