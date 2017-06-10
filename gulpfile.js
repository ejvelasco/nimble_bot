const gulp = require("gulp");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const importCss = require("gulp-import-css");
const cleanCSS = require("gulp-clean-css");
const livereload = require("gulp-livereload");

gulp.task("js", () => {
    return (
        browserify("./public/js/Nimble.js")
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source("Nimble.js"))
        .pipe(gulp.dest("./public/build/"))
        .pipe(livereload())
    );
});

gulp.task("pug-1", () => {
    gulp.src("./views/*.pug")
        .pipe(livereload());
});

gulp.task("pug-2", () => {
    gulp.src("./views/partials/*.pug")
        .pipe(livereload());
});

gulp.task("css", () => {
    gulp.src("./public/css/Nimble.css")
        .pipe(importCss())
        .pipe(cleanCSS({compatibility: "ie8"}))
        .pipe(gulp.dest("./public/build/"))
        .pipe(livereload());
});

gulp.task("watch", () => {
      livereload.listen();
      gulp.watch("./views/*.pug", ["pug-1"]);
      gulp.watch("./views/partials/*.pug", ["pug-2"]);
      gulp.watch("./public/js/*.js", ["js"]);
      gulp.watch("./public/css/*.css", ["css"]);
});

gulp.task("default", ["js", "css", "watch", "pug-1", "pug-2"]);