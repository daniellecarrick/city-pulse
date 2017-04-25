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
            $scope.fourDB = fourDB.response.groups[0].items;
            //$scope.fourDB = fourDB;
            //console.log(fourDB.response.groups[0].items);
    });
  }

  /* Background color is based on temperature */
  var colors = function(weatherDB) {
    var temp = weatherDB.main.temp;
    var colorScale = d3.scaleLinear().domain([0,100]).range([1,0]);
    var bgColor = d3.interpolateRdYlBu(colorScale(temp));
    d3.select('body').style('background-color', bgColor);
    }

  $scope.search($scope.location);

});