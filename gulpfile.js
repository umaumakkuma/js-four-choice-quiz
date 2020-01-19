var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    gifsicle     = require('imagemin-gifsicle'),
    runSequence  = require('run-sequence'),
    rimraf       = require('rimraf');

var inputDir = 'app',
    outputDir = 'public_html';

// browser-sync
gulp.task('browser-sync', function() {
  browserSync({
    notify: false,
    server: {
       baseDir: inputDir,
       index  : 'index.html',
       directory: true
    }
  });
});

// browser-sync:dist
gulp.task('browser-sync:dist', function() {
  browserSync({
    notify: false,
    server: {
       baseDir: outputDir,
       index  : 'index.html',
       directory: true
    }
  });
});

// ブラウザリロード
gulp.task('bs-reload', function () {
  browserSync.reload();
});

// sass
gulp.task('sass', function() {
  return gulp.src('./app/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle : 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(inputDir))
});

// sass:build
gulp.task('sass:build', function() {
  return gulp.src('./app/**/*.scss')
    .pipe(sass({
        outputStyle : 'expanded'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(outputDir))
});

// remove public_html
gulp.task('clean', function(cb) {
  return rimraf(outputDir, cb)
});

gulp.task('copy', function() {
  return gulp.src([
    './app/**/*',
    '!./app/**/*.map',
    '!./app/**/*.scss'
  ])
  .pipe(gulp.dest(outputDir));
});

// build
gulp.task('build', function(cb) {
  runSequence('clean', ['min-css', 'min-js'], 'copy', ['sass:build', 'sass'], cb);
});

// build:full
gulp.task('build:full', function(cb) {
  runSequence('clean', ['min-css', 'min-js'], 'copy', ['sass:build', 'sass', 'imagemin'], 'purgecss', cb);
});

// 監視ファイル
gulp.task('default', ['browser-sync', 'sass'], function () {
  gulp.watch('./app/**/*.html',  ['bs-reload']);
  gulp.watch('./app/**/*.css',  ['bs-reload']);
  gulp.watch('./app/**/*.js',    ['bs-reload']);
  gulp.watch('./app/**/*.scss',['bs-reload', 'sass']);
});
