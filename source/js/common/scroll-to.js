'use strict';

module.exports = function (elements, duration) {
  elements = elements instanceof jQuery ? elements : $(elements);

  $(function () {
    elements.click(function (event) {
      event.preventDefault();

      var
        targetPos = $($(this).attr('href')).offset().top;

      $('body, html').animate({
        scrollTop: targetPos
      }, duration);
    });
  });
};