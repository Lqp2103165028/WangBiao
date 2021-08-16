let {src,dest,watch} = require('gulp');
let htmlmin = require('gulp-htmlmin');
let sass = require('gulp-sass');
let cssnano = require('gulp-cssnano');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let imagemin = require('gulp-imagemin');
let babel = require('gulp-babel');
let concat = require('gulp-concat');

function fnCopyIndex(){
    return src('./src/index.html')
        .pipe(dest('./dist'));
}
function fnLib(){
    return src('./lib/*')
        .pipe(dest('./dist/lib'));
}
function fnHtml(){
    return src('./src/page/*.html')
        .pipe(htmlmin())
        .pipe(dest('./dist/page'));
}
function fnCss(){
    return src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'))
}
function fnJs(){
    return src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'))
}
function fnImage(){
    return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'))
}
function fnWatch(){
    watch('./src/index.html',fnCopyIndex);
    watch('./src/img/*',fnImage);
    watch('./src/js/*.js',fnJs);
    watch('./src/page/*.html',fnHtml);
    watch('./src/sass/*.scss',fnCss);
    watch('./src/lib/*',fnLib);
}
// 导出
exports.copyIndex = fnCopyIndex;
exports.css = fnCss;
exports.js = fnJs;
exports.html = fnHtml;
exports.img = fnImage;
exports.lib = fnLib;
exports.default = fnWatch;
