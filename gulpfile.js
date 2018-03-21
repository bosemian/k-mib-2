const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const minifyHTML = require("gulp-minify-html");

// Compile Sass & Inject Into Browser
gulp.task("sass", function() {
  return gulp
    .src(["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"])
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("html", function() {
  return gulp
    .src("src/*.html")
    .pipe(minifyHTML())
    .pipe(gulp.dest("./dist"));
});

// Move JS Files to src/js
gulp.task("js", function() {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js"
    ])
    .pipe(gulp.dest("./dist/js"))
    .pipe(sourcemaps.write())
    .pipe(browserSync.stream());
});

// Move Fonts to src/fonts
gulp.task("fonts", function() {
  return gulp
    .src("node_modules/font-awesome/fonts/*")
    .pipe(gulp.dest("./dist/fonts"));
});

// Move Font Awesome CSS to src/css
gulp.task("fa", function() {
  return gulp
    .src("node_modules/font-awesome/css/font-awesome.min.css")
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("images", function() {
  return gulp.src(["src/images/**/*"]).pipe(gulp.dest("./dist/images"));
});

gulp.task("default", ["sass", "html", "js", "serve", "fa", "fonts", "images"]);

// Watch Sass & Serve
gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(
    ["node_modules/bootstrap/scss/bootstrap.scss", "src/scss/*.scss"],
    ["sass"]
  );
  gulp.watch("src/images/**/*").on("change", browserSync.reload);
  gulp.watch("src/*.html").on("change", browserSync.reload);
});
