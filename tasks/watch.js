import gulp from 'gulp';
import watch from 'gulp-watch';



gulp.task('watch', () => {
  watch(['app/**', '!app/views/', '!app/scss/', '!app/img/', '!app/js/', '!app/fonts/'], () => {
    gulp.start('assets');
  })
  watch(['app/views/**/*.pug'], () => {
    gulp.start('views');
  })
  watch(['app/scss/**/*.scss'], () => {
    gulp.start('styles');
  })
  watch('app/js/**/*.js', () => {
    gulp.start('webpack')
  })
  watch(['app/img/**/*.{png,jpg,svg,gif,json,xml,ico}', '!app/img/sprite/**/*'], () => {
    gulp.start('images')
  })
  watch('app/img/sprite/*.png', () => {
    gulp.start('sprite')
  })
});
