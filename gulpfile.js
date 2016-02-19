var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var path = require('path');

gulp.task('sass', function(){
	gulp.src('public/assets/css/style.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('public/assets/css'));
});

gulp.task('watch', function(){
	gulp.watch('public/assets/css/*.scss', ['sass']);
});

gulp.task('styles', function(){
  return gulp.src('public/assets/css/*.scss')
  .pipe(sass({ style: 'expanded', loadPath: [ path.join( __dirname , 'public/assets/css') ] }))
  .pipe(gulp.dest('public/assets/css'))
});

gulp.task('default', ['sass', 'watch', 'styles']);
