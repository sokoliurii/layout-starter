import gulp from 'gulp';
import browserSync from 'browser-sync';

import { dest } from './default';



gulp.task('fonts', () => {
	gulp.src('app/fonts/**/*.{ttf,woff,woff2,svg,eot,otf}')
		.pipe(gulp.dest(dest.fonts))
    browserSync.reload();
});
