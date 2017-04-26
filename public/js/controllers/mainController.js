app.controller('mainController', function($scope, apiFactory, $http) {

  $scope.location = 'New York';

  //search triggered on button click
  $scope.search = function(location) {
    $scope.location = location;
    console.log(location);
    // pass along to the factory
    apiFactory.getWeather(location).then(function (weatherDB) {
            $scope.weatherDB = weatherDB;
            console.log(weatherDB);
            //set the background color based on temp
            setBackground(weatherDB);
    });
    apiFactory.getFourSq(location).then(function (fourDB) {
            $scope.fourDB = fourDB.response.groups[0].items;
            //$scope.fourDB = fourDB;
            //console.log(fourDB.response.groups[0].items);
    });

    var params = {
    q: $scope.location,
    count: 5,
    result_type: 'popular'
    // geocode: latitude/longitude
    }

    $http.post('/api/tweets', params)
      .then(function (result) {
      $scope.tweets = result.data;
      console.log(result.data);
      }, function(err) {
      console.log(err);
    })
  }

  /* Background color is based on temperature */
  var setBackground = function(weatherDB) {
    var temp = weatherDB.main.temp;
    var colorScale = d3.scaleLinear().domain([0,130]).range([1,0]);
    var bgColor = d3.interpolateRdYlBu(colorScale(temp));
    var bgColor1 = d3.interpolateRdYlBu(colorScale(temp+20));
    d3.select('body').style('background', 'linear-gradient(to bottom,'+ bgColor + ',' + bgColor1);
        console.log(bgColor);
    }

//* Tweet stuff */
  $scope.tweets=[]



  $scope.search($scope.location);

});