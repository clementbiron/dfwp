'use strict';

/**
 * Charger les dépendances
 */
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var csso         = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var livereload   = require('gulp-livereload');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var rename       = require('gulp-rename');
var styledown    = require('gulp-styledown');
var foreach = require('gulp-foreach');
var browserSync = require('browser-sync').create();
var svgSprite = require('gulp-svg-sprite');

//Config des erreurs
var notifyError = {
    title  : "Error",
    message: "<%= error.message %>"
}

//Browser sync task
gulp.task('browser-sync', function () 
{
    console.log("----------- Brower sync -----------");

    browserSync.init({
        proxy: "http://192.168.0.27/_lab/dfwp",
        host: "192.168.0.27",
        open: "external",
        injectChanges: true
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
            src: '../src/bootstrap/bootstrap.scss'
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
            .pipe(browserSync.stream());
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

    //Pour les common (éléments, layout, config)
    gulp.src([
            '../src/bootstrap/*.scss',
            '../src/common/**.scss',
            '../src/common/**/*.scss',
            '../styleguide/config.md'
        ])
        .pipe(styledown({
            config  : '../styleguide/config.md',
            filename: 'styleguide.html'
        }))
        .pipe(gulp.dest('../styleguide'))
        .pipe(browserSync.stream());

    //Pour les composants
    gulp.src('../src/components/**/*.md')
        .pipe(foreach(function(stream, file){
            var filename = file.path.replace(/^.*[\\\/]/, '').replace('.md','');
            return stream
                .pipe(styledown({
                    config  : '../styleguide/config.md',
                    filename: filename+'.html'
                }))
        }))
        .pipe(gulp.dest('../styleguide/components'));
        browserSync.reload();
        //.pipe(browserSync.reload);
});

/**
 * JS
 */
gulp.task('scripts', function ()
{
    console.log("----------- Scripts -----------");

    gulp.src([
            //'../src/vendor/..', //Libs
            '../src/common/utils/*.js', //utils files
            '../src/common/layout/*.js', //layout files
            '../src/components/**/*.js', //Components js
            '../src/pages/**/*.js', //Pages js
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
        .pipe(gulp.dest('../dist/js/'));
        browserSync.reload();
        //.pipe(browserSync.reload);
});

gulp.task('svg-sprite', function () 
{
    console.log("----------- SVG SPRITE -----------");

    var config = {
        log: 'info',
        shape: {
            transform: [
                {
                    svgo: {
                        plugins: [
                            { removeXMLNS: true }
                        ]
                    }
                }
            ]
        },
        svg: {
            xmlDeclaration: false,
            doctypeDeclaration: false,
            dimensionAttributes: false,       
            rootAttributes: {
                style: "display:none;"
            }     
        },
        mode: {
            symbol: {
                dest: "generated",
                sprite: "sprite.svg",
                render: {
                    scss: true
                }
            }
        }
    };

    gulp.src('../src/assets/svg/src/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('../src/assets/svg/'));
});

/**
 * Default task
 */
gulp.task('default', ['styles', 'scripts','browser-sync'], function ()
{
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

    //Sprite svg
    gulp.watch([
        '../src/assets/svg/src/*.svg',
        '../src/assets/svg/src'
    ], ['svg-sprite',browserSync.reload]);

    //PHP files browser sync reload
    gulp.watch([
        '../*.php',
        '../src/components/**/*.php'
    ], browserSync.reload);
});