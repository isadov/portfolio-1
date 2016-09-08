'use strict';

var slideIt = require('./slide-it');

module.exports = function () {
  var
    headerHeight = $('.js-header').height(),
    bg = $('.js-header__bg'),
    author = $('.js-header__author'),
    text = $('.js-header__text');

  function parallax() {
    var
      wScroll = $(window).scrollTop();

    // Немного ограничим параллакс
    if (wScroll < headerHeight) {
      slideIt(bg, -wScroll / 120);
      slideIt(text, -wScroll / 7);
      slideIt(author, wScroll / 4);
    }
  }


  $(window).scroll(parallax);
};
