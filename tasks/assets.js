import gulp from 'gulp';
import browserSync from 'browser-sync';

import { dest } from './default';



gulp.task('assets', () => {
  gulp.src([
  		'app/**',
  		'!app/img{,/**}',
  		'!app/js{,/**}',
  		'!app/fonts{,/**}',
  		'!app/views{,/**}',
  		'!app/css{,/**}',
  		'!app/scss{,/**}'
  		])
    .pipe(gulp.dest(dest.assets))
    browserSync.reload();
});
