import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import browserSync from 'browser-sync';

import { dest } from './default';
 
gulp.task('sprite', function () {
  var spriteData = gulp.src('app/img/sprite/*.png')
    .pipe(spritesmith({
        imgPath: '../img/sprite.png',
        imgName: 'sprite.png',
        cssName: 'sprite.scss'
  }));
  spriteData.pipe(gulp.dest('app/img'));
  spriteData.pipe(gulp.dest('app/scss/sprites'));
});