/*
Author: DAISY
Version: 1.0.0





*/

/** gulp */
const { src, dest, watch, series, parallel } = require("gulp");

/** HTML plugin */
const htmlbeautify = require("gulp-html-beautify");
var beautifyOptions = {
  indent_size: 2,
  preserve_newlines: false,
  indent_with_tabs: false,
};

/** sass plugin */
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");
const cssdeclsort = require("css-declaration-sorter");
const cssnano = require("gulp-cssnano");

/** javascript plugin */
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

/** template plugin */
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");
const path = require('path');
const replace = require('gulp-replace');

/** 相対パスで書き換える（src|href|action） */
const enableRewrite = true;

/** etc plugin */
const rename = require("gulp-rename");
const browserSync = require("browser-sync");

/** exports setting */
const paths = {
  src: "src",
  dest: "dist",
  assets: "dist/assets",
};

/** task --------------------------------------*/

const nunjucks = () => {
  return src([paths.src + "/templates/njk/**/*.njk", "!" + paths.src + "/templates/njk/**/_*.njk"])
    .pipe(
      data(function (file) {
        delete require.cache[require.resolve("./" + paths.src + "/templates/data/sample.json")];
        return require("./" + paths.src + "/templates/data/sample.json");
      })
    )
    .pipe(
      nunjucksRender({
        path: [paths.src + "/templates/njk"],
      })
    )
    .pipe(replace(/(src|href|action)=["']\/(.*?)["']/g, function (match, p1, p2) {
        if (enableRewrite) {
            const filePath = this.file.relative;
            const slashCount = filePath.split('/').length - 1;
            const parentDirs = Array(slashCount).fill('..').join('/') || '.';
            const finalPath = `${parentDirs}/${p2}`;
            return `${p1}="${finalPath}"`;
        } else {
            return match;
        }
    }))
    .pipe(htmlbeautify(beautifyOptions))
    .pipe(dest(paths.dest + "/"));
};

const copy = () => {
  return src(paths.src + "/images/**").pipe(dest(paths.assets + "/images"));
};

const scss = () => {
  return src([paths.src + "/sass/**/*.scss", "!" + paths.src + "/sass/**/_*.scss"])
    .pipe(sass({ outputStyle: "expanded" }).on('error', sass.logError))
    .pipe(postcss([
        autoprefixer(),
        mqpacker()
    ]))
    .pipe(dest(paths.assets + "/css"));
};

const scssCopy = () => {
    return src(paths.src + "/js/sass/**").pipe(dest(paths.assets + "/js/sass"));
};

const cssCopy = () => {
    return src(paths.src + "/css/vendor/**").pipe(dest(paths.assets + "/css/vendor"));
};

const moduleCopy = () => {
    return src(paths.src + "/module/**").pipe(dest(paths.dest));
};

const jsBabel = () => {
  return src([paths.src + "/js/**/*.js", "!" + paths.src + "/js/vendor/*"])
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(dest(paths.assets + "/js"))
    .pipe(uglify())
    .pipe(
      rename({
        extname: ".min.js",
      })
    )
    .pipe(dest(paths.assets + "/js"));
};

const jsCopy = () => {
  return src(paths.src + "/js/vendor/**").pipe(dest(paths.assets + "/js/vendor"));
};

const watchFunc = () => {
  watch([paths.src + "/templates/njk/**/*.njk",paths.src + "/templates/data/*.json"], series(nunjucks, browserReload));
  watch(paths.src + "/sass/**/*.scss", series(scss, scssCopy, browserReload));
  watch(paths.src + "/css/vendor/*", series(cssCopy, browserReload));
  watch(paths.src + "/js/**/*.js", series(jsBabel, browserReload));
  watch(paths.src + "/js/vendor/*", series(jsCopy, browserReload));
  watch(paths.src + "/images/*", series(copy, browserReload));
};

const browserFunc = () => {
  browserSync.init({
    server: {
      baseDir: paths.dest,
    },
    notify: false,
    open: "external",
  });
};

const browserReload = (done) => {
  browserSync.reload();
  done();
};

exports.default = series(
    series(nunjucks, scss, cssCopy, jsBabel, jsCopy, moduleCopy, copy),
    parallel(watchFunc, browserFunc)
);
