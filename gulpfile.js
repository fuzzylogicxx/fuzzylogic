const gulp   = require("gulp");
const sass   = require("gulp-sass");
const terser = require('gulp-terser'); //const uglify  = require('gulp-uglify');
const concat = require('gulp-concat');

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
    .pipe(terser()) //.pipe(uglify())
    .pipe(gulp.dest('./_includes/js'));
});




/*
  Watch folders for changess
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
