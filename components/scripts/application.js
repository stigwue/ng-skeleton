(function () {
    "use strict";

    angular.module("application", [])
        .controller("appController",['$http', '$scope', '$cookies', '$timeout', appController])

        function appController($http, $scope, $cookies, $timeout)
        {
          //application information
          $scope.appinfo = {
              product: 'NG skeleton',
              company: 'School of Hard Code',
              year: '2017'
          }

        }

})();
