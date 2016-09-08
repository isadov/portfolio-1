'use strict';

module.exports = function() {
  $.gulp.task('js.process', function() {
    return $.browserify({
      entries: $.path.app,
      debug: true
    })
      .bundle()
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Browserify',
          message:  error.message
        }
      }))
      .pipe($.source('app.js'))
      .pipe($.gulp.dest($.config.root + '/assets/js'));
  })
};
