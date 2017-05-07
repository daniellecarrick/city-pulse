app.controller('mainController', function($scope, apiFactory, $http) {

    $scope.city = 'New York City';
    $scope.coord = {};

    $scope.fahrenheit = true;
    $scope.switchTemperature = function() {
        $scope.fahrenheit = !$scope.fahrenheit;
    }

<<<<<<< HEAD
    apiFactory.getPhotos(location).then(function (photoDB) {
            $scope.photoDB = photoDB.photos.photo;
/*            $scope.coord.lat = lat;
            $scope.coord.lon = lon;*/
            //console.log($scope.photoDB);
    });
=======
    $scope.counter = 0;
    $scope.next = function() {
        $scope.counter += 1;
        $scope.animateClass =  'slideInRight';
        console.log($scope.animateClass);
        setTimeout($scope.animateClassFunc(), 2000);
        console.log($scope.animateClass);
    }
>>>>>>> 7f0409ed77c422e8dc31f217b0d314cfbf075aab

    $scope.last = function() {
       if ($scope.counter > 0) {
        $scope.counter -= 1;
        $scope.animateClass =  'slideInLeft';
        setTimeout($scope.animateClassFunc(), 2000);
       }
    }

<<<<<<< HEAD
    $http.post('/api/tweets', params)
      .then(function (result) {

        $scope.tweets = result.data.map(tweet=>{
          //tweet === result.data for each item
          return {
            username: tweet.user.name,
            status:  tweet.retweeted_status?tweet.retweeted_status.text :tweet.text
          }
        })
        
      console.log(result.data);
      }, function(err) {
      console.log(err);
    })
  }
=======
    $scope.animateClassFunc = function() {
      $scope.animateClass = 'slideInRight';
    };
>>>>>>> 7f0409ed77c422e8dc31f217b0d314cfbf075aab

    //search triggered on button click
    $scope.search = function(city) {
            console.log(city);
            // give the searched city to our friend getCityInfo in the factory
            apiFactory.getCityInfo(city).then(function(allData) {
                console.log(allData);
                // data is returned as an array of objects - one for each api database
                $scope.fourDB = allData[0].groups[0].items;
                $scope.photoDB = allData[1].photos.photo;
                $scope.weatherDB = allData[2];
                $scope.tweets = allData[3];
                $scope.trends = allData[4][0].trends;

                $scope.tempFahrenheit = $scope.weatherDB.main.temp;
                $scope.tempCelsius = Math.round((($scope.weatherDB.main.temp) - 32) / 1.8);

<<<<<<< HEAD
//* Tweet stuff */
  $scope.tweets=[];
=======
                setBackground($scope.weatherDB);
            });

        } //end of search() function

    /* Background color is based on temperature */
    var setBackground = function(weatherDB) {
        var temp = weatherDB.main.temp;
        var colorScale = d3.scaleLinear().domain([0, 50, 100]).range(['#1e3c72', '#6190E8', '#DC2424']);
        /*var bgColor = d3.interpolateRdYlBu(colorScale(temp));
        var bgColor1 = d3.interpolateRdYlBu(colorScale(temp+20));*/
        var bgColor = colorScale(temp);
        var bgColor1 = colorScale(temp + 10);
        d3.select('.top-section').style('background', 'linear-gradient(to bottom,' + bgColor + ',' + bgColor1);
    }
>>>>>>> 7f0409ed77c422e8dc31f217b0d314cfbf075aab

    //* Tweet stuff */
    $scope.tweets = []
    $scope.search($scope.city);

    //* Change from F to C and back */
    /*  $scope.fahrenheit = true;
      $scope.tempFahrenheit = $scope.weatherDB.main.temp;

      $scope.switchTemperature = function () {
        $scope.fahrenheit = !$scope.fahrenheit;
        $scope.tempCelsius = Math.round((($scope.weatherDB.main.temp) - 32) / 1.8);
      }*/

});
