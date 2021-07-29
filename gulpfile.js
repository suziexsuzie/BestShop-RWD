const gulp = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require('sass');
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const bulkSass = require("gulp-sass-bulk-import");

function compileSass(done) {
    gulp
        .src("./scss/main.scss")
        .pipe(sourcemaps.init())
        .pipe(bulkSass())
        .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./css"));

    done();
}

function watcher(done) {
    browserSync.init({
        server: "./"
    });

    gulp.watch("/scss/**/*.scss", gulp.series(compileSass, reload));
    gulp.watch("/*.html", gulp.series(reload));
    gulp.watch("/js/*.js", gulp.series(reload));
    done();
}

function reload(done) {
    browserSync.reload();
    done();
}

exports.sass = gulp.parallel(compileSass);
exports.default = gulp.parallel(compileSass, watcher);
