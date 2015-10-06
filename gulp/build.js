'use strict';

var gulp = require('gulp');
var config = require('./config')();
var gulpSequence = require('gulp-sequence');
var del = require('del');
var plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('html', ['inject'], function() {


    var htmlFilter = plugins.filter('*.html');
    var jsFilter = plugins.filter('**/*.js');
    var cssFilter = plugins.filter('**/*.css');
    var assets;

    return gulp.src(config.serve + '/*.html')
        .pipe(assets = plugins.useref.assets())
        .pipe(plugins.rev())
        .pipe(jsFilter)
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify({
            preserveComments: plugins.uglifySaveLicense
        }))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(plugins.replace('../bootstrap-sass-official/assets/fonts/bootstrap', '../fonts'))
        .pipe(plugins.csso())
        .pipe(cssFilter.restore())
        .pipe(assets.restore())
        .pipe(plugins.useref())
        .pipe(plugins.revReplace())
        .pipe(htmlFilter)
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest(config.dist))
        .pipe(plugins.size({
            title: config.dist,
            showFiles: true
        }));
});

gulp.task('images', function() {
    return gulp.src(config.images.files)
        .pipe(gulp.dest(config.images.dest));
});

gulp.task('fonts-dev', function() {
    return gulp.src(config.fonts.files)
        .pipe(plugins.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe(plugins.flatten())
        .pipe(gulp.dest(config.fonts.dev));
});

gulp.task('fonts-prod', ['fonts-dev'], function() {
    return gulp.src([config.fonts.dev + '/**'])
        .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('equipments', function() {
    return gulp.src(config.equipment.files)
        .pipe(gulp.dest(config.equipment.dest));
});

gulp.task('misc', function() {
    return gulp.src(config.misc.files)
        .pipe(gulp.dest(config.dist));
});

gulp.task('clean', function(done) {
    return del([config.dist + '/**', config.tmp + '/**'], {
        force: true
    }, done);
});

gulp.task('build', gulpSequence('clean', ['html', 'images', 'fonts-prod', 'misc', 'equipments']));