'use strict';

var slideIt = require('../common/slide-it');

module.exports = function () {
  var
    startParallaxOffset = $('.js-parallax').offset() ,
    leaf1 = $('.js-leaf_1'),
    leaf2 = $('.js-leaf_2'),
    leaf3 = $('.js-leaf_3');

  function parallax() {
    var wScroll = $(window).scrollTop() + $(window).height() - startParallaxOffset.top;

    if (wScroll > 0) {
      slideIt(leaf1, -wScroll / 10);
      slideIt(leaf2, -wScroll / 5);
      slideIt(leaf3, -wScroll / 15);
    }
  }
  
  $(window).scroll(parallax);
};