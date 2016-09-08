'use strict';

module.exports = function () {
  var startAnimationElement = $('.about-skills__category');

  if (!startAnimationElement.length) {
    return;
  }
  
  var
    startAnimationScroll = startAnimationElement.offset().top,
    items = $('.js-skill');

  $(window).scroll(function () {
    var scroll = $(window).scrollTop() + $(window).height();

    if (scroll >= startAnimationScroll) {
      items.each(function (i) {
        var
          $this = $(this),
          percent = $this.data('percent');

        $this.addClass('visible').css({
          'animation-delay': i / 5 + 's'
        }).find('.circle-progress__circle_fill').css({
          'animation-name': 'circle-progress-animation-' + percent,
          'animation-duration': '2s',
          'animation-fill-mode': 'both',
          'animation-delay': i / 5 + 's'
        });
      });
    }
  });
};