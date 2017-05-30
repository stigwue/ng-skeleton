(function(){
    angular.module('ngskeleton', [
        'ui.router',
        'ngCookies',
        'route.config',
        'ngAnimate',
        'toastr',
        'ui.bootstrap',
        'angular-loading-bar',
        'angular-websocket',

        //more in use factories
        'http',
        'status',
        'application',
        'websocket'

    ]);
})();
