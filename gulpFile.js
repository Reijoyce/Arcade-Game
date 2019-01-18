const gulp = require("gulp");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const concat = require("gulp-concat");
const uglify = require('gulp-uglify');


//Autoprefix the CSS using gulp-autoprefixer 
//Minify the CSS using gulp-clean-css
gulp.task('css', (done) => {
    return gulp.src('./src/css/**/*.css') 
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));
    done();
});

//Optimize the images using gulp-imagemin
gulp.task('images', () => {
    return gulp.src('./src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'))
  });

  //Transpile the JS from ES6 to ES5 using gulp-babel 
  //Concatenate the JS into a single file (call it main.js
gulp.task('js',()=>{
    return gulp.src('./src/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
});

//Copy over the HTML. 
gulp.task('dist-html', () => {
    return gulp.src('index.html')
    .pipe(gulp.dest('./dist'))
  });

  //setup a Gulp watch task that will watch for changes to your CSS, JS, and HTML   
gulp.task('default', ['dist-html','css','images', 'js'],  () => {
    gulp.watch('./dist/css/**/*.css', ['css']);
    gulp.watch('./dist/js/**/*.js', ['js']);
    gulp.watch('./dist/index.html',['dist-html'])
  });

  