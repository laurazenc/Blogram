var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
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
	gulp.watch('server/**/*.jade', ['jade']);
});

gulp.task('styles', function(){
  return gulp.src('public/assets/css/*.scss')
  .pipe(sass({ style: 'expanded', loadPath: [ path.join( __dirname , 'public/assets/css') ] }))
  .pipe(gulp.dest('public/assets/css'))
});

gulp.task('jade', function(){
  return gulp.src('server/views/*.jade')
	.pipe(jade({
        pretty: true
    }))
  .pipe(gulp.dest('server/views'))
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('default', ['start', 'sass', 'watch', 'styles']);
