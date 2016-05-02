var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({ camelize: true }),
    wiredep = require('wiredep').stream,
    runSequence = require('run-sequence');

var paths = {
    src: 'app',
    tmp: '.tmp',
    dist: 'dist'
};
paths.srcStyles = paths.src + '/**/*.scss';
paths.srcCopy = [
    paths.src + '/**/*.js',
    paths.src + '/**/*.html', '!' + paths.src + '/index.html',
    paths.src + '/static/**/*'
];


gulp.task('server', function() {
    runSequence(
        'clean:dev',
        ['copy:dev', 'styles:dev'],
        'inject',
        ['connect','watch']
    );
});

gulp.task('clean:dev', function() {
     return gulp.src(paths.tmp, {read: false})
        .pipe($.clean());
});

gulp.task('styles:dev', function () {
    return gulp.src(paths.srcStyles)
        .pipe($.sass({
            outputStyle: 'expanded'
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest(paths.tmp));
});

gulp.task('copy:dev', function() {
    return gulp.src(paths.srcCopy)
        .pipe($.copy(paths.tmp, { prefix: 1 }));
});

gulp.task('inject', function () {
    return gulp.src(paths.src + '/index.html')
        .pipe($.inject(
            gulp.src([ paths.tmp + '/**/*.css' ], { read: false }),
            { addRootSlash: false, ignorePath: paths.tmp }
        ))
        .pipe($.inject(
            gulp.src([ paths.tmp + '/**/*.js', '!' + paths.tmp + '/**/*.spec.js' ])
                .pipe($.angularFilesort()),
            { addRootSlash: false, ignorePath: paths.tmp }
        ))
        .pipe(wiredep(
            { src: 'index.html' }
         ))
        .pipe(gulp.dest(paths.tmp));
});

gulp.task('connect', function() {
    return $.connect.server({
        root: paths.tmp,
        livereload: true,
        middleware: function(connect) {
            return [connect().use('/bower_components', connect.static('bower_components'))];
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(paths.srcCopy, function() {
        runSequence(
            'copy:dev',
            'reload'
        )
    });
    gulp.watch(paths.src + '/index.html', function() {
        runSequence(
            'inject',
            'reload'
        )
    });
    gulp.watch(paths.srcStyles, function() {
        runSequence(
            'styles:dev',
            'reload'
        )
    });
});

gulp.task('reload', function() {
    return gulp.src(paths.tmp + '/*.html')
        .pipe($.connect.reload());
});



/*
gulp.task('useref', function() {
    gulp.src('app/index.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});
*/



