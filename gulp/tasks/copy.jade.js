'use strict';

module.exports = function() {
  $.gulp.task('copy.jade', function() {
    return $.gulp.src('./source/template/**/*.*')
      .pipe($.gulp.dest($.config.root + '/template'));
  });
};