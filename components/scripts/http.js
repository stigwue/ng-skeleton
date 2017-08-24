(function () {
    angular.module('http', [])
    .factory('httpFactory', ['$http', '$timeout', httpFactory])

  function httpFactory($http, $timeout){

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

      function buildRequest(method, url, data)
      {
          //set the url base here
          var BASE = 'http://some_api_url/';

          var request = {
            method: method.toUpperCase(), //POST, GET, etc
            url: BASE + url,

            /*headers: {
                'Access-Control-Allow-Origin': '*'
            },*/
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
