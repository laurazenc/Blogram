angular.module('authService', [])
.factory('Auth', function($http, $q, $window, AuthToken){
  var authFactory = {};

  authFactory.signup = function(user){
    var dfd = $q.defer();
    $http.post('/api/signup', user).then(function(response){
      if(response.data.success){
        AuthToken.setToken(response.data.user);
        dfd.resolve({success: true});
      }else{
        dfd.resolve({success: false, data: response});
      }
    });
    return dfd.promise;
  }

  authFactory.login = function(email, password){
    var dfd = $q.defer();
    $http.post('/api/login', {email: email, password: password}).then(function(response){
      if(response.data.success){
        AuthToken.setToken(response.data.user);
        dfd.resolve({success: true});
      }else{
        dfd.resolve({success: false, data: response});
      }
    });
    return dfd.promise;
  }

  authFactory.isLoggedIn = function(){
		if(AuthToken.getToken()){  return true; }
		else{
      //AuthToken.setToken();
      return false;
    }
	}

  authFactory.getUser = function(){
		if(AuthToken.getToken()){
      return AuthToken.getToken();
		}else{return false;}
	}

  authFactory.logout = function(){
    var dfd = $q.defer();
    $http.post('/api/logout', {logout:true}).then(function(){
      AuthToken.setToken();
      dfd.resolve();
    });
    return dfd.promise;
  }

  return authFactory;
})

.factory('AuthToken', function($window){
  var authTokenFactory = {};
  authTokenFactory.getToken = function(){
    return JSON.parse(localStorage.getItem('bootstrappedUserObject'));
  };

  authTokenFactory.setToken = function(token){
    if(token) localStorage.setItem('bootstrappedUserObject', JSON.stringify(token));
    else localStorage.removeItem('bootstrappedUserObject');
  };

  return authTokenFactory;
})

.factory('AuthInterceptor', function($q, $location){
  var interceptorFactory = {};

  interceptorFactory.response = function(response){
    return response;
  };
  interceptorFactory.responseError = function(response){
      if(response.status === 401)
        $location.url('/login')
      return $q.reject(response);
  };

  return interceptorFactory;
})
