(function () {
    angular.module('status', [])
    .factory('statusFactory', ['$cookies', '$timeout', statusFactory])

  function statusFactory($cookies, $timeout){

    //see https://docs.angularjs.org/api/ngCookies/service/$cookies#!

      //exposed functions
      return {
        setUser : setUser,
        getUser : getUser,
        setSession : setSession,
        getSession : getSession
      }

      function saveInCookie(key, value) {
        $cookies.put(key, value);
      }

      function readFromCookie(key) {
        return $cookies.get(key);
      }

      function setUser(id) {
        saveInCookie('ngskeleton_user', id);
        return id;
      }

      function getUser() {
        return readFromCookie('ngskeleton_user');
      }

      function setSession(id) {
        saveInCookie('ngskeleton_session', id);
        return id;
      }
      function getSession() {
        return readFromCookie('ngskeleton_session');
      }
  }

})();
