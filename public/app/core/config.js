(function () {
	'use strict';

	var core = angular.module('blogram.core');

	core.config(['toastyConfigProvider', function (toasty) {
		toasty.setConfig({
			position: 'top-right'
		});
	}]);

	core.config(['$httpProvider', function ($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptor');
	}]);

})();
