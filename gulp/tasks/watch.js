var gulp   = require('gulp');
var config = require('../config');

gulp.task('watch', 
    ['copy:watch',
    
    'nunjucks:watch',
    'iconfont:watch',
    'svgo:watch',
    'webpack:watch',
    'sass:watch'
]);
