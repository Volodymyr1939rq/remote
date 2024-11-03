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
gulp.task('js',function(){
    return gulp
    .src('./src/js/*.js')
    .pipe(plumber('JS'))
    .pipe(babel())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./dist/js'))
})
gulp.task('clean',function(done){
    if(fs.existsSync('./dist/')){
        return gulp
        .src('./dist/',{read:false})
        .pipe(clean({force:true}));
    }
    done();
})

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

gulp.task('updatePaths', function() {
    return gulp.src('./dist/*.html')
    .pipe(replace(/\.\/?(img\/)/g, '/$1'))
    .pipe(replace(/%20/g, ''))
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
    open:true
}
gulp.task('startServer',function(){
    return gulp
    .src('./dist/')
    .pipe(server(ServerOptions));

})
gulp.task('watch',function(){
    gulp.watch('./src/scss/**/*.scss',gulp.parallel('sass'));
    gulp.watch('./src/**/*.html',gulp.parallel('IncludeFiles','updatePaths'));
    gulp.watch('./src/img/**/*',gulp.parallel('copyImages','updatePaths'));
    gulp.watch('./src/js/**/*.js',gulp.parallel('js'));
})

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('IncludeFiles', 'sass', 'copyImages', 'js'),
    gulp.parallel('updatePaths', 'startServer', 'watch')
));

