// Load plugins and declare variables
var gulp = require("gulp"),
    del = require("del"),
    plumber = require("gulp-plumber"),
    notify = require("gulp-notify"),
    sourcemaps = require("gulp-sourcemaps"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass"),
    combinemq = require("gulp-combine-mq"),
    autoprefixer = require("gulp-autoprefixer"),
    minify = require("gulp-minify-css");

gulp.task("styles", [ "clean" ], function() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sourcemaps.init())
        .pipe(sass({ sourceMap: true }))
        .pipe(combinemq())
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/styles"));
});

gulp.task("clean", function() {
    return del("dist");
});

gulp.task("watch", function() {
    gulp.watch("src/scss/**/*.scss", [ "styles" ]);
});

gulp.task("default", [ "styles" ]);
