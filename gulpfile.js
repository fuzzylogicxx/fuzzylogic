'use strict';

// Sass-gulp workflow reference: https://www.sitepoint.com/simple-gulpy-workflow-sass/

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

var input = './src/sass/*.scss';
var output = './dist/css';

// For gulpicon
var glob = require("glob");
var gulpicon = require("gulpicon/tasks/gulpicon");
var config = require("./src/gulpicon/example/config.js");
config.dest = "./dist/svg";
var files = glob.sync("./src/gulpicon/example/svg/*.svg");
// End For gulpicon

gulp.task('sass', function () {
  return gulp.src(input)
    .pipe(sourcemaps.init())
    .pipe(sass({precision: 10}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(rename('screen_v12.css'))
    .pipe(gulp.dest(output));
});

gulp.task('sass:watch', function () {
  gulp.watch(input, gulp.series('sass'));
});

gulp.task('icons', gulpicon(files, config));

// gulp.task('default', function() {
//   // place code for your default task here
// });

gulp.task('default', gulp.series(gulp.parallel('sass', 'sass:watch'), function() {
    //
}));

// Could add a "production" task which only gets run before a major commit/push.
// It would do stuff that you don't want to add overhead for during normal development.
// For example, adding documentation, minification, revving filenames.




