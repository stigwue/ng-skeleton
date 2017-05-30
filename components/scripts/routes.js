(function(){
    angular.module('route.config', [])
    .config(['$stateProvider', '$urlRouterProvider',  function($stateProvider, $urlRouterProvider){
        var routes, setRoutes, baseUrl;

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
            'dashboard'
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
            {state:'dashboard.index', url:'',templateUrl:'components/views/dashboard/index.html'},
            {state:'dashboard.logs', url:'/logs',templateUrl:'components/views/dashboard/log.html'},

        ].forEach(function(route){
            return parentchildRoutes(route);
        });

        $urlRouterProvider.when('/', '/home')
        .otherwise('/home');

    }]);
})();
