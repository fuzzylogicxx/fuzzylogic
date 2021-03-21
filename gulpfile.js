const gulp   = require("gulp");
const sass   = require("gulp-sass");
const del = require('del');

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
  Watch folders for changes
*/
gulp.task("watch", function() {
  gulp.watch('./scss/**/*.scss', gulp.parallel('css'))
});


/*
  Let's build this sucker.
*/
gulp.task('build', gulp.parallel(
  'css'
));
