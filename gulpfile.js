var gulp = require('gulp'),
	gutil = require('gulp-util'),
	compass = require('gulp-compass'),
	connect = require('gulp-connect'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyHTML = require('gulp-minify-html'),
	imageMin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush'),
	browserify = require('gulp-browserify'),
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
	'components/scripts/jqloader.js',
	'components/scripts/layout.js'
	
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
		.pipe(gulpif(env === 'production', uglify()))
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
	gulp.watch('builds/development/*.html', ['html']);
	gulp.watch('builds/development/images/**/*.*', ['images']);
});

gulp.task ('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task ('html', function () {
	gulp.src('builds/development/*.html')
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload())
});

gulp.task ('images', function () {
	gulp.src('builds/development/images/**/*.*')
		.pipe(gulpif(env === 'production', imageMin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [pngcrush()]
		})))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
		.pipe(connect.reload())
});	
	
gulp.task('default', ['html', 'js', 'sass', 'images', 'connect', 'watch', 'log']);