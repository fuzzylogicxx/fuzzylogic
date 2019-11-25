const gulp   = require("gulp");
const sass   = require("gulp-sass");
const concat = require('gulp-concat');
const babel  = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');


gulp.task('default', () =>
  gulp.src('src/app.js')
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(gulp.dest('dist'))
);


/*
  clear out eleventy-generated files so that no old blog posts are hanging around and showing up where they shouldn’t
*/
gulp.task('wipe', function() {
  return del([
    '_site/*'
  ]);
});


/*
  generate .css from .scss with sass
*/
gulp.task('css', function() {
  return gulp.src('./scss/main.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    })
    .on('error', sass.logError))
    .pipe(gulp.dest('./_includes/css'));
});


/*
 Uglify our javascript files into one.
 Use pump to expose errors more usefully.
*/

gulp.task('js', function() {
  return gulp.src("./js/**/*.js")
    .pipe(concat('fuzzylogic.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./_includes/js'));
});




/*
  Watch folders for changes
*/
gulp.task("watch", function() {
  gulp.watch('./scss/**/*.scss', gulp.parallel('css'));
  gulp.watch('./js/**/*.js', gulp.parallel('js'));
});


/*
  Let's build this sucker.
*/
gulp.task('build', gulp.parallel(
  'css',
  'js'
));
