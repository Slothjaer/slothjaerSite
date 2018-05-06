var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');
var env,
	jsSources,
	sassSources,
	htmlSources,
	sassStyle,
	outputDir;

env = process.env.NODE_ENV || 'development';
if (env === 'development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

jsSources = [
	'components/scripts/layout.js',
	'components/scripts/jqloader.js'
]
sassSources = ['components/sass/style.scss'];
htmlSources = [outputDir+'*.html'];

gulp.task('log', function() {
	gutil.log(sassStyle);
});
gulp.task ('js', function() {
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify())
		.pipe(gulp.dest(outputDir+'js'))
		.pipe(connect.reload())
});

gulp.task ('sass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: outputDir+'images',
			style: sassStyle
		})
		.on('error', gutil.log))
		.pipe(gulp.dest(outputDir+'css'))
		.pipe(connect.reload());
});
gulp.task ('watch', function () {
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/*.scss', ['sass']);
	gulp.watch(htmlSources, ['html']);
});

gulp.task ('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task ('html', function () {
	gulp.src(htmlSources)
		.pipe(connect.reload())
})
gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch', 'log']);