var gulp = require('gulp'),
  prefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  sequence = require('gulp-sequence'),
  watch = require('gulp-watch'),
  concatCSS = require('gulp-concat-css'),
  imagemin = require('gulp-imagemin'),
  gulpif = require("gulp-if"),
  rename = require('gulp-rename'),
  templateCache = require('gulp-angular-templatecache'),
  pump = require('pump'),

  projectName = "syhp",

  tplSrc = 'dev/templates/**/*.html',
  tplDest = 'dev/js',

  sassSrc = 'dev/sass/**/*.scss',

  imgSrc = 'dev/img/**/*.+(png|jpg|jpeg|gif|svg)',
  imgDest = 'www/img',

  cssSrc = 'dev/css/',
  cssDest = 'www/css/',

  jsSrc = 'dev/js/',
  jsDest = 'www/js/';
// gulp.task('s-sprites', function() {
//  return gulp.src('dev/supplier/img/icon/*.png')
//    .pipe(tasks.spritesmith({
//      imgName: 'supplierIcon.png',
//      styleName: 'supplierIcon.css',
//      imgPath: '../img/supplierIcon.png'
//    }))
//    .pipe(gulpif('*.png', gulp.dest('dev/supplier/img/')))
//    .pipe(gulpif('*.css', gulp.dest('dev/supplier/css/')));
// });

gulp.task('angularTplCache', function () {
  return gulp.src(tplSrc)
    .pipe(templateCache('templates.js', {
      root: "templates/",
      templateHeader: 'app.run(["$templateCache", function($templateCache) {'
    }))
    .pipe(gulp.dest(tplDest));
});

gulp.task('imgmin', function () {
  return gulp.src(imgSrc)
    .pipe(imagemin())
    .pipe(gulp.dest(imgDest));
});

gulp.task('sass', function () {
  return gulp.src(sassSrc)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(cssSrc));
});

gulp.task('concatcss', function () {
  return gulp.src([cssSrc + '/**/*.css', '!' + cssSrc + projectName + '.min.css'])
    .pipe(concatCSS(projectName + ".min.css"))
    .pipe(gulp.dest(cssSrc));
});

gulp.task('concatjs', function () {
  return gulp.src([
      jsSrc + 'configs.js',
      jsSrc + 'services.js',
      jsSrc + 'filters.js',
      jsSrc + 'directives.js',
      jsSrc + 'controllers.js',
      jsSrc + 'app.js',
      jsSrc + 'templates.js'
    ])
    .pipe(concat(projectName + '.min.js'))
    .pipe(gulp.dest(jsSrc));
});

gulp.task('autoprefix', function () {
  return gulp.src(cssSrc + projectName + '.min.css')
    .pipe(prefixer({
      cascade: false
    }))
    .pipe(gulp.dest(cssSrc));
});

gulp.task('cleancss', function () {
  return gulp.src(cssSrc + projectName + '.min.css')
    .pipe(cleanCSS({
      compatibility: 'ie8',
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest(cssSrc));
});

gulp.task('jsmin', function (cb) {
  pump([
    gulp.src(jsSrc + projectName + ".min.js"),
    uglify(),
    gulp.dest(jsSrc)
  ], cb);
  /* return gulp.src(jsSrc + projectName + ".js")
     .pipe(uglify({
       mangle: {
         except: ['app']
       }
     }))
     .pipe(rename({
       extname: '.min.js'
     }))
     .pipe(gulp.dest(jsDest));*/

  /*gulp.src(jsSrc + 'index.js')
    .pipe(uglify({
      mangle: {
        except: ['require', 'exports', 'module', '$']
      }
    }))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(jsDest));*/
});

// gulp.task('rev', function () {
//     return gulp.src('dev/'+role+'/*.css')
//         .pipe(rev())
//         .pipe(gulp.dest('dist'));
// });

gulp.task('processCSS', function (cb) {
  sequence(['sass'], ['concatcss'], ['autoprefix'], cb);
});
gulp.task('watch', ['processCSS'], function () {
  gulp.watch(sassSrc, ['processCSS']);
});
gulp.task("default", function (cb) {
  sequence(['sass', 'angularTplCache'], ['concatjs', 'concatcss'], ['autoprefix'], ['cleancss', 'jsmin'], cb);
});
