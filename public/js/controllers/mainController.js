app.controller('mainController', function($scope, apiFactory) {

  $scope.location = 'New York';

  //search triggered on button click
  $scope.search = function(location) {
    $scope.location = location;
    console.log(location);
    // pass along to the factory
    apiFactory.getWeather(location).then(function (weatherDB) {
            $scope.weatherDB = weatherDB;
            console.log(weatherDB);
    });
    apiFactory.getFourSq(location).then(function (fourDB) {
            $scope.fourDB = fourDB;
    });
  }

  $scope.search($scope.location);

});