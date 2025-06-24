import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import del from 'del';

// Copy and include HTML files (excluding partials)
export function copyhtml() {
  return gulp.src(['src/*.html'])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'));
}

// Copy CSS file(s)
export function copycss() {
  return gulp.src('src/*.css') // includes dashboard.css
    .pipe(gulp.dest('dist'));
}

// Copy JS file(s)
export function copyjs() {
  return gulp.src('src/*.js') // includes dashboard.js
    .pipe(gulp.dest('dist'));
}

// Default task to run all of them
export default gulp.parallel(copyhtml, copycss, copyjs);

