var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var sequence = require('run-sequence');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('bundle', function() {
	/*browserify('flux/app.js')
				.transform('babelify', {presets: ['es2015', 'react']})
				.bundle()
				.pipe(gulp.dest('assets/js'));*/
});

gulp.task('copy', function() {
	return gulp.src('src/**/**/*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('compile', function() {
	return gulp.src('src/**/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.js', ['compile']);
	gulp.watch('src/**/*.html', ['copy']);
	gulp.watch('client/**/*.js', ['bundle']);
});

gulp.task('start', function() {
	nodemon({
		watch: 'dist',
		script: 'dist/server.js',
		ext: 'js',
	});
});

gulp.task('default', function(callback) {
	sequence(['compile','watch', 'copy', 'bundle'], 'start', callback);
});
