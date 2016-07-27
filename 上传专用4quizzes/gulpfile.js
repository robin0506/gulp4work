var gulp = require('gulp');
var replace = require('gulp-replace');

var pro = 'quizzes';
var root = '../albatross-frontend-repository/albatross/';
var paths={
	scripts: root+pro+'/js/*.js',
	images: root+pro+'/images/**',
	css:root+pro+'/css/**',
	html:root+pro+'/*.html'
};

var dist={
	scripts: root+'dist/'+pro+'/js',
	images: root+'dist/'+pro+'/images',
	css: root+'dist/'+pro+'/css',
	html: root+'dist/'+pro
}

var url={
	test:'http://api.golf.lesports.com/albatross/v1/quizzes/',
	online:'http://golf.sports.letv.com/albatross/v1/quizzes/'
};

gulp.task('images',function(){
	return gulp.src(paths.images)
	.pipe(gulp.dest(dist.images));
});

gulp.task('scripts',function(){
	return gulp.src(paths.scripts)
	.pipe(replace(url.test,url.online))
	.pipe(gulp.dest(dist.scripts));
});

gulp.task('css',function(){
    return	gulp.src(paths.css)
	.pipe(gulp.dest(dist.css));
})

gulp.task('html',function(){
	return gulp.src(paths.html)
	.pipe(gulp.dest(dist.html));
})

gulp.task('watch',function(){
	gulp.watch(paths.scripts,['scripts']);
	gulp.watch(paths.images,['images']);
	gulp.watch(paths.css,['css']);
	gulp.watch(paths.html,['html']);
})

gulp.task('default',function(){
	gulp.run('scripts','images','css','html','watch');
	
});
