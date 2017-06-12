(function(){
    angular.module('ngskeleton', [
        'ui.router',
        'ngCookies',
        'route.config',
        'ngAnimate',
        'toastr',
        'ui.bootstrap',
        'angular-loading-bar',

        //more in use factories
        'http',
        'status',
        'application'

    ]);
})();
