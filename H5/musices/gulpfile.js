var gulp = require('gulp');  //引入gulp插件
var imagemin = require('gulp-imagemin');  //压缩图片
var newer = require('gulp-newer');   //引入资源检测插件，检测输出的资源是否是新的文件，旧的文件将不再进行同样的操作；比如图片压缩
var htmlClean = require('gulp-htmlclean');  //引入html压缩插件
var less = require('gulp-less');  //将less转为css
var postcss = require('gulp-postcss'); //引入自动补齐css兼容前缀插件
var nano = require('cssnano');  //压缩css插件
var auto = require('autoprefixer');  //压缩如上前缀插件
var connect = require('gulp-connect'); //开启本地服务器
var uglify = require('gulp-uglify');  //引入js压缩插件
var gulpStrip = require('gulp-strip-debug');  // 引入清除js调试语句插件，如console/debugger；
var concat = require('gulp-concat');   // 引入js合并插件(合并同一个js);

var devMode = process.env.NODE_ENV == 'development';  //producation;   //devolopment为开发环境
// export NODE_ENV=development   该语句在git命令直接更改模式；  production  生产模式

var folder = {
    src:'./src/',
    dist:'./dist/'
}

gulp.task('image',function(){
    gulp.src(folder.src+'image/*')
        .pipe(newer(folder.dist+'image/*'))
        .pipe(imagemin())
        .pipe(gulp.dest(folder.dist+'image'))
})
gulp.task('html',function(){
    var page = gulp.src(folder.src+'html/*')
                    .pipe(connect.reload()) //html改变watch会监听并重新执行该html任务，同时使用reload方法刷新页面；
        if(!devMode){
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist+'html'))
})
gulp.task('css',function(){
    var options = [auto(),nano()];
    var page = gulp.src(folder.src+'css/*')
                    .pipe(connect.reload())
                    .pipe(less())
    if(!devMode){
        page.pipe(postcss(options))
    }
    page.pipe(gulp.dest(folder.dist+'css'))

})
gulp.task('js',function(){
    var page = gulp.src(folder.src+'js/*')
                    .pipe(connect.reload())
    if(!devMode){
        page.pipe(concat('main.js'))
            .pipe(uglify())
            .pipe(gulpStrip())
    }
    page.pipe(gulp.dest(folder.dist+'js'))
})
gulp.task('server',function(){
    connect.server({
        port:8080,
        livereload:true
    })
})
gulp.task('watch',function(){
    gulp.watch(folder.src+'html/*',['html'])
    gulp.watch(folder.src+'css/*',['css'])
    gulp.watch(folder.src+'js/*',['js'])
    gulp.watch(folder.src+'image/*',['image'])
})
gulp.task('default',['image','css','html','watch','server'],function(){
    console.log('111');
})