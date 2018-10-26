/**
 * Charger les dépendances
 */
const gulp         = require('gulp');
const sass         = require('gulp-sass');
const csso         = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const plumber      = require('gulp-plumber');
const rename       = require('gulp-rename');
const styledown    = require('gulp-styledown');
const flatmap      = require('gulp-flatmap');
const svgSprite    = require('gulp-svg-sprite');
const sourcemaps   = require('gulp-sourcemaps');
const w3ccss       = require('gulp-w3c-css');
const browserSync  = require('browser-sync').create();
const browserify   = require('browserify');
const babelify     = require('babelify');
const buffer       = require('vinyl-buffer');
const source       = require('vinyl-source-stream');

//https://www.webpagefx.com/tools/emoji-cheat-sheet/              
const emoji        = require('node-emoji');

/**
 * Path
 */
const path = {
    src: '../src',
    dist: '../dist',
    styleguide: '../styleguide'
}

/**
 * Configuration 
 */
 const config = {
    styles:{
        project:{
            name: 'index',                        //Nom du fichier généré
            src : path.src+'/config/loader.scss'
        },
        styleguide:{
            name: 'styleguide',                       //Nom du fichier généré
            src : path.src+'/layout/styleguide.scss'
        }
    },
    autoprefixer:{ 
        browsers: ['last 2 versions', 'ie 11', '>= 1%']
    },
    browsersync:{
        proxy        : "dfwp.local",
        host         : "192.168.0.27",
        open         : false,
        notify       : false,
        minify       : false,
        logLevel     : "silent",
        injectChanges: true
    },
    styleguide:{
        filename: 'styleguide.html',              //Nom du fichier généré
        markdown: path.styleguide+'/config.md',   //Chemin du fichier de config markdown
        src     : {
            styles:[
                path.src + '/config/*.scss',
                path.src + '/elements/*.scss',
                path.src + '/utils/*.scss'
            ],
            components: path.src + '/components/**/*.md'  //Chemin des fichiers markdown des composants
        },
        dest:{
            components: path.styleguide + '/components'  //Dossier de destination des composants
        } 
    },
    browserify:{
        'entries': path.src+'/config/main.js',
        'debug'    : true,
        'transform': [
            babelify.configure({
                'presets': ["@babel/preset-env"]
            })
        ]
    },
    scripts:{
        src: [
            path.src+'/utils/*.js', //utils files
            path.src+'/layout/*.js', //layout files
            path.src+'/components/**/*.js', //Components js
            path.src+'/pages/**/*.js', //Pages js
        ],
        name  : 'bundle',
        dest: path.dist+'/js',
        uglify: {
            mangle  : true,
            compress: {
                sequences   : true,   // join consecutive statemets with the “comma operator”
                dead_code   : true,   // discard unreachable code
                conditionals: true,   // optimize if-s and conditional expressions
                booleans    : true,   // optimize boolean expressions
                unused      : true,   // drop unused variables/functions
                if_return   : true,   // optimize if-s followed by return/continue
                join_vars   : true,   // join var declarations
                drop_console: true    // drop console
            }
        }
    },
    svg:{
        src: path.src+'/assets/svg/src/*.svg',
        dest: path.src+'/assets/svg/',
        sprite: {
            log  : false,
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
                xmlDeclaration     : false,
                doctypeDeclaration : false,
                dimensionAttributes: false,
                namespaceClassnames: false
            },
            mode: {
                symbol: {
                    dest  : "generated",
                    sprite: "sprite.svg",
                    render: {
                        scss: true
                    }
                }
            }
        }
    }
 }

/**
 * Browser sync
 */
gulp.task('browser-sync', () => {
    browserSync.init(config.browsersync, function () {
        console.log(emoji.emojify(' :fire: '), "Start browser-sync : " + browserSync.getOption('urls').get('external'));
        console.log(emoji.emojify(' :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: '));
    });
});

/**
 * Styles du projet
 */
gulp.task('styles-project', () => {    
    return gulp.src(config.styles.project.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))    
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(sourcemaps.write())
    .pipe(concat(config.styles.project.name + '.css'))
    .pipe(gulp.dest(path.dist+'/css/'))
    .pipe(browserSync.stream())
    .pipe(csso())
    .pipe(concat(config.styles.project.name + '.min.css'))
    .pipe(gulp.dest(path.dist+'/css/'))
    .on('finish', () => {

        //Console
        let generatedFiles = [];
        generatedFiles.push(config.styles.project.name + '.css')
        generatedFiles.push(config.styles.project.name + '.min.css')
        console.log(emoji.emojify(' :fire: '), "styles-project");
        console.log(generatedFiles);
        console.log(emoji.emojify(' :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: '));
    })
    .pipe(browserSync.stream());
});

/**
 * Styles du styleguide
 */
gulp.task('styles-styleguide', ()  => {
    return gulp.src(config.styles.styleguide.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(concat(config.styles.styleguide.name + '.min.css'))
    .pipe(gulp.dest(path.dist+'/css/'))
    .on('finish', () => {

        //Console
        let generatedFiles = [];
        generatedFiles.push(config.styles.styleguide.name + '.css')
        generatedFiles.push(config.styles.styleguide.name + '.min.css')
        console.log(emoji.emojify(' :fire: '), "styles-styleguide");
        console.log(generatedFiles);
        console.log(emoji.emojify(' :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: '));
    })
    .pipe(browserSync.stream());
});

/**
 * Styleguide
 */
gulp.task('styleguide', () => {
    let generatedFiles = [];
    generatedFiles.push(config.styleguide.filename)
    return gulp.src(config.styleguide.src.styles)        
    .pipe(styledown({
        config: config.styleguide.markdown,
        filename: config.styleguide.filename
    }))
    .pipe(gulp.dest(path.styleguide))
    .on('finish', () => {
        gulp.src(config.styleguide.src.components)
            .pipe(flatmap((stream, file) => {
                let filename = file.path.replace(/^.*[\\\/]/, '').replace('.md', '');
                generatedFiles.push(filename + '.html')
                return stream.pipe(styledown({
                    config: config.styleguide.markdown,
                    filename: filename + '.html'
                }))
            }))
            .pipe(gulp.dest(config.styleguide.dest.components))
        .on('finish', () => {

            //Console
            console.log(emoji.emojify(' :fire: '), "styleguide");
            console.log(generatedFiles);
            console.log(emoji.emojify(' :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: '));

            browserSync.reload();
        });
    });
});

/**
 * JS
 */
gulp.task('scripts', () => {    
    return browserify(config.browserify)
    .bundle()
    .pipe(source(config.scripts.name+'.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.scripts.dest))
    .on('finish', () => {
        
        //console
        let generatedFiles = [];
        generatedFiles.push(config.scripts.name + '.js')
        generatedFiles.push(config.scripts.name + '.js.map')

        gulp.src(config.scripts.dest + '/' + config.scripts.name + '.js')
        .pipe(rename({ extname: '.min.js' }))
        .pipe(uglify(config.scripts.uglify))
        .pipe(gulp.dest(config.scripts.dest))
        .on('finish', () => {

            //Console
            generatedFiles.push(config.scripts.name + '.min.js')
            console.log(emoji.emojify(' :fire: '), "scripts");
            console.log(generatedFiles);
            console.log(emoji.emojify(' :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: '));
        })
        .pipe(browserSync.stream());
    })
});

/**
 * SVG Sprite
 */
gulp.task('svg-sprite', () => {
    return gulp.src(config.svg.src)
    .pipe(svgSprite(config.svg.sprite))
    .pipe(gulp.dest(config.svg.dest))
    .on('finish', () => { 
        console.log(emoji.emojify(' :fire: '), "svg-sprite");
        console.log(['sprite.svg','sprite.scss']);
        console.log(emoji.emojify(' :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: '));
        browserSync.reload(); 
    });
});

gulp.task('w3ccss',() => {
    console.log(emoji.emojify(' :fire: '), "w3ccss");
    return gulp.src(path.dist + '/css/'+ config.styles.project.name + '.css')
        .pipe(w3ccss())
        .pipe(flatmap((stream, file) => {
            if (file.contents.length == 0) {
                console.log(emoji.emojify(' :clap: :facepunch:  :punch: ') + 'w3ccss validate');
            }else{  
                let results = JSON.parse(file.contents.toString());
                results.errors.forEach( (error) => {
                    console.log(emoji.emojify(' :x: ') + ' Error ' + config.styles.project.name + '.css line ' + error.line + ' : '+ error.message);
                    console.log(emoji.emojify(' :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: '));
                });
                results.warnings.forEach( (warning) => {
                    console.log(emoji.emojify(' :warning: ') + ' Warning ' + config.styles.project.name + '.css line ' + warning.line + ' : ' + warning.message);
                    console.log(emoji.emojify(' :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: :heavy_minus_sign: '));
                });
            }
            return stream;
        }));
});

/**
 * Default task
 */
gulp.task('default', 
    [
        'browser-sync', 
        'svg-sprite', 
        'styles-project', 
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

        //Sass styleguide layout
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
            '../src/components/**/*.md',
            '../src/config/*.scss',
            '../src/elements/*.scss',
            '../src/utils/*.scss'
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
            '../template/*.php',
            '../src/components/**/*.php'
        ], browserSync.reload);
});