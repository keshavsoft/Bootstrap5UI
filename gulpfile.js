import gulp from 'gulp';
import fileInclude from 'gulp-file-include';

const version = 'v2';
const outputFolder = 'dist';

export function copyhtml() {
  return gulp.src([`src/${version}/*.html`])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(outputFolder));
}

export function copycss() {
  return gulp.src([`src/${version}/*.css`])
    .pipe(gulp.dest(outputFolder));
}

export function copyjs() {
  return gulp.src([`src/${version}/*.js`])
    .pipe(gulp.dest(outputFolder));
}

// Default task
export default gulp.parallel(copyhtml, copycss, copyjs);
