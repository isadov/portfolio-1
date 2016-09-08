'use strict';

module.exports = function() {
  $.gulp.task('copy.other', function() {
    return $.gulp.src('./source/other/**/*.*', { since: $.gulp.lastRun('copy.other') })
      .pipe($.gulp.dest($.config.root + '/'));
  });
};