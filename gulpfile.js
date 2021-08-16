// 导入
let {src,dest,watch} = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
// const htmlmin = require('gulp-htmlmin');
// const imagemin = require('gulp-imagemin');
// const rename = require('gulp-rename');
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin');

// 任务
// 复制
function fnCopyIndex(){
    return src('./src/index.html')
    .pipe(dest('./dist'));
}
// lib
function fnLib(){
    return src('./src/lib/*')
    .pipe(dest('./dist/lib'));
}
// css
function fnCss(){
    return src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    // .pipe(cssnano()) 
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'));
}
// js
function fnJs(){
    return src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    // 合并成同一个。但是不好，所有还是重命名比较好
    // .pipe(concat('index.min.js'))
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'));
}
// html
function fnPage(){
     return src('./src/page/*.html')
     .pipe(htmlmin())
     .pipe(dest('./dist/page'));
}
// img
function fnImg(){
    return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'))
}
// watch
function fnWatch(){
    watch('./src/index.html',fnCopyIndex);
    watch('./src/img/*',fnImg);
    watch('./src/js/*.js',fnJs);
    watch('./src/page/*.html',fnPage);
    watch('./src/sass/*.scss',fnCss);
    watch('./src/lib/*',fnLib);
}

// 导出
exports.copyIndex = fnCopyIndex;
exports.css = fnCss;
exports.js = fnJs;
exports.html = fnPage;
exports.img = fnImg;
exports.lib = fnLib;
exports.default = fnWatch;
