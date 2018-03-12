(function(){
    angular.module('route.config', [])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
        var routes, setRoutes, baseUrl;

        //to make clean urls, works along with <base> in index.html and .htaccess redirects
        //$locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix('');

        function childlessRoutes(route) {
            var config, url;
            url = '/' + route;
            config = {
                url: url,
                templateUrl: 'components/views/' + route + '.html'
            };

            var stateProvider = $stateProvider.state(route, config);
            return stateProvider;
        };

        //single state routes
        [
            'home'
        ].forEach(function(route){
            return childlessRoutes(route);
        });


        function parentRoutes(route) {
            var config, url;
            url = '/' + route;
            config = {
                url: url,
                abstract: true,
                templateUrl: 'components/views/' + route + '.html'
            };

            var stateProvider = $stateProvider.state(route, config);
            return stateProvider;
        };

        //routes that have child states
        [
            'more'
        ].forEach(function(route){
            return parentRoutes(route);
        });


        /*
        the states are of three levels

        1. states that have no children: childless states e.g home, about etc

        2. states that have children e.g student (child states are list, add etc)

        */

        function parentchildRoutes(route) {
            var config, url, state, templateUrl;
            url = '/'+route;
            config = {
                url: route.url,
                templateUrl: route.templateUrl,
                controller:route.controller
            };

            var stateProvider = $stateProvider.state(route.state, config);
            return stateProvider;
        };


        [
            {state:'more.one', url:'',templateUrl:'components/views/more/1.html'},
            {state:'more.two', url:'/more2',templateUrl:'components/views/more/2.html'},

        ].forEach(function(route){
            return parentchildRoutes(route);
        });

        $urlRouterProvider.when('/', '/home')
        .otherwise('/home');

    }]);
})();
