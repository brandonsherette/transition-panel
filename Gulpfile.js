'use strict';

var gulp = require('gulp'),
    jshintStylish = require('jshint-stylish'),
    plugins = require('gulp-load-plugins')();
  
 
gulp.task('default', ['watch'], function(){
  console.log('Default Gulp Actions Completed!');
});

gulp.task('watch', ['jshint', 'sass'], function(){
  gulp.watch('src/**/*.js', ['jshint']);
  gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('jshint', function(){
  return gulp.src('src/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(jshintStylish));
});

gulp.task('sass', function(){
  return gulp.src('src/styles/sass/*.scss')
    .pipe(plugins.sass())
    .pipe(gulp.dest('src/styles/'));
});

gulp.task('jsdoc', function(){
  return gulp.src('src/**/*.js')
    .pipe(plugins.yuidoc.parser())
  }))
    .pipe(gulp.dest('api-docs'));
});

gulp.task('build', ['jshint', 'sass'], function(){
  gulp('src/**/*')
    .pipe(gulp.dest('dist'));
});