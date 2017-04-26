app.controller('mainController', function($scope, apiFactory, $http) {

  $scope.location = 'New York';
  $scope.coord = {};

  //search triggered on button click
  $scope.search = function(location) {
    $scope.location = location;
    console.log(location);
    //console.log(autocomplete.getplace());
    // pass along to the factory
    apiFactory.getWeather(location).then(function (weatherDB) {
            $scope.weatherDB = weatherDB;
            $scope.coord = weatherDB.coord;
            console.log($scope.coord.lon);
            //set the background color based on temp
            setBackground(weatherDB);
    });
    apiFactory.getFourSq(location).then(function (fourDB) {
            $scope.fourDB = fourDB.response.groups[0].items;
            //$scope.fourDB = fourDB;
            console.log(fourDB.response);
    });

    var params = {
    q: $scope.location,
    count: 5,
    result_type: 'popular recent',
    lang: 'en',
/*    lat: $scope.coord.lat,
    long: $scope.coord.lon*/
    //geocode: '40.7,-74.01,100mi'
    //geocode: $scope.coord.lat $scope.coord.lon 50mi
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
    var colorScale = d3.scaleLinear().domain([0, 50, 100]).range(['#1e3c72', '#6190E8', '#DC2424']);
    /*var bgColor = d3.interpolateRdYlBu(colorScale(temp));
    var bgColor1 = d3.interpolateRdYlBu(colorScale(temp+20));*/
    var bgColor = colorScale(temp);
    var bgColor1 = colorScale(temp+10);
    d3.select('body').style('background', 'linear-gradient(to bottom,'+ bgColor + ',' + bgColor1);
        console.log(bgColor);
    }

//* Tweet stuff */
  $scope.tweets=[]



  $scope.search($scope.location);

});