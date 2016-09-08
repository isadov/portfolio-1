'use strict';

module.exports = function () {
  var
    flipper = $('#js-flipper'),
    authorizationButton = $('#js-authorizetion-button');

  function isAuth() {
    return location.hash.replace(/^#/, '') === 'auth';
  }

  function flip() {
    if (isAuth() && !flipper.hasClass('welcome__flip_flipped')) {
      flipper.addClass('welcome__flip_flipped');
      authorizationButton.fadeOut(600);
    } else {
      flipper.removeClass('welcome__flip_flipped');
      authorizationButton.fadeIn(600);
    }
  }

  $(window).on('hashchange', flip);
  $(flip);
};