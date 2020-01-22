var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

var inputDir = 'app'

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

// 監視ファイル
gulp.task('default', ['browser-sync', 'sass'], function () {
  gulp.watch('./app/**/*.html',  ['bs-reload']);
  gulp.watch('./app/**/*.css',  ['bs-reload']);
  gulp.watch('./app/**/*.js',    ['bs-reload']);
  gulp.watch('./app/**/*.scss',['bs-reload', 'sass']);
});
