'use strict';

/**
 * Charger les dépendances
 */
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var csso         = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var livereload   = require('gulp-livereload');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var spritesmith  = require('gulp.spritesmith');
var rename       = require('gulp-rename');
var styledown    = require('gulp-styledown');
var foreach = require('gulp-foreach');

//Config des erreurs
var notifyError = {
    title  : "Error",
    message: "<%= error.message %>"
}

/**
 * Sprites
 */
gulp.task('sprites', function ()
{
    console.log("----------- Sprites -----------");

    var sprites = [
        {
            name: "1x"
        },
        {
            name: "2x"
        }
    ];

    sprites.forEach(function (el)
    {
        var spriteData = gulp.src('../src/sprites/' + el.name + '/*.png')
            .pipe(plumber({
                errorHandler: notify.onError(notifyError)
            }))
            .pipe(spritesmith({
                imgName    : 'sprite' + el.name + '.png',
                cssName    : 'sprite' + el.name + '.scss',
                cssTemplate: 'sprites-templates/sprite' + el.name + '.scss.handlebars'
            }));
        var imgStream  = spriteData.img.pipe(gulp.dest('../dist/img/' + el.name + '/'));
        var cssStream  = spriteData.css.pipe(gulp.dest('../src/sprites/' + el.name + '/'));
    });
});

/**
 * CSS
 */
gulp.task('styles', function ()
{
    console.log("----------- Styles -----------");

    //Tableaux des points d'entrées des css à générer
    //Ici on génère bien 3 feuille de styles différentes
    var stylesBootstrap = [
        {
            name: "index",
            src : '../src/bootstrap/index.scss'
        },
        {
            name: "styleguide",
            src : '../src/common/layout/styleguide.scss'
        },
        {
            name: "maintenance",
            src : '../src/common/layout/maintenance.scss'
        }
    ];

    //Pour chaque styles
    stylesBootstrap.forEach(function (el)
    {
        gulp.src(el.src)
            .pipe(plumber({
                errorHandler: notify.onError(notifyError)
            }))
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer("> 4%"))
            .pipe(concat(el.name + '.css'))
            .pipe(gulp.dest('../dist/css/'))

            //Pour la version minifié
            .pipe(csso())
            .pipe(concat(el.name + '.min.css'))
            .pipe(gulp.dest('../dist/css/'))
            .pipe(livereload());
    });

    //On relance la génération du styleguide
    gulp.start('styleguide');

});

/**
 * Styleguide
 */
gulp.task('styleguide', function ()
{
    console.log("----------- Styleguide -----------");
    gulp.src([
            '../src/bootstrap/*.scss',
            '../src/common/**.scss',
            '../src/common/**/*.scss'
        ])
        .pipe(styledown({
            config  : '../styleguide/config.md',
            filename: 'styleguide.html'
        }))
        .pipe(gulp.dest('../styleguide'));

    gulp.src('../src/components/**/*.md')
        .pipe(foreach(function(stream, file){
            var filePath = file.path;
            var filename = filePath.replace(/^.*[\\\/]/, '').replace('.md','');
            return stream
                .pipe(styledown({
                    config  : '../styleguide/config.md',
                    filename: filename+'.html'
                }))
        }))
        .pipe(gulp.dest('../styleguide/components'))
        .pipe(livereload());
});

/**
 * JS
 */
gulp.task('scripts', function ()
{
    console.log("----------- Scripts -----------");

    gulp.src([
            //'../src/libs/*.js', //Libs
            '../src/common/*.js', //Project files
            '../src/common/**/*.js', //Project files
            '../src/components/**/*.js', //Components js
            '../src/pages/**/*.js', //Pages js
            '../src/bootstrap/bootstrap.js' //Project bootstrap
        ])
        .pipe(plumber({
            errorHandler: notify.onError(notifyError)
        }))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('../dist/js/'))
        .pipe(rename({extname: '.min.js'}))
        .pipe(uglify({
            mangle  : true,
            compress: {
                sequences   : true, // join consecutive statemets with the “comma operator”
                dead_code   : true, // discard unreachable code
                conditionals: true, // optimize if-s and conditional expressions
                booleans    : true, // optimize boolean expressions
                unused      : true, // drop unused variables/functions
                if_return   : true, // optimize if-s followed by return/continue
                join_vars   : true, // join var declarations
                drop_console: true // drop console
            }
        }))
        .pipe(gulp.dest('../dist/js/'))
        .pipe(livereload());
});

/**
 * Default task
 */
gulp.task('default', ['sprites', 'styles', 'scripts'], function ()
{
    livereload.listen();

    //Sprite
    gulp.watch([
        '../src/sprites/**/*.png',
    ], ['sprites']);

    //Sass
    gulp.watch([
        '../src/*.scss',
        '../src/**/*.scss',
        '../src/**/**/*.scss',
        '../src/libs/**/*.scss',
        '../src/libs/**/**/*.scss',
    ], ['styles']);

    //Js
    gulp.watch([
        '../src/*.js',
        '../src/**/*.js',
        '../src/**/**/*.js',
        '../src/libs/**/*.js',
    ], ['scripts']);

    //Styleguide
    gulp.watch([
        '../styleguide/config.md',
        '../src/components/**/*.md'
    ], ['styleguide']);
});