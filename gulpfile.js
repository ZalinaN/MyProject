var pug = require('gulp-pug');
var gulp = require ('gulp');
var browserSync= require('browser-sync');
var reload =browserSync.reload;
 var watch = require('gulp-watch');
var scss =require('gulp-sass');

var path={
	src:{
		pug:'./src/html/*.pug',
		css:'./src/css/*.scss',
		js:'./src/js/*.js'

	},
	build:{
		html:'./build/html/',
		css:'./build/css/',
		js:'./build/js/'

	},
	watch:{
		pug:'./src/html/*.pug',
		css:'./src/css/*.scss',
		js:'./src/js/*.js'
	}
}

var server ={
server:{
	baseDir:"./build"
}
}
gulp.task('html',function() {
	gulp.src(path.src.pug)
	.pipe(pug({
		pretty:true
	}))
	.pipe(gulp.dest(path.build.html))
	.on('end',browserSync.reload);
});


gulp.task('css',function(){
	gulp.src(path.src.css)
	.pipe(scss())
     .pipe(gulp.dest(path.build.css))
     .on('end',browserSync.reload);
})
gulp.task('js',function(){
	gulp.src(path.src.js)
	.pipe(gulp.dest(path.build.js))
})


gulp.task('watch', function(){
	gulp.watch([path.watch.pug],function(event,cb){
		gulp.start('html');
	});
	gulp.watch([path.watch.css],function(event,cb){
		gulp.start('css');
	});
	gulp.watch([path.watch.js],function(event,cb){
		gulp.start('js');
	});
});
gulp.task('webserver', function(){
	browserSync(server);
});

gulp.task('default',['html','css','js','watch',"webserver"]);