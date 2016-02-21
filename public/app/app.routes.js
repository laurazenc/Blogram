angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateURL: 'app/views/pages/index.html',
      controller: 'MainController'
    })
    .when('/signup', {
			templateUrl: 'app/views/pages/signup.html',
      controller: 'MainController',
      controllerAs: 'signup'
		})
    .when('/login', {
			templateUrl: 'app/views/pages/login.html',
      controller: 'MainController',
      controllerAs: 'login'
		})
    .when('/profile', {
			templateUrl: 'app/views/pages/profile.html',
      controller: 'ProfileController'
		})
    .otherwise({
      redirectTo: '/404'
    });

    $locationProvider.html5Mode(true);
});
