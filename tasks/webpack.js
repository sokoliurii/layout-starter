import gulp from 'gulp';
import uglify from 'gulp-uglify';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

import { dest } from './default';

const isDevelopment = process.env.NODE_ENV;



gulp.task('webpack', function () {
  gulp.src('app/js/script.js')
    .pipe(webpackStream({
      mode: isDevelopment,
      
      output: {
        filename: 'script.js',
      },
      
      module: {
        rules: [

          // babel-loader with 'env' preset
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader'
              },
              {
                loader: 'eslint-loader',
                options: {
                  emitWarning: true
                }
              }
            ]
          }
        ]
      },

      devtool: 'inline-source-map'
    }))
    .pipe(gulp.dest(dest.webpack))
});