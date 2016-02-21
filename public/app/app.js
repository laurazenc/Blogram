angular.module('Blogram', ['ngResource', 'appRoutes',
	'commonNotifier', 'angular-toasty',
	'authService', 'mainCtrl'])
.config(function ($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
})
