'use strict';

module.exports = function (fix) {
  var
    bg = $('.js-blur-bg'),
    blur = $('.js-blur').css({
      top: 0,
      left: 0
    }),
    bgOffset = bg.offset(),
    blurOffset = blur.offset();

  fix = fix || 0;

  blur.css({
    width: bg.width(),
    height: bg.height(),
    top: bgOffset.top - blurOffset.top + fix,
    left: bgOffset.left - blurOffset.left
  });
};