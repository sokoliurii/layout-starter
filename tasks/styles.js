import gulp from 'gulp';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';
import gulpStylelint from 'gulp-stylelint';
import browserSync from 'browser-sync';
import csso from 'gulp-csso';
import gulpIf from 'gulp-if';

import { dest } from './default';

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';



gulp.task('styles', () => {
  gulp.src('app/scss/style.scss')
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpIf(isDevelopment, sourcemaps.write('map')))
    .pipe(gulpIf(!isDevelopment, csso({
      restructure: false,
      sourceMap: false
    })))
    .pipe(gulp.dest(dest.styles))
    .pipe(browserSync.stream({
      match: '**/*.css'
    }));
});

gulp.task('styles:lint', () => {
  gulp.src('app/scss/**/*.scss')
    .pipe(gulpStylelint({
      failAfterError: false,
      reporters: [
        {
          formatter: 'verbose',
          console: true
        }
      ],
      debug: true
    }));
})