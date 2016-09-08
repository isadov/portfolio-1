'use strict';

module.exports = function () {
  $.gulp.task('svgsprite', function () {
    return $.gulp.src('./source/images/icons/*.svg')
    .pipe($.gp.svgmin({
        plugins: [
          {
            removeAttrs: {
              attrs: [
                'fill',
                'stroke',
                'stroke-width'
              ]
            }
          }
        ]
      }))
      .pipe($.gp.svgSprite($.config.spriteSvgConfig))
      .pipe($.gulp.dest('./'));
  });
};