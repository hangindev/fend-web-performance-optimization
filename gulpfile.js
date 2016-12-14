var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify');

// Pizza images task
// Compress
gulp.task('image', function(){
    gulp.src('views/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('views/dist/images'));
});

// Other images task
// Compress
gulp.task('img', function(){
    gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('compress', function (cb) {
      gulp.src('views/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('views/minjs'));
});
