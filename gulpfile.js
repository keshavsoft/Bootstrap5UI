import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import browserSync from 'browser-sync';
import del from 'del';
import rename from 'gulp-rename';

const version = 'v2';
const tempFolder = '.temp';
const outputFolder = 'dist';
const bs = browserSync.create();

export function cleanTemp() {
  return del([`${tempFolder}/**/*`]);
}

export function cleanDist() {
  return del([`${outputFolder}/**/*`]);
}

export function copyhtmlTemp() {
  return gulp.src([`src/${version}/*.html`])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(tempFolder));
}

export function copyhtmlDist() {
  return gulp.src([`src/${version}/*.html`])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(outputFolder));
}

export function copycssTemp() {
  return gulp.src([`src/${version}/*.css`])
    .pipe(gulp.dest(tempFolder));
}

export function copycssDist() {
  return gulp.src([`src/${version}/*.css`])
    .pipe(gulp.dest(outputFolder));
}

export function copyjsTemp() {
  return gulp.src([`src/${version}/*.js`])
    .pipe(gulp.dest(tempFolder));
}

export function copyjsDist() {
  return gulp.src([`src/${version}/*.js`])
    .pipe(gulp.dest(outputFolder));
}

export function copyIndexTemp() {
  return gulp.src([`src/${version}/Dashboard.html`])
    .pipe(rename('index.html'))
    .pipe(gulp.dest(tempFolder));
}

export function copyIndexDist() {
  return gulp.src([`src/${version}/Dashboard.html`])
    .pipe(rename('index.html'))
    .pipe(gulp.dest(outputFolder));
}

// Serve task 
export function serve() {
  bs.init({
    server: {
      baseDir: tempFolder
    },
    port: 3000,
    open: true
  });

  gulp.watch(`src/${version}/*.html`, gulp.series(copyhtmlTemp, copyIndexTemp, bs.reload));
  gulp.watch(`src/${version}/*.css`, gulp.series(copycssTemp, bs.reload));
  gulp.watch(`src/${version}/*.js`, gulp.series(copyjsTemp, bs.reload));
}

// Build:temp (for temp folder)
export const buildTempFolder = gulp.series(
  cleanTemp,
  gulp.parallel(copyhtmlTemp, copycssTemp, copyjsTemp, copyIndexTemp)
);

// Build:dist (for dist folder)
export const buildDev = gulp.series(
  cleanDist,
  gulp.parallel(copyhtmlDist, copycssDist, copyjsDist, copyIndexDist)
);

// Default task — build to temp and serve
gulp.task('default', gulp.series(buildTempFolder, serve));
