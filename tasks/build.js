import gulp from 'gulp';



gulp.task('build', ['assets', 'fonts', 'webpack', 'sprite', 'styles', 'images', 'views']);
