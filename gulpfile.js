const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const del = require('del');
const rename = require('gulp-rename');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

const html = () => {
  return gulp.src('src/html/*.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
}

exports.html = html;

const icons = () => {
    return gulp.src('src/icons/*')
      .pipe(gulp.dest('./build/icons'))
      .pipe(browserSync.stream());
  }
  
exports.icons = icons;

const styles = () => {
  return gulp
    .src('./src/less/style.less')
      .pipe(plumber())
      .pipe(less())
      .pipe(
        autoprefixer({
            cascade: false
        })
      )
      .pipe(rename('TTWGC.css'))
      .pipe(gulp.dest('./build/css'))
      .pipe(cleanCSS())
      .pipe(rename('TTWGC.min.css'))
      .pipe(gulp.dest('./build/css'))
      .pipe(browserSync.stream());
}

exports.styles = styles;

const js = () => {
    return gulp
        .src('./src/js/*.js')
        .pipe(concat('TTWGC.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(uglify())
        .pipe(rename('TTWGC.min.js'))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}

exports.js = js;

const clean = () => {
  return del(['build/*']);
}

exports.clean = clean;

const watch = () => {
  browserSync.init({
    server: {
      baseDir: './build/'
    }
  });

    gulp.watch('./src/less/**/*.less', styles);
    gulp.watch('./src/js/*.js', js);
    gulp.watch('./src/html/*.html', html);
    gulp.watch('./src/icons/*', icons);
}

exports.watch = watch;

const build = gulp.series(
  clean,
  gulp.parallel(
      html,
      styles,
      js,
      icons
  )
);

exports.build = build;

exports.dev = gulp.series(
  build,
  watch
);