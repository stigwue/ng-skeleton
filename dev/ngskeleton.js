(function () {
    "use strict";

    angular.module("application", [])
        .controller("appController",['$http', '$scope', '$cookies', '$timeout', appController])

        function appController($http, $scope, $cookies, $timeout)
        {
          //application information
          $scope.appinfo = {
              product: 'NG Skeleton',
              company: 'School of Hard Code',
              year: '2017 - 2018'
          }

        }

})();

(function () {
    angular.module('http', [])
    .factory('httpFactory', ['$http', '$timeout', 'statusFactory', httpFactory])

  function httpFactory($http, $timeout, statusFactory){

      //exposed functions
      return {
        //request
        buildRequest : buildRequest
      }

      //via http://stackoverflow.com/a/25570077/3323338
      function objectToParams(obj) {
          var p = [];
          for (var key in obj) {
              p.push(key + '=' + encodeURIComponent(obj[key]));
          }
          return p.join('&');
      };

      //user_session token tracker, safe to ignore
      //test if user_session_token is set
      //set otherwise
      function token_check(token)
      {
        var headers = {};

        if (statusFactory.getUserSession() === undefined) {
          //we cool, dev knows what he should do
          //token does not exist, carry on
          headers.user_session_token = token;
        } else {
          //token exists, add to header
          //add it to the request
          headers.user_session_token = statusFactory.getUserSession();
          //headers['Access-Control-Allow-Origin'] = '*';
        }

        //there are some urls that need no token, still add?
        //yeah, just checked, we good, it'll be ignored
        return headers;
      }

      function buildRequest(method, url, data, token, no_base = false)
      {
          //set the url base here
          var BASE = 'http://host/api/';

          var request = {};

          if (no_base) {
              request = {
                method: method.toUpperCase(), //POST, GET, etc
                url: url,

                headers: token_check(token)
              };
          } else {
                request = {
                    method: method.toUpperCase(), //POST, GET, etc
                    url: BASE + url,

                    headers: token_check(token)
                };
          }

          //for GET
          /*params: {par1 : 'val1'}*/
          if (method == 'GET') {
              request.params = data;
          }
          //for POST
          /*data: {par1 : 'val1'}*/
          //http://stackoverflow.com/questions/19254029/angularjs-http-post-does-not-send-data#20276775
          else //if (method == 'POST')
          {
              request.data = objectToParams(data),
              request.headers = {'Content-Type': 'application/x-www-form-urlencoded'}
          }

          return request;
      }

  }

})();

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

(function () {
    angular.module('status', [])
    .factory('statusFactory', ['$cookies', '$timeout', statusFactory])

  function statusFactory($cookies, $timeout){

    //see https://docs.angularjs.org/api/ngCookies/service/$cookies#!

      //exposed functions
      return {
        setUserSession : setUserSession,
        getUserSession : getUserSession,

        setDetails : setDetails,
        getDetails : getDetails
      }

      function saveInCookie(key, value) {
        $cookies.put(key, value);
      }

      function readFromCookie(key) {
        return $cookies.get(key);
      }

      function setUserSession(id) {
        saveInCookie('ngskeleton_session', id);
        return id;
      }
      function getUserSession() {
        return readFromCookie('ngskeleton_session');
      }

      function setDetails(obj) {
        saveInCookie('ngskeleton_details', JSON.stringify(obj));

        return obj;
      }
      function getDetails() {
        var raw_value = readFromCookie('ngskeleton_details');
        if (raw_value !== undefined) {
          return JSON.parse(raw_value);
        }
        else {
          return undefined;
        }
      }
  }

})();
