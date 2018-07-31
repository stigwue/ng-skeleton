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
