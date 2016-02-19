angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {templateURL: 'app/views/index.html', controller: 'mainController'})

  $locationProvider.html5Mode(true);
});
