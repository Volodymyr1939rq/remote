const gulp=require('gulp');
const fileInclude=require('gulp-file-include');
const sass = require('gulp-dart-sass');
const server=require('gulp-server-livereload');
const clean=require('gulp-clean');
const fs=require('fs');
const sourceMaps=require('gulp-sourcemaps');
const plumber=require('gulp-plumber');
const notify=require('gulp-notify');
const webpack=require('webpack-stream');
const babel=require('gulp-babel');
const replace=require('gulp-replace');
const browserSync = require('browser-sync').create();
const newer = require('gulp-newer');


const paths = {
    data: {
        src: './src/data/**/*.json',
        dest: './dist/data',
    },
};
  
gulp.task('copyJson', function () {
    return gulp
        .src(paths.data.src)
        .pipe(newer(paths.data.dest)) 
        .pipe(gulp.dest(paths.data.dest))
        .pipe(browserSync.stream());
});

gulp.task('js',function(){
    return gulp
    .src('./src/js/*.js')
    .pipe(plumber('JS'))
    .pipe(babel())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('clean', function(done) {
    if (fs.existsSync('./dist/')) {
        return gulp
            .src('./dist/', { read: false })
            .pipe(clean({ force: true }));
    }
    done();
});
const FileIncludeSetting={
    prefix:'@@',
    basepath:'@file',
};
const plumberIncludeFilesConfig={
    errorHandler:notify.onError({
        title:'HTML',
        message:'Error<%=error.message %>',
        sound:false
    }),
}
gulp.task('IncludeFiles',function(){
return gulp
.src('./src/*.html')
.pipe(plumber(plumberIncludeFilesConfig))
.pipe(fileInclude(FileIncludeSetting))
.pipe(gulp.dest('./dist/'));
});


const plumberSassConfig={
    errorHandler:notify.onError({
        title:'Styles',
        message:'Error<%=error.message %>',
        sound:false
    }),
}


gulp.task('sass',function(){
    return gulp
    
    .src('./src/scss/**/*.scss')
    .pipe(plumber(plumberSassConfig))
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./dist/css/'))
})

gulp.task('copyImages',function(){
    return gulp
    .src('./src/img/**/*')
.pipe(gulp.dest('./dist/img/'))
})

const ServerOptions={
    livereload:true,
    open:true,
}
gulp.task('startServer',function(){
    return gulp
    .src('./dist/')
    .pipe(server(ServerOptions));

})
gulp.task('watch', function() {
    
    

    // Відстеження змін у SCSS
    gulp.watch('./src/scss/**/*.scss', gulp.series('sass')).on('change', browserSync.reload);

    // Відстеження змін у HTML
    gulp.watch('./src/**/*.html', gulp.series('IncludeFiles')).on('change', browserSync.reload);

    // Відстеження змін у зображеннях
    gulp.watch('./src/img/**/*', gulp.series('copyImages')).on('change', browserSync.reload);

    // Відстеження змін у JavaScript
    gulp.watch('./src/js/**/*.js', gulp.series('js')).on('change', browserSync.reload);

   
    gulp.watch(paths.data.src, gulp.series('copyJson')).on('change', browserSync.reload);
});
gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('IncludeFiles', 'sass', 'copyImages', 'js','copyJson'),
    gulp.parallel( 'startServer', 'watch')
));

