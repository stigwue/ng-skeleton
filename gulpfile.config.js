module.exports = function(){

    //directories/locations
    var base = '.',
        css = base + '/assets/css/*.css',
        //dir_sass = base + '/assets/sass/*.sass',
        //dir_less = base + '/assets/less/*.less',
        js = base + '/components/scripts/*.js',
        html = base + '/components/views/**/*.html',
        //**/*.ext

        dest_dev = base + '/dev/',
        dest_dist = base + '/dist/',
        tmp = base + '/tmp/';

    var config = {
        css: css,
        js: js,
        html: html,

        dest_dev : dest_dev,

        base: base,
        index: base +'/index.html',

        dev: {
            app: dest_dev,
            app_js: dest_dev + '*.js',
            css: dest_dev+'/assets/css',
            js: dest_dev+'/assets/js'
        },

        dist: {
            app: dest_dist,
            app_js: dest_dist + '*.js',
            css: dest_dist+'/assets/css',
            js: dest_dist+'/assets/js'
        },

        pre_dist:[
            base+'/**/*.html',
            '!'+base+'/bower_components'
        ]
    }

    return config;
}
