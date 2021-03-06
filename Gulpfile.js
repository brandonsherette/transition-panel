'use strict';

var gulp = require('gulp'),
    jshintStylish = require('jshint-stylish'),
    plugins = require('gulp-load-plugins')();
  
 
gulp.task('default', ['watch'], function(){
  console.log('Default Gulp Actions Completed!');
});

gulp.task('watch', ['jshint', 'sass'], function(){
  gulp.watch('src/**/*.js', ['build']);
  gulp.watch('src/**/*.scss', ['build']);
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
    .pipe(plugins.yuidoc({
      "name": "Transition Panel Plugin API",
      "description": "The Transition Panel Plugin API - Transition panels based on button clicks or via JavaScript.",
      "version": "1.0.4",
      "url": "http://github.com/bsherette/transition-panel"
  }, {
    "themedir": "node_modules/yuidoc-bootstrap-theme",
    "helpers": ["node_modules/yuidoc-bootstrap-theme/helpers/helpers.js"]
  }))
    .pipe(gulp.dest('api-docs'));
});

gulp.task('build', ['jshint', 'sass'], function(){
  gulp.src('src/**/*')
    .pipe(gulp.dest('dist'));
  
  // minify the js code
  gulp.src('src/*.js')
    .pipe(plugins.concat('transition-panel.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist'));
});