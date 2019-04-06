import gulp from 'gulp';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import prettify from 'gulp-jsbeautifier';
import browserSync from 'browser-sync';

import { dest } from './default';



gulp.task('views', () => {
  gulp.src('app/views/*.pug')
	  .pipe(pug())
	  .pipe(prettify({
			braceStyle: 'expand',
			indentWithTabs: true,
			indentInnerHtml: true,
			preserveNewlines: true,
			endWithNewline: true,
			wrapLineLength: 120,
			maxPreserveNewlines: 50,
			wrapAttributesIndentSize: 1,
			unformatted: ['use']
		}))
	  .pipe(gulp.dest(dest.views))	
    browserSync.reload();
});