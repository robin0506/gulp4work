var gulp = require('gulp');
var replace = require('gulp-replace');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var clean = require('gulp-clean');

var pro = 'tasks';
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
	test:'http://api.golf.lesports.com/albatross/v1/',
	online:'http://golf.sports.le.com/albatross/v1/'
};

gulp.task('clean',function(){
  gulp.src([dist.css+'/*',dist.scripts+'/*','rev/*'],{read:false})
  	.pipe(clean({force:true}));
});

gulp.task('images',['clean'],function(){
	return gulp.src(paths.images)
	.pipe(gulp.dest(dist.images));
});

gulp.task('scripts',['clean'],function(){
	return gulp.src(paths.scripts)
	.pipe(replace(url.test,url.online))
	.pipe(rev())
	.pipe(gulp.dest(dist.scripts))
	.pipe(rev.manifest({merge:true}))
	.pipe(gulp.dest('rev'));
});

gulp.task('css',['clean','scripts'],function(){
    return	gulp.src(paths.css)
    .pipe(rev())
	.pipe(gulp.dest(dist.css))
	.pipe(rev.manifest('rev/rev-manifest.json',{base:'rev',merge:true}))
	.pipe(gulp.dest('rev'))
})


gulp.task('html',['css','scripts'],function(){
	return gulp.src(['./rev/*.json',paths.html])
	.pipe(revCollector())
	.pipe(gulp.dest(dist.html));
})

gulp.task('watch',function(){
	gulp.watch(paths.scripts,['scripts']);
	gulp.watch(paths.images,['images']);
	gulp.watch(paths.css,['css']);
	gulp.watch(paths.html,['html']);
})

gulp.task('default',['scripts','images','css','html']);
