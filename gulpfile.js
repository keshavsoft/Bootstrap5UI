import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import browserSync from 'browser-sync';
import del from 'del';
import rename from 'gulp-rename';

const version = 'v2';
const devFolder = 'dev';
const outputFolder = 'dist';
const bs = browserSync.create();


export function cleanDev() {
  return del([`${devFolder}/**/*`]);
}


export function cleanDist() {
  return del([`${outputFolder}/**/*`]);
}


export function copyhtmlDev() {
  return gulp.src([`src/${version}/*.html`])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(devFolder));
}


export function copyhtmlDist() {
  return gulp.src([`src/${version}/*.html`])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(outputFolder));
}


export function copycssDev() {
  return gulp.src([`src/${version}/*.css`])
    .pipe(gulp.dest(devFolder));
}


export function copycssDist() {
  return gulp.src([`src/${version}/*.css`])
    .pipe(gulp.dest(outputFolder));
}


export function copyjsDev() {
  return gulp.src([`src/${version}/*.js`])
    .pipe(gulp.dest(devFolder));
}


export function copyjsDist() {
  return gulp.src([`src/${version}/*.js`])
    .pipe(gulp.dest(outputFolder));
}


export function copyIndexDev() {
  return gulp.src([`src/${version}/Dashboard.html`])
    .pipe(rename('index.html'))
    .pipe(gulp.dest(devFolder));
}


export function copyIndexDist() {
  return gulp.src([`src/${version}/Dashboard.html`])
    .pipe(rename('index.html'))
    .pipe(gulp.dest(outputFolder));
}

// Serve task (dev folder)
export function serve() {
  bs.init({
    server: {
      baseDir: devFolder
    },
    port: 3000,
    open: true
  });

  gulp.watch(`src/${version}/*.html`, gulp.series(copyhtmlDev, copyIndexDev, bs.reload));
  gulp.watch(`src/${version}/*.css`, gulp.series(copycssDev, bs.reload));
  gulp.watch(`src/${version}/*.js`, gulp.series(copyjsDev, bs.reload));
}


export const buildDevFolder = gulp.series(
  cleanDev,
  gulp.parallel(copyhtmlDev, copycssDev, copyjsDev, copyIndexDev)
);


export const buildDist = gulp.series(
  cleanDist,
  gulp.parallel(copyhtmlDist, copycssDist, copyjsDist, copyIndexDist)
);


gulp.task('default', gulp.series(buildDevFolder, serve));
