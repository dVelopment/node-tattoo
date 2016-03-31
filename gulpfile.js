"use strict";

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch');

gulp.task('styles', function() {
    return gulp.src('scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', ['build'], function() {
    watch('scss/**/*.scss', function() {
        gulp.start('styles');
    });
});

gulp.task('build', ['styles']);

gulp.task('default', ['build']);
