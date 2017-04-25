app.controller('mainController', function($scope, apiFactory) {

  $scope.location;

  //search triggered on button click
  $scope.search = function(location) {
    $scope.location = location;
    console.log(location);

  }
});