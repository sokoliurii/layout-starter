import gulp from 'gulp';
import clean from 'gulp-clean';

import { dest } from './default';

gulp.task('clean', () => {
  gulp.src(dest.clean)
  .pipe(clean())
});
