///////////////////////////////////////////////////
//Gulp dependencies
///////////////////////////////////////////////////
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create();

    /* PS: gulp-connect is an alternative server for browser-sync */

var jsSources = ['components/scripts/*.js'],
    sassSources = ['**/*.scss'],
    mainSassSource = ['styles/scss/bootstrap.scss'],
    htmlSources = ['**/*.html'],
    outputDir = 'dev';


gulp.task('log', function() {
  gutil.log('== ng-skeleton gulp task ==')
});

gulp.task('compile-sass', function() {
  gulp.src(mainSassSource)
  .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
  .pipe(gulp.dest('assets/css'))
  // .pipe(connect.reload())
});

gulp.task('compile-js', function() {
  gulp.src(jsSources)
  // .pipe(uglify())
  .pipe(concat('ngskeleton.js'))
  .pipe(gulp.dest(outputDir))
  // .pipe(connect.reload())
});

gulp.task('compile-html', function() {
  gulp.src(htmlSources)
  // .pipe(connect.reload())
});

gulp.task('watch', function() {
  // gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['compile-js', 'reload-html']);
  gulp.watch(sassSources, ['compile-sass', 'reload-html']);
  gulp.watch(htmlSources, ['compile-html', 'reload-html']);
});

// gulp.task('connect', function() {
//   connect.server({
//     root: '.',
//     livereload: true
//   })
// });

gulp.task('reload-html', function(){
  browserSync.reload();
});

gulp.task('serve', ['compile-html', 'compile-js', 'compile-sass', 'watch'], function(){
	startBrowserSync();
});

var startBrowserSync = function(){
    browserSync.init({
        server:{
            baseDir: '.'
        }
    });
}
