///////////////////////////////////////////////////
//Gulp dependencies
///////////////////////////////////////////////////
var gulp = require('gulp'),
    config = require('./gulpfile.config')(),
    $ = require('gulp-load-plugins')(),
    del = require('del')
    jshint = require('jshint'),
    mainBowerFiles = require('main-bower-files')
    browserSync = require('browser-sync').create();


///////////////////////////////////////////////////
//Watch task
///////////////////////////////////////////////////
gulp.task('vet', function(){
    console.log('vetting Javascript');
    return gulp
    .src(config.js)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));

});

gulp.task('reload-html', function(){
  browserSync.reload();

});

gulp.task('watch-app', function(){
    gulp.watch(config.js, ['vet', 'amalgamateJs']);
    //gulp.watch(config.sass, ['compile-sass']);
    gulp.watch(config.html, ['reload-html'])

})

///////////////////////////////////////////////////
//Compile Sass and minify
///////////////////////////////////////////////////

gulp.task('compile-sass', function(){
  console.log('compiling sass');
    return gulp
    .src(config.sass)
    .pipe($.sass({outputStyle: 'compressed'}))
    .pipe($.rename({suffix:'.min'}))
    .pipe(gulp.dest(config.dev.css))
    .pipe(browserSync.reload({
      stream: true
    }));

});



///////////////////////////////////////////////////
//Uglify Javascript
///////////////////////////////////////////////////

//concatenate and uglify

gulp.task('amalgamateJs', function(){
    console.log('concatenating Javascript');
    console.log(config.js);
    return gulp
    .src(config.js)
    .pipe($.concat('ngskeleton.js'))
    .pipe($.rename({suffix:'.min'}))
    //.pipe($.uglify())
    .pipe(gulp.dest(config.dev.app));
})

///////////////////////////////////////////////////
//minify Css
///////////////////////////////////////////////////



///////////////////////////////////////////////////
//Inject Javascript
///////////////////////////////////////////////////
gulp.task('inject', function() {
    console.log('Injecting custom scripts to index.html');
    //console.log(config.appJs);

    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src([config.dev.app_js, config.css]), {relative: true}) )
        .pipe(gulp.dest(config.base));
});



///////////////////////////////////////////////////
//Start Browser sync
///////////////////////////////////////////////////


gulp.task('start', function(){
    console.log(config.pre_dist);
    return
    gulp.src(config.pre_dist)
    .pipe(gulp.dest(config.dest_dist));

});

gulp.task('serve', [/*'compile-sass', */'amalgamateJs', 'inject', 'watch-app'], function() {
    startBrowserSync();
});

gulp.task('serve-dist', function() {

});


var startBrowserSync = function(){
    browserSync.init({
        server:{
            baseDir: config.source
        }
    });
}




///////////////////////////////////////////////////
//Create distribution
///////////////////////////////////////////////////

//concatenate,  uglify/minify copy all to new dist directory

//////////////////////////////////////////////////
//Copy to dist
///////////////////////////////////////////////////
