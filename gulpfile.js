var gulp = require('gulp'),
	browserSync = require ('browser-sync'),
	connectPhp = require ('gulp-connect-php'),
	composer = require('gulp-composer');

gulp.task('composer', function() {
	composer('install', {
		async: false
	});
});

gulp.task('php', function() {
	connectPhp.server({ base: './app', keepalive:true, open: false});
});

gulp.task('browserSync', function () {
	browserSync({
		proxy:'127.0.0.1:8000'
	});
})

gulp.task('watch', ['browserSync'], function() {
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/php/**/*.php', browserSync.reload);
	gulp.watch('app/css/**/*.css', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch', 'browserSync', 'php', 'composer']);