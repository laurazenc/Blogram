(function () {
  'use strict';

  angular
    .module('blogram.session')
    .controller('SessionController', SessionController);

  SessionController.$inject = ['$scope', '$http', '$rootScope', 'Notifier', 'Auth', '$location'];

  function SessionController($scope, $http, $rootScope, Notifier, Auth, $location){
    $scope.currentUser = Auth.getUser();
  	$scope.loggedIn = Auth.isLoggedIn();

    $rootScope.$on('$routeChangeStart', function (){
      $scope.currentUser = Auth.getUser();
    	$scope.loggedIn = Auth.isLoggedIn();
    });


    $scope.signIn = function(){
      Auth.login($scope.email, $scope.password).then(function(response){
  				if(response.success){
  	        $scope.loggedIn = Auth.getUser();
  	        $scope.currentUser = Auth.getUser();
  	        delete $scope.email;
  	        delete $scope.password;
  	        Notifier.notify('success', 'Successfully signed in!');
  	        $location.path('/');
        }else{
  				Notifier.error(response.data.data.reason);
        }
      });
    };

    $scope.signUp = function(){
      var newUser = {
        email: $scope.email,
        username: $scope.username,
        password: $scope.password
      }
  		Auth.signup(newUser).then(function(response){
  				if(response.success){
  	        $scope.currentUser = Auth.getUser();
  	        delete $scope.email;
  	        delete $scope.username;
  	        delete $scope.password;
  	        Notifier.notify('success', 'User account created!');
  	        $location.path('/');
        	}else{
          	Notifier.error(response.data.data.reason);
  				}
  	    });
  	};

    $scope.logOut = function(){
      Auth.logout().then(function(){
        $scope.loggedIn = false;
        delete $scope.currentUser;
        Notifier.notify('info', 'You\'ve Successfully logged out!');
        $location.path('/');
      });
    };
  }
})();
