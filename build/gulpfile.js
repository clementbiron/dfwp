/**
 * Charger les dépendances
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var styledown = require('gulp-styledown');
var foreachFiles = require('gulp-foreach');
var browserSync = require('browser-sync').create();
var svgSprite = require('gulp-svg-sprite');
var babel = require("gulp-babel");
var babelpresetenv = require("babel-preset-env");
var sourcemaps = require('gulp-sourcemaps');
var minify = require("gulp-babel-minify");


/**
 * Configuration 
 */

//Configuration des css à générer
//On génère 3 feuille de styles différentes
const appStyles = new Map();
appStyles.set(1, { name: 'index', src: '../src/config/loader.scss' });
appStyles.set(2, { name: 'styleguide', src: '../src/layout/styleguide.scss' });
appStyles.set(3, { name: 'maintenance', src: '../src/layout/maintenance.scss' });

//Configuration de Browsersync
const browserSyncConf = {
    proxy: "http://192.168.0.27/_lab/dfwp",
    host: "192.168.0.27",
    open: "external",
    injectChanges: true
}

//Configuration des sources nécessaire pour la génération du styleguide.html
const styleguideConf = {
    filename: 'styleguide.html',
    configPath: '../styleguide/config.md',
    componentsPath:'../src/components/**/*.md',
    primaryDest: '../styleguide', //Dossier de destination du fichier styleguide.html
    componentsDest: '../styleguide/components' //Dossier de destination des composants
}

//Config scripts
const scriptsConf = {
    src: [
        '../src/utils/*.js', //utils files
        '../src/layout/*.js', //layout files
        '../src/components/**/*.js', //Components js
        '../src/pages/**/*.js', //Pages js
    ],
    filename: 'index',
    destPath: '../dist/js'
}

//Config svg
const svgConfig = {
    src: '../src/assets/svg/src/*.svg',
    dest: '../src/assets/svg/',
    svgSprite: {
        log: 'info',
        shape: {
            transform: [{
                svgo: {
                    plugins: [{
                        removeXMLNS: true
                    }]
                }
            }]
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
    }
};

/**
 * Browser sync
 */
gulp.task('browser-sync', function () 
{
    console.log("----------- Brower sync -----------");
    browserSync.init(browserSyncConf);
});

/**
 * Styles du projet
 */
gulp.task('styles-project', function () 
{
    console.log("----------- Styles du projet -----------");
    return gulp.src(appStyles.get(1).src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer("> 4%"))
    .pipe(concat(appStyles.get(1).name + '.css'))
    .pipe(gulp.dest('../dist/css/'))
    .pipe(browserSync.stream())
    .pipe(csso())
    .pipe(concat(appStyles.get(1).name + '.min.css'))
    .pipe(gulp.dest('../dist/css/'));
});

/**
 * Styles du styleguide
 */
gulp.task('styles-styleguide', function () 
{
    console.log("----------- Styles du styleguide -----------");
    return gulp.src(appStyles.get(2).src)
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(concat(appStyles.get(2).name + '.min.css'))
    .pipe(gulp.dest('../dist/css/'))
    .pipe(browserSync.stream());
});

/**
 * Styles du maintenace
 */
gulp.task('styles-maintenance', function () 
{
    console.log("----------- Styles de la maintenance -----------");
    return gulp.src(appStyles.get(3).src)
    .pipe(sass())
    .pipe(autoprefixer("> 4%"))
    .pipe(csso())
    .pipe(concat(appStyles.get(3).name + '.min.css'))
    .pipe(gulp.dest('../dist/css/'))
    .pipe(browserSync.stream());
});

/**
 * Styleguide
 */
gulp.task('styleguide', function () 
{
    console.log("----------- Styleguide -----------");
    console.log("--> création du fichier styleguide.html");
    return gulp.src(styleguideConf.configPath)        
    .pipe(styledown({
        config: styleguideConf.configPath,
        filename: styleguideConf.filename
    }))
    .pipe(gulp.dest(styleguideConf.primaryDest))
    .on('finish', function () {

        console.log("--> créations des fichiers de composants");
        gulp.src(styleguideConf.componentsPath)
        .pipe(foreachFiles(function (stream, file) {        
            var filePath = file.path;
            var filename = filePath.replace(/^.*[\\\/]/, '').replace('.md', '');
            console.log('--> création du fichier '+ filename + '.html');
            return stream
                .pipe(styledown({
                    config: styleguideConf.configPath,
                    filename: filename + '.html'
                }))
        }))
        .pipe(gulp.dest(styleguideConf.componentsDest));
    
        browserSync.reload();
    });

});

/**
 * JS
 */
gulp.task('scripts', function () 
{
    console.log("----------- Scripts -----------");
    console.log('--> création de '+scriptsConf.filename+'.js + sourcemaps');
    return gulp.src(scriptsConf.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: [babelpresetenv]
    }))
    .pipe(concat(scriptsConf.filename+'.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(scriptsConf.destPath))
    .on('finish', function () {
        console.log('--> création de ' + scriptsConf.filename + '.min.js ');
        gulp.src(scriptsConf.destPath + '/' + scriptsConf.filename + '.js')
        .pipe(rename({ extname: '.min.js' }))
        .pipe(uglify({
            mangle: true,
            compress: {
                sequences: true, // join consecutive statemets with the “comma operator”
                dead_code: true, // discard unreachable code
                conditionals: true, // optimize if-s and conditional expressions
                booleans: true, // optimize boolean expressions
                unused: true, // drop unused variables/functions
                if_return: true, // optimize if-s followed by return/continue
                join_vars: true, // join var declarations
                drop_console: true // drop console
            }
        }))
        .pipe(gulp.dest(scriptsConf.destPath));
        browserSync.reload();
    });
});

/**
 * SVG Sprite
 */
gulp.task('svg-sprite', function () 
{
    console.log("----------- SVG Sprite -----------");
    return gulp.src(svgConfig.src)
    .pipe(svgSprite(svgConfig.svgSprite))
    .pipe(gulp.dest(svgConfig.dest))
    .on('finish', () => { browserSync.reload(); });
});

/**
 * Default task
 */
gulp.task('default', 
    [
        'browser-sync', 
        'svg-sprite', 
        'styles-project', 
        'styles-maintenance', 
        'styles-styleguide', 
        'scripts', 
        'styleguide'
    ], 
    function () {

        //Sass project
        gulp.watch([
            '../src/config/*.scss',
            '../src/elements/*.scss',
            '../src/layout/general.scss',
            '../src/utils/*.scss',
            '../src/components/**/*.scss',
            '../src/pages/**/*.scss',
        ], ['styles-project']);

        //Sass maintenance
        gulp.watch([
            '../src/layout/maintenance.scss',
        ], ['styles-maintenance']);

        //Sass styleguide
        gulp.watch([
            '../src/layout/styleguide.scss',
        ], ['styles-styleguide']);

        //JS
        gulp.watch([
            '../src/*.js',
            '../src/**/*.js',
            '../src/**/**/*.js'
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
        ], ['svg-sprite']);

        //PHP files browsersync reload
        gulp.watch([
            '../*.php',
            '../template/*.php',
            '../template/**/*.php',
            '../src/components/**/*.php'
        ], browserSync.reload);
});