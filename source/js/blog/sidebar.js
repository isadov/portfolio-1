'use strict';

var pin = require('../common/pin');

module.exports = function () {
  function checkArticle(articleSelector) {
    $(articleSelector).each(function () {
      var
        $this = $(this),
        topEdge = $this.offset().top - $(window).height(),
        bottomEdge = topEdge + $this.height(),
        wScroll = $(window).scrollTop();

      if (topEdge < wScroll && bottomEdge > wScroll) {
        var
          currentId = $this.data('article'),
          reqLink = $('.js-show-article').removeClass('active').filter('[href="#' + currentId + '"]');

        reqLink.addClass('active');
        window.location.hash = currentId;
      }
    });
  }

  function showArticle(article, isAnimate) {
    var
      direction = article.replace(/#/, ''),
      reqArticle = $('.blog-article').filter('[data-article="' + direction + '"]'),
      reqArticlePos = reqArticle.offset().top;

    if (isAnimate) {
      $('body, html').animate({
        scrollTop: reqArticlePos
      }, 500);
    } else {
      $('body, html').scrollTop(reqArticlePos);
    }
  }

  function sidebarInit() {
    var
      sidebar = $('.sidebar__nav'),
      header = $('.header'),
      startPos = header.offset().top + header.height(),
      wScroll = $(window).scrollTop(),
      sidebarPosition = {
        top: sidebar.offset().top - $('.blog__sidebar').offset().top,
        left: sidebar.offset().left
      };

    if (wScroll > startPos && $(window).width() > 1200 && !pin.isPinned(sidebar)) {
      pin.pin(sidebar, sidebarPosition);
    } else if ((wScroll < startPos || $(window).width() < 1200) && pin.isPinned(sidebar)) {
      pin.unpin(sidebar);
    }
  }

  $(document).ready(function () {
    sidebarInit();

    if (window.location.hash)
      showArticle(window.location.hash, false);

    $('.sidebar__link').on('click', function (e) {
      e.preventDefault();

      showArticle($(this).attr('href'), true);
    });
  });

  $(window).scroll(function () {
    sidebarInit();

    checkArticle('.js-article');
  });

  $(window).resize(function () {
    sidebarInit();
  });
};