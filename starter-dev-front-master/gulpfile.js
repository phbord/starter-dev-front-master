// ***************************************************************
// ********************** V A R I A B L E S **********************
// ***************************************************************

// LIBRARIES -----------------------------------------------------
const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const twig = require('gulp-twig');
const svgSprite = require('gulp-svg-sprites');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require( 'gulp-plumber' );
const ts = require('gulp-typescript');
const tslint = require("gulp-tslint");
const sassLint = require('gulp-sass-lint');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const sourcemaps = require('gulp-sourcemaps');

// PATH ----------------------------------------------------------
const src = './src';
const dist = './dist';
const assets = src + '/assets';

// ERROR ---------------------------------------------------------
const errorHandler = r => {
	notify.onError( '\n\n❌  ===> ERROR: <%= error.message %>\n' )( r );
	beep();
};

// LOG -----------------------------------------------------------
const consoleReload = function (msg) {
    console.log('==> ' + msg + ' reload');
};

// TS ------------------------------------------------------------
//const tsProject = ts.createProject('tsconfig.json');
const tsProject = ts.createProject('tsconfig.json'/*,  {
    typescript: require('typescript')
}*/);




// ***************************************************************
// *************************** T A S K S *************************
// ***************************************************************

// SPRITE SVG ----------------------------------------------------
gulp.task('svg', function() {
    return gulp
        .src(assets + '/images/svg/*.svg')
        .pipe(svgSprite({
            selector: "icon-%f",
            mode: "symbols"
        }))
        .pipe(gulp.dest(dist + '/assets/svg/'));
});

// IMAGE ---------------------------------------------------------
const taskImage = gulp
    .src(assets + '/images/images/*.+(png|jpg|gif)')
    .pipe(gulp.dest(dist + '/assets/images/'));

gulp.task('image', function() {
    del.sync([dist + '/assets/images/']);

    return taskImage;
});

// IMAGEMIN ------------------------------------------------------
gulp.task('imagemin', function() {
    del.sync([dist + '/assets/images/']);
    consoleReload('IMAGEMIN');

    return gulp
        .src(assets + '/images/images/*.+(png|jpg|gif)')
        .pipe(changed(dist + '/assets/images'))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest(dist + '/assets/images/'));
});

// SASS DEV ------------------------------------------------------
sass.compiler = require('node-sass');
gulp.task('sass', function () {
    del.sync([dist + '/assets/css']);

    return gulp
        .src(assets + '/scss/**/*.scss')
        .pipe(plumber(() => { notify.onError( '\n\n❌  ===> SASS ERROR %>\n' ) }))
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            //browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest(dist + '/assets/css/'));
});

// SASS PROD -----------------------------------------------------
sass.compiler = require('node-sass');
gulp.task('sass-build', function () {
    del.sync([dist + '/assets/css']);

    return gulp
        .src(assets + '/scss/**/*.scss')
        .pipe(plumber(() => { notify.onError( '\n\n❌  ===> SASS ERROR %>\n' ) }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename(function (path) {
            path.basename += ".min";
        }))
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dist + '/assets/css/'));
});

// TYPESCRIPT CONCAT ---------------------------------------------
gulp.task('concat', function() {
    return gulp
        .src(assets + '/ts/**/*.ts')
        .pipe(concat('main.ts'))
        .pipe(gulp.dest(dist + '/assets/js/'));
});

// TYPESCRIPT DEV ------------------------------------------------
gulp.task('ts', function() {
    del.sync([dist + '/assets/js']);

    return tsProject
        .src()
        .pipe(plumber(errorHandler))
        .pipe(concat('main.ts'))
        .pipe(tsProject())
        .pipe(gulp.dest(dist + '/assets/js/'));
});

// TYPESCRIPT PROD -----------------------------------------------
gulp.task('ts-build', function() {
    del.sync([dist + '/assets/js']);

    return tsProject
        .src()
        .pipe(concat('main.ts'))
        .pipe(tsProject())
        .pipe(sourcemaps.write('./'))
        .pipe(uglify())
        .pipe(rename(function(path) { path.basename += ".min"; }))
        .on('error', function(err) {
            console.log(err.stack);
            this.emit('end');
        })
        .pipe(gulp.dest(dist + '/assets/js/'));
});

// HTML ----------------------------------------------------------
gulp.task('html', function () {
    del.sync([dist + '/html']);
    
    return gulp
        .src(src + '/twig/pages/*.twig')
        .pipe(twig({}))
        .pipe(gulp.dest(dist + '/html'));
});

// SASSLINT ------------------------------------------------------
gulp.task('sasslint', function () {
    del.sync([dist + '/assets/css']);

    return gulp
        .src(assets + '/scss/**/*.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

// TSLINT --------------------------------------------------------
gulp.task("tslint", function () {
    del.sync([dist + '/assets/js']);

    return gulp
        .src("assets + '/ts/**/*.ts'")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }));
});

// CLEAN DIST ----------------------------------------------------
gulp.task('clean', cb => {
    (async () => {
        const deletedPaths = await del(dist + '/*');
        console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
    })();
    cb();
});

// CLEAN DIST ----------------------------------------------------
gulp.task('clean-node', cb => {
    (async () => {
        const deletedPaths = await del('./node_modules/@types');
        const deletedPaths2 = await del('./node_modules');
        console.log('Deleted node_modules directory:\n', deletedPaths.join('\n'));
    })();
    cb();
});




// ***************************************************************
// ********************** L A U N C H E R S **********************
// ***************************************************************

gulp.task('run', gulp.series([
    'svg',
    'imagemin',
    'sass',
    'ts',
    'html'
]));

gulp.task('build', gulp.series([
    'svg',
    'imagemin',
    'sass-build',
    'ts-build',
    'html'
]));

gulp.task('watch', function() {
    gulp.watch(assets + '/images/svg/*.svg', gulp.series('svg'));
    gulp.watch(assets + '/images/images/*.+(png|jpg|gif)', gulp.series('image'));
    gulp.watch(assets + '/scss/**/*.scss', gulp.series('sass'));
    gulp.watch(assets + '/ts/**/*.ts', gulp.series('concat'));
    gulp.watch(src + '/twig/**/*.twig', gulp.series('html'));
    gulp.watch(assets + '/scss/**/*.scss', gulp.series('sasslint'));
    gulp.watch(assets + '/ts/**/*.ts', gulp.series('tslint'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: dist,
        browser: 'chrome',//for Windows
        //browser: 'google chrome',//for MAC
        directory: true,
        open: true,
        stream: true
    });
    gulp.watch(assets + '/images/svg/*.svg', gulp.series('svg')).on('change', function() { 
        browserSync.reload();
        consoleReload('SVG');
    });
    gulp.watch(assets + '/images/images/*.+(png|jpg|gif)', gulp.series('image')).on('change', function() { 
        browserSync.reload();
        consoleReload('IMAGES');
    });
    gulp.watch(assets + '/scss/**/*.scss', gulp.series('sass')).on('change', function() { 
        browserSync.reload();
        consoleReload('SCSS');
    });
    gulp.watch(assets + '/ts/**/*.ts', gulp.series('ts')).on('change', function() { 
        browserSync.reload();
        consoleReload('TS');
    });
    gulp.watch(src + '/twig/**/*.twig', gulp.series('html')).on('change', function() { 
        browserSync.reload();
        consoleReload('TWIG');
    });
    gulp.watch(assets + '/scss/**/*.scss', gulp.series('sasslint')).on('change', function() { 
        browserSync.reload();
        consoleReload('SCSS LINT');
    });
    gulp.watch(assets + '/ts/**/*.ts', gulp.series('tslint')).on('change', function() { 
        browserSync.reload();
        consoleReload('TS LINT');
    });

    return taskImage;
});

