'use strict';

module.exports = function () {
  $.gulp.task('optimize.image', function () {
    return $.gulp.src(['./source/images/**/*.*', '!source/images/icons/*'])
      .pipe($.gp.imagemin({
        progressive: true,
        interlaced: true,
        multipass: true
      }))
      .pipe($.gulp.dest($.config.root + '/assets/img'));
  });
};
