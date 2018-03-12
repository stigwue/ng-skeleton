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
