angular.module('Blogram')
.controller('ProfileController', [ 'Auth', '$scope', function(Auth, $scope){
  $scope.identity = Auth.getUser();
}]);
