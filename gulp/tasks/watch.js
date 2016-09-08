'use strict';

module.exports = function () {
  $.gulp.task('watch', function () {
    $.gulp.watch('./source/js/**/*.js', $.gulp.series('js.process'));
    $.gulp.watch('./source/style/**/*.scss', $.gulp.series('sass'));
    $.gulp.watch('./source/template/**/*.jade', $.gulp.series('jade'));
    $.gulp.watch(['./source/images/**/*.*', '!./source/images/icons/*'], $.gulp.series('copy.image'));
    $.gulp.watch('./source/images/icons/*.*', $.gulp.series('svgsprite'));
    $.gulp.watch('./source/fonts/**/*.*', $.gulp.series('copy.fonts'));
    $.gulp.watch('./source/other/**/*.*', $.gulp.series('copy.other'));
  });
};
