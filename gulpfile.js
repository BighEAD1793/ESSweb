var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var plumber = require("gulp-plumber");
var browser = require("browser-sync");

gulp.task("server", function() {
				browser({
								server: {
												baseDir: "./htdocs/"
								}
				});
});

gulp.task("js", function() {
				gulp.src("htdocs/common/_js/**/*.js")
								.pipe(plumber())
								.pipe(uglify())
								.pipe(gulp.dest("htdocs/common/js/"))
								.pipe(browser.reload({stream:true}));
});

gulp.task("sass", function() {
				gulp.src("htdocs/common/_sass/**/*.scss")
								.pipe(plumber())
								.pipe(sass())
								.pipe(gulp.dest("htdocs/common/css/"))
								.pipe(browser.reload({stream:true}));
});
gulp.task("default",['server'],function() {
				gulp.watch("htdocs/common/_js/**/*.js",["js"]);
				gulp.watch("htdocs/common/_sass/**/*.scss",["sass"]);
});
