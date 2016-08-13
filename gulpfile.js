var gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
gulp.task('default', function() {

});
gulp.task('autoprefix', function() {
	gulp.src('app/css/app.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('app/css/prefixed/'))
});
var watcher = gulp.watch('app/css/app.css', ['autoprefix']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});