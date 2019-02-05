/**
 * Charger les dépendances
 */

const { src, dest, task, series, parallel, watch, lastRun, registry } = require('gulp');
const sass                                         = require('gulp-sass');
const csso                                         = require('gulp-csso');
//const autoprefixer                                 = require('gulp-autoprefixer');
const concat                                       = require('gulp-concat');
const uglify                                       = require('gulp-uglify-es').default;
const plumber                                      = require('gulp-plumber');
const rename                                       = require('gulp-rename');
const styledown                                    = require('gulp-styledown');
const flatmap                                      = require('gulp-flatmap');
const svgSprite                                    = require('gulp-svg-sprite');
const sourcemaps                                   = require('gulp-sourcemaps');
const browserSync                                  = require('browser-sync');
const bs                                           = browserSync.create();
const browserify                                   = require('browserify');
const babelify                                     = require('babelify');
const babel                                        = require('gulp-babel');
const buffer                                       = require('vinyl-buffer');
const source                                       = require('vinyl-source-stream');


const postcss              = require('gulp-postcss');
const cssnano              = require('gulp-cssnano');
const autoprefixer         = require('autoprefixer');
const postcssEasyImport    = require('postcss-easy-import');
const postcssPresetEnv     = require('postcss-preset-env');
const postcssEasings       = require('postcss-easings');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssSprites       = require('postcss-sprites');
const postcssNested        = require('postcss-nested');
const clone                = require('gulp-clone');
const merge = require('merge-stream');
const ignore = require('gulp-ignore');

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
    browsersync: {
        proxy: "dfwp.local",
        host: "192.168.0.27",
        open: false,
        notify: false,
        minify: false,
        logLevel: "info",
        injectChanges: true
    },
    styles: {
        name: 'index',                        
        src: [path.src + '/config/loader.css'],
        dest: path.dist + '/css',
        postcss: {
            plugins: [
                postcssEasyImport,
                postcssNested,
                postcssEasings,
                postcssFlexbugsFixes,
                postcssSprites({
                    spritePath: path.dist + '/svg/',
                }),
                postcssPresetEnv({
                    stage: 1,
                    browsers: ['last 2 versions', 'ie 11', '>= 1%']
                })
            ], 
        },
        cssnano: {
            optimisations: {
                discardComments: { 
                    removeAll: true 
                } 
            } 
        }
    },
    scripts: {
        name: 'bundle',
        dest: path.dist + '/js',
        browserify: {
            'entries': path.src + '/config/main.js',
            'debug': true //Enable sourcemaps 
        },
        babelify: {
            sourceType: 'unambiguous',
            presets: [
                ["@babel/preset-env",
                    {
                        useBuiltIns: "entry",
                        targets: {
                            ie: "11"
                        }
                    }
                ]
            ],
        },
        uglify: {
            mangle: true,
            compress: {
                sequences: true,   // join consecutive statemets with the “comma operator”
                dead_code: true,   // discard unreachable code
                conditionals: true,   // optimize if-s and conditional expressions
                booleans: true,   // optimize boolean expressions
                unused: true,   // drop unused variables/functions
                if_return: true,   // optimize if-s followed by return/continue
                join_vars: true,   // join var declarations
                drop_console: true    // drop console
            }
        }
    },
    styleguide: {
        style: {
            name: 'styleguide',
            src: path.src + '/layout/styleguide.scss',
            dest: path.dist + '/css'
        },
        filename: 'styleguide.html',              //Nom du fichier généré
        markdown: path.styleguide + '/config.md',   //Chemin du fichier de config markdown
        src: {
            styles: [
                path.src + '/config/*.scss',
                path.src + '/elements/*.scss',
                path.src + '/utils/*.scss',
                path.src + '/elements/*.md'
            ],
            components: path.src + '/components/**/*.md'  //Chemin des fichiers markdown des composants
        },
        components: {
            dest: path.styleguide + '/components'  //Dossier de destination des composants
        }
    },
}

/**
 * Initialisation de browser sync
 */
task('serve', (cb) => {
    bs.init(config.browsersync);
    cb();
})
const serve = task('serve');

/**
 * Browser sync reload
 */
bsReload = (cb) => {
    bs.reload();
    cb();
}

/**
 * Styles task
 * @todo : tester { since: lastRun(styles) }
 */
task('styles', () => {
    return src(config.styles.src, { since: lastRun(styles), sourcemaps: true })

        //Postcsss
        .pipe(postcss(config.styles.postcss.plugins))

        //Rename file
        .pipe(rename({ basename: config.styles.name }))    

        //Output dest with sourcemaps
        .pipe(dest(path.dist + '/css/', { sourcemaps: '.' }))

        //Remove sourcemaps from stream
        .pipe(ignore.exclude(config.styles.name + '.css.map'))

        //Rename 
        .pipe(rename({ extname: '.min.css' }))

        //Compressor
        .pipe(cssnano(config.styles.cssnano.optimisations))

        //Output dest
        .pipe(dest(path.dist + '/css/'))

        //Stream to browsersync
        .pipe(bs.stream());
})
const styles = task('styles');

//Ajouter une tache de clean du répertoire dist


/**
 * Scripts task
 */
task('scripts', () => {

    //Browserify lets you require('modules') in the browser
    return browserify(config.scripts.browserify)

        //Transform source code before parsing with Babel
        .transform(babelify.configure(config.scripts.babelify))

        //Bundle the files and their dependencies into a single javascript file
        .bundle()

        //Convert the readable stream you get from browserify to vinyl stream that is what gulp is expecting to get.
        .pipe(source(config.scripts.name + '.js'))

        //Buffer stream
        .pipe(buffer())

        //Output dest
        .pipe(dest(config.scripts.dest))

        //Rename 
        .pipe(rename({ extname: '.min.js' }))
        
        //Compressor
        .pipe(uglify(config.scripts.uglify))

        //Output dest
        .pipe(dest(config.scripts.dest))

        //Stream to browsersync
        .pipe(bs.stream());
});
const scripts = task('scripts');

/**
 * Watcher
 * @todo : watch gulfile itself
 */
const watcher = () => {

    //Watch styles
    watch([
        '../src/*.css',
        '../src/**/*.css',
        '../src/**/**/*.css',
        '../src/**/**/**/*.css',
    ], styles);

    //Watch scripts
    watch([
        '../src/*.js',
        '../src/**/*.js',
        '../src/**/**/*.js'
    ], scripts);
}

/**
 * Default task
 */
task('default', parallel(
    serve,
    watcher,
));

