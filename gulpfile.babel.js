import gulp from "gulp";
import sync from "browser-sync";
import clean from "gulp-clean";
import imagemin from "gulp-imagemin";
import plumber from "gulp-plumber";
import webpackStream from "webpack-stream";
import spritesmith from "gulp.spritesmith";
import sass from "gulp-sass";
import sassGlob from "gulp-sass-glob";
import sourcemaps from "gulp-sourcemaps";
import gulpStylelint from "gulp-stylelint";
import csso from "gulp-csso";
import gulpIf from "gulp-if";
import pug from "gulp-pug";
import prettify from "gulp-jsbeautifier";

const isDevelopment = process.env.NODE_ENV;

const dest = {
	assets: "public",
	clean: "public",
	fonts: "public/fonts",
	images: "public/img",
	styles: "public/css",
	views: "public",
	webpack: "public/js",
};

export const assets = () => {
	return gulp
		.src([
			"app/**",
			"!app/img{,/**}",
			"!app/js{,/**}",
			"!app/fonts{,/**}",
			"!app/views{,/**}",
			"!app/css{,/**}",
			"!app/scss{,/**}",
		])
		.pipe(gulp.dest(dest.assets))
		.pipe(sync.stream());
};

export const fonts = () => {
	return gulp
		.src("app/fonts/**/*.{ttf,woff,woff2,svg,eot,otf}")
		.pipe(gulp.dest(dest.fonts))
		.pipe(sync.stream());
};

export const images = () => {
	return gulp
		.src([
			"app/img/**/*.{png,jpg,svg,gif,json,xml,ico}",
			"!app/img/sprite/**/*",
			"!app/img/sprite.svg",
		])
		.pipe(imagemin())
		.pipe(gulp.dest(dest.images))
		.pipe(sync.stream());
};

export const sprites = () => {
	return gulp
		.src("app/img/sprite/*.png")
		.pipe(
			spritesmith({
				imgPath: "../img/sprite.png",
				imgName: "sprite.png",
				cssName: "sprite.scss",
			})
		)
		.pipe(gulp.dest("app/img"))
		.pipe(gulp.dest("app/scss/sprites"));
};

export const styles = () => {
	return gulp
		.src("app/scss/style.scss")
		.pipe(gulpIf(isDevelopment, sourcemaps.init()))
		.pipe(sassGlob())
		.pipe(sass().on("error", sass.logError))
		.pipe(gulpIf(isDevelopment, sourcemaps.write("map")))
		.pipe(
			gulpIf(
				!isDevelopment,
				csso({
					restructure: false,
					sourceMap: false,
				})
			)
		)
		.pipe(gulp.dest(dest.styles))
		.pipe(
			sync.stream({
				match: "**/*.css",
			})
		);
};

export const stylesLint = () => {
	return gulp.src("app/scss/**/*.scss").pipe(
		gulpStylelint({
			failAfterError: false,
			reporters: [
				{
					formatter: "verbose",
					console: true,
				},
			],
			debug: true,
		})
	);
};

export const scripts = () => {
	return gulp
		.src("app/js/script.js")
		.pipe(plumber())
		.pipe(
			webpackStream({
				mode: isDevelopment,

				output: {
					filename: "script.js",
				},

				module: {
					rules: [
						{
							test: /\.js$/,
							exclude: /node_modules/,
							use: [
								{
									loader: "babel-loader",
								},
								{
									loader: "eslint-loader",
									options: {
										emitWarning: true,
									},
								},
							],
						},
					],
				},
			})
		)
		.pipe(gulp.dest(dest.webpack));
};

export const views = () => {
	return gulp
		.src("app/views/*.pug")
		.pipe(plumber())
		.pipe(pug())
		.pipe(
			prettify({
				braceStyle: "expand",
				indentWithTabs: true,
				indentInnerHtml: true,
				preserveNewlines: true,
				endWithNewline: true,
				wrapLineLength: 120,
				maxPreserveNewlines: 50,
				wrapAttributesIndentSize: 1,
				unformatted: ["use"],
			})
		)
		.pipe(gulp.dest(dest.views))
		.pipe(sync.stream());
};

export const server = () => {
	sync.init({
		server: {
			baseDir: ["./", "public"],
		},
	});
};

export const clear = () => {
	return gulp.src(dest.clean).pipe(clean());
};

export const watch = () => {
	gulp.watch(
		[
			"app/**",
			"!app/img{,/**}",
			"!app/js{,/**}",
			"!app/fonts{,/**}",
			"!app/views{,/**}",
			"!app/css{,/**}",
			"!app/scss{,/**}",
		],
		assets
	);
	gulp.watch(["app/views/**/*.pug"], views);
	gulp.watch(["app/scss/**/*.scss"], styles);
	gulp.watch("app/js/**/*.js", scripts);
	gulp.watch(
		["app/img/**/*.{png,jpg,svg,gif,json,xml,ico}", "!app/img/sprite/**/*"],
		images
	);
	gulp.watch("app/img/sprite/*.png", sprites);
};

export const build = gulp.parallel(
	assets,
	fonts,
	scripts,
	sprites,
	styles,
	images,
	views
);

export default gulp.series(build, gulp.parallel(server, watch));
