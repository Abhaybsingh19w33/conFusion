'use strict';

// including gulp files
// import { task, src, dest, watch, start } from 'gulp';
// import sass, { logError } from 'gulp-sass';
// import { init } from 'browser-sync';
// import del from 'del';
// import imagemin from 'gulp-imagemin';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

gulp.task('sass', function () {
    // it takes the files from the src
    return src('./css/*.scss')
        // it passes it through the function
        .pipe(sass().on('error', logError))
        // desrired file will be stored at this destination
        .pipe(dest('./css'));
});

gulp.task('sass:watch', function () {
    // appling watch task on these files
    watch('./css/*.scss', ['sass']);
});

gulp.task('browser-sync', function () {
    var files = [
        './*.html',
        './css/*.css',
        './img/*.{png,jpg,gif}',
        './js/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });

});

// Default task
gulp.task('default', ['browser-sync'], function () {
    gulp.start('sass:watch');
});

// Starts a BrowerSync instance
// gulp.task('server', gulp.series('build', function(){
//    browser.init({server: './_site', port: port});
// }));

// Clean
gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('copyfonts', function () {
    src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(dest('./dist/fonts'));
});

// Images
gulp.task('imagemin', function () {
    return gulp.src('img/*.{png,jpg,gif}')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('usemin', function () {
    return gulp.src('./*.html')
        .pipe(flatmap(function (stream, file) {
            return stream
                .pipe(usemin({
                    css: [rev()],
                    html: [function () { return htmlmin({ collapseWhitespace: true }) }],
                    js: [uglify(), rev()],
                    inlinejs: [uglify()],
                    inlinecss: [cleanCss(), 'concat']
                }))
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', ['clean'], function () {
    gulp.start('copyfonts', 'imagemin', 'usemin');
});