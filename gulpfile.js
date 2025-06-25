import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import browserSync from 'browser-sync';
import del from 'del';

const version = 'v2';
const outputFolder = 'dist';
const bs = browserSync.create();

// Clean dist folder
export function clean() {
  return del([`${outputFolder}/**/*`]);
}

// Copy and include HTML
export function copyhtml() {
  return gulp.src([`src/${version}/*.html`])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(outputFolder));
}

// Copy CSS
export function copycss() {
  return gulp.src([`src/${version}/*.css`])
    .pipe(gulp.dest(outputFolder));
}

// Copy JS
export function copyjs() {
  return gulp.src([`src/${version}/*.js`])
    .pipe(gulp.dest(outputFolder));
}

// Serve task (runs separately)
export function serve() {
  bs.init({
    server: {
      baseDir: outputFolder
    },
    port: 3000,
    open: true
  });

  gulp.watch(`src/${version}/*.html`, gulp.series(copyhtml, bs.reload));
  gulp.watch(`src/${version}/*.css`, gulp.series(copycss, bs.reload));
  gulp.watch(`src/${version}/*.js`, gulp.series(copyjs, bs.reload));
}

// Build:dist
export const buildDist = gulp.series(
  clean,
  gulp.parallel(copyhtml, copycss, copyjs)
);

// Default task — only build
export default buildDist;
