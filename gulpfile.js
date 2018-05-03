var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');
//var env = process.env.NODE.ENV || 'development';
var jsSources = [
	'components/scripts/layout.js',
	'components/scripts/jqloader.js'
]
var sassSources = ['components/sass/style.scss'];
var htmlSources = ['builds/development/*.html'];
gulp.task('log', function() {
	gutil.log('hello');
});
gulp.task ('js', function() {
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
		.pipe(connect.reload())
});

gulp.task ('sass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: 'builds/development/images',
			style: 'expanded'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload());
});
gulp.task ('watch', function () {
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['sass']);
	gulp.watch(htmlSources, ['html']);
});

gulp.task ('connect', function() {
	connect.server({
		root: 'builds/development/',
		livereload: true
	});
});

gulp.task ('html', function () {
	gulp.src(htmlSources)
		.pipe(connect.reload())
})
gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch']);