import gulp from 'gulp';



gulp.task('default', ['build', 'browser-sync', 'watch']);

export const dest = {
		assets: 'public',
		clean: 'public',
		fonts: 'public/fonts',
		images: 'public/img',
		styles: 'public/css',
		views: 'public',
		webpack: 'public/js',
};