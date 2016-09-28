var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {

  gulp.src(['./scripts/src/license.js', './scripts/src/*.js'])
    .pipe(concat('SwineMeeper.min.js'))
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .pipe(gulp.dest('./scripts/'));

});

gulp.task('default', function() {
  gulp.watch('./scripts/src/*.js', ['scripts']);
});
