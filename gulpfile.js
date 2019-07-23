const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');


gulp.task('scripts', function() {

  gulp.src(['./scripts/src/license.js', './scripts/src/**/*.js'])
    .pipe(concat('SwineMeeper.min.js'))
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .pipe(gulp.dest('./scripts/'));

});


gulp.task('styles', function() {

  gulp.src('./styles/**/*.less')
    .pipe(less())
    .pipe(concat('styles.css'))
    .pipe(cleanCss({ minify: true }))
    .pipe(gulp.dest('./stylesheets'))

});


gulp.task('default', function() {

  gulp.watch('./scripts/src/**/*.js', ['scripts']);
  gulp.watch('./styles/**/*.less', ['styles']);

});
