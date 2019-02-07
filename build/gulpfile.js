/**
 * @todo
 * - Ajouter une tache de clean du répertoire dist
 * - clean des dépendances
 * - vérifier le browsersync.stream()
 * - watch du gulpfile itself
 */

// const sass                                         = require('gulp-sass');
// const csso                                         = require('gulp-csso');
// const autoprefixer                                 = require('gulp-autoprefixer');
// const plumber                                      = require('gulp-plumber');
// const svgSprite                                    = require('gulp-svg-sprite');
// const sourcemaps                                   = require('gulp-sourcemaps');
// const babel                                        = require('gulp-babel');
const { src, dest, task, series, parallel, watch } = require('gulp');
const uglify                                       = require('gulp-uglify-es').default;
const concat                                       = require('gulp-concat');
const rename                                       = require('gulp-rename');
const styledown                                    = require('gulp-styledown');
const flatmap                                      = require('gulp-flatmap');
const browserSync                                  = require('browser-sync');
const bs                                           = browserSync.create();
const browserify                                   = require('browserify');
const babelify                                     = require('babelify');
const buffer                                       = require('vinyl-buffer');
const source                                       = require('vinyl-source-stream');
const postcss                                      = require('gulp-postcss');
const cssnano                                      = require('gulp-cssnano');
const autoprefixer                                 = require('autoprefixer');
const postcssEasyImport                            = require('postcss-easy-import');
const postcssPresetEnv                             = require('postcss-preset-env');
const postcssEasings                               = require('postcss-easings');
const postcssFlexbugsFixes                         = require('postcss-flexbugs-fixes');
const postcssSprites                               = require('postcss-sprites');
const postcssNested                                = require('postcss-nested');
const postcssMixins                                = require('postcss-mixins');
const postcssCalc                                  = require('postcss-calc');
const mergestream                                  = require('merge-stream');
const ignore                                       = require('gulp-ignore');

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
        proxy: "dfwp.local", // Using a vhost-based url
        host: "192.168.0.27", // Override host detection if you know the correct IP to use
        open: false, // Stop the browser from automatically opening
        notify: false, // Don't show any notifications in the browser.
        minify: false, // Don't minify the client-side JS
        logLevel: "info", //log level info / debug / warn / silent,
    },
    styles: {
        name: 'index',                        
        src: [path.src + '/loader/loader.css'],
        dest: path.dist + '/css',
        postcss: {
            plugins: [
                postcssEasyImport,
                postcssMixins,
                postcssNested,
                postcssEasings,
                postcssFlexbugsFixes,
                postcssCalc,
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
            'entries': path.src + '/loader/main.js',
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
            src: path.src + '/layout/styleguide/styleguide.css',
            dest: path.dist + '/css'
        },
        filename: 'styleguide.html',              //Nom du fichier généré
        markdown: path.styleguide + '/config.md',   //Chemin du fichier de config markdown
        elements:{
            src: path.dist + '/css/index.css',
        },
        components: {
            src: path.src + '/components/**/*.md',  //Chemin des fichiers markdown des composants
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
task('reload', (cb) => {
    bs.reload();
    cb();
})
const reload = task('reload');

/**
 * Styles task
 * 
 */
task('styles', () => {
    return src(config.styles.src, { sourcemaps: true })

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
})
const styles = task('styles');


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
        .pipe(dest(config.scripts.dest));
});
const scripts = task('scripts');


/**
 * Générer les éléments du styleguide
 */
task('styleguide', () => {

    let style = src(config.styleguide.style.src)
        .pipe(postcss(config.styles.postcss.plugins))
        .pipe(rename({ basename: config.styleguide.style.name }))
        .pipe(dest(path.dist + '/css/'))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(cssnano(config.styles.cssnano.optimisations))
        .pipe(dest(path.dist + '/css/'));

    let elements = src(config.styleguide.elements.src)
        .pipe(styledown({
            config: config.styleguide.markdown,
            filename: config.styleguide.filename
        }))
        .pipe(dest(path.styleguide));
    
    let components = src(config.styleguide.components.src)
        .pipe(flatmap((stream, file) => {
            let filename = file.path.replace(/^.*[\\\/]/, '').replace('.md', '');
            return stream.pipe(styledown({
                config: config.styleguide.markdown,
                filename: filename + '.html'
            }))
        }))
        .pipe(dest(config.styleguide.components.dest));
    
    let mergedstream = mergestream(elements, components);
    mergedstream.add(style);
    return mergedstream;
});
const styleguide = task('styleguide');


/**
 * Watcher
 */
task('watcher', (cb) => {

    //Watch styles
    watch([
        '../src/loader/*.css',
        '../src/elements/*.css',
        '../src/components/**/*.css',
        '../src/layout/default/*.css',
        '../src/pages/**/*.css',
    ], { events: 'all', ignoreInitial: false }, series(styles, reload)); 

    //Watch scripts
    watch([
        '../src/*.js',
        '../src/**/*.js',
        '../src/**/**/*.js'
    ], { events: 'all', ignoreInitial: false }, series(scripts, reload));

    //Watch styleguide files
    watch([
        config.styleguide.style.src,
        '../src/loader/*.css',
        '../src/elements/*.css',
        '../src/components/**/*.css',
        '../src/layout/default/*.css',
        '../src/pages/**/*.css',
        '../styleguide/config.md',
        '../src/components/**/*.md',
    ], { events: 'all', ignoreInitial: false }, series(styleguide, reload));

    //Watch PHP files
    watch([
        '../*.php',
        '../template/*.php',
        '../template/*.php',
        '../src/components/**/*.php'
    ], { events: 'all', ignoreInitial: false }, reload);

    cb();
});
const watcher = task('watcher');

/**
 * Default task
 */
task('default', parallel(
    serve,
    watcher,
));

