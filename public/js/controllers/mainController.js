app.controller('mainController', function($scope, apiFactory, $http) {


////////////////////////////////////////  carousel stuff  ////////////////////////////////////////

    $scope.currentPage = 0;
    $scope.pageSize = 3;
    $scope.data = [];
    $scope.numberOfPages=function(){
        return Math.ceil($scope.data.length/$scope.pageSize);                
    }
    for (var i=0; i<100; i++) {
        $scope.data.push("Item "+i);
    }

//////////////////////////////////////////////////////////////////////////////////////////////////

  $scope.location = 'New York';
  $scope.coord = {};

  //search triggered on button click
  $scope.search = function(location) {
   console.log(location);
    // pass along to the factory
    apiFactory.getWeather(location).then(function (weatherDB) {
            $scope.weatherDB = weatherDB;
            $scope.coord = weatherDB.coord;
            //set the background color based on temp
            setBackground(weatherDB);
    });

    // give location to our friend getCityInfo in the factory then takes the response and puts it in variable called fourDB
    apiFactory.getCityInfo(location).then(function (fourDB) {
      $scope.fourDB = fourDB.groups[0].items;
      console.log('fourDB', fourDB);
    });

    apiFactory.getPhotos(location).then(function (photoDB) {
            $scope.photoDB = photoDB.photos.photo;
            console.log($scope.photoDB);
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
    d3.select('.top-section').style('background', 'linear-gradient(to bottom,'+ bgColor + ',' + bgColor1);
    }

//* Tweet stuff */
  $scope.tweets=[]
  $scope.search($scope.location);

});

////////////////////////////////////////    more carousel stuff   ////////////////////////////////////////

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});