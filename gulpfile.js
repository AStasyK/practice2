'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var googlecdn = require('gulp-google-cdn');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
//gulp --tasks  - просмотр задач
gulp.task('gcdn', function (done) { //задача по умолчанию может быть вызвана кл.сл.gulp
    return gulp.src('./index.html')
        .pipe(googlecdn(require('./bower.json'), {
            componentsPath: './bower_components/'
    }))
        .pipe(gulp.dest('./dist'));
    done();
});

gulp.task('clean', function (done) {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
    done();
});

 
gulp.task('scss', gulp.series('clean', function (done) {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
	}).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
    done();
    }));
 

gulp.task('scss:watch', function () {
  gulp.watch('./scss/**/*.scss', gulp.series('scss', 'gcdn'));
});

gulp.task('dist', gulp.series('scss', 'gcdn'));;