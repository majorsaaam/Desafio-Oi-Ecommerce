var browserSync = require('browser-sync').create(),
    less = require('gulp-less');
    gulp = require('gulp');

const origem = './assets/less';
const destino = './assets/css';


gulp.task('less', function() {
    gulp.src(`${origem}/*.less`) /* observa o arquivo .less */
        .pipe(less()) /* converte em .css usando o import do gulp-less */
        .pipe(gulp.dest(destino)) /* joga o .css compilado no destino */
        .pipe(browserSync.stream()); /* chama o método de livereload */
});

gulp.task('livereload', ['less'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch('./assets/js/ko-models.js').on('change', browserSync.reload);
    gulp.watch(`${origem}/*.less`, ['less']).on('change', browserSync.reload); 
});

gulp.task('default', ['livereload']);