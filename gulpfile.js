var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');


gulp.task('scripts', function() {

  gulp.src(['./scripts/src/license.js', './scripts/src/**/*.js'])
    .pipe(concat('SwineMeeper.min.js'))
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .pipe(gulp.dest('./scripts/'));

});


gulp.task('styles', function() {

  gulp.src('./scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./stylesheets'))

});


gulp.task('default', function() {

  gulp.watch('./scripts/src/**/*.js', ['scripts']);
  gulp.watch('./scss/**/*.scss', ['styles']);

});
