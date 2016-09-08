'use strict';

module.exports = function () {
  function getImagesPaths() {
    var images = [];

    $('*').each(function () {
      var
        $this = $(this),
        img = $this.is('img'),
        path;

      if (img) {
        path = $this.attr('src');

        if (path)
          images.push(path);
      } else {
        var background = $this.css('background-image');

        if (background != 'none') {
          path = /url\(.*?\)/ig.test(background) && background.replace('url("', '').replace('")', '');

          if (path)
            images.push(path);
        }
      }
    });

    return images;
  }

  $(function () {
    var
      images = getImagesPaths(),
      total = images.length,
      current = 0;

    function updateProgress() {
      current += 1;

      $('#js-preloader-progress').text(Math.ceil(current * 100 / total));
    }

    images.map(function (path) {
      $('<img>', {
        attr: {
          src: path
        }
      }).load(updateProgress);
    });
  });

  $(window).load(function () {
    $('#js-preloader').fadeOut();
  });
};