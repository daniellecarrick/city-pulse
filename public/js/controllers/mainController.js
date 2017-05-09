app.controller('mainController', function($scope, apiFactory, $http) {

    $scope.city = 'New York City';
    $scope.coord = {};

    $scope.fahrenheit = true;
    $scope.switchTemperature = function() {
        $scope.fahrenheit = !$scope.fahrenheit;
    }

    $scope.counter = 0;
    $scope.counterPlace = 0;
    $scope.nextPhoto = function() {
       // $scope.animateClass =  $scope.animateClass === 'slideInRight' ? 'slideInLeft' : 'slideInRight';
        //setTimeout($scope.animateClassFunc(), 1000);
        $scope.counter += 1;
        console.log($scope.animateClass);
        console.log($scope.counter);
    }

    $scope.lastPhoto = function() {
       if ($scope.counter > 0) {
        $scope.counter -= 1;
        //$scope.animateClass =  'slideInLeft';
       // setTimeout($scope.animateClassFunc(), 2000);
       }
    }

    $scope.nextPlace = function() {
       // $scope.animateClass =  '';
        $scope.counterPlace += 1;
       /* console.log($scope.animateClass);
        setTimeout($scope.animateClassFunc(), 2000);
        console.log($scope.animateClass);*/
    }

    $scope.lastPlace = function() {
       if ($scope.counterPlace > 0) {
        $scope.counterPlace -= 1;
       // $scope.animateClass =  'slideInLeft';
        //setTimeout($scope.animateClassFunc(), 2000);
       }
    }

    $scope.animateClassFunc = function() {
      $scope.animateClass = ' ';
      //console.log('setTimeout class')
    };

    //search triggered on button click
    $scope.search = function(city) {
            console.log(city);
            $scope.loading = true;
            $scope.blur = 'blur'
            // give the searched city to our friend getCityInfo in the factory
            apiFactory.getCityInfo(city).then(function(allData) {
                console.log(allData);
                // Data is returned as an array of objects - one for each api database.
                // If statement assures we can display
                if (allData[0]) { // Object
                  $scope.fourDB = allData[0].groups[0].items;
                } else {
                  $scope.fourDB = false;
                }
                if (allData[1].length > 0) { //object
                  $scope.photoDB = allData[1].photos.photo;
                } else {
                  $scope.photoDB = false;
                }
                if (allData[2]) { //object
                  $scope.weatherDB = allData[2];
                } else {
                  $scope.weatherDB = false;
                }

                if (allData[3].length > 0) { //array
                  $scope.tweets = allData[3].map(tweet=>{
                  return {
                    profileimage: tweet.user.profile_image_url,
                    username: tweet.user.name,
                    status:  tweet.retweeted_status?tweet.retweeted_status.text :tweet.text
                  }
                })} else {
                  $scope.tweets = false;
                }
                 if (allData[4][0].trends) { //array
                  $scope.trends = allData[4][0].trends;
                } else {
                  $scope.trends = false;
                }


                $scope.tempFahrenheit = $scope.weatherDB.main.temp;
                $scope.tempCelsius = Math.round((($scope.weatherDB.main.temp) - 32) / 1.8);
                setBackground($scope.weatherDB);
                // Data is here so we can remove loading bar
                $scope.loading = false;
                $scope.blur = ' '
            });

        } //end of search() function


    /* Background color is based on temperature */
    var setBackground = function(weatherDB) {
        var temp = weatherDB.main.temp;
        var colorScale = d3.scaleLinear().domain([0, 50, 120]).range(['#1e3c72', '#6190E8', '#DC2424']);
        /*var bgColor = d3.interpolateRdYlBu(colorScale(temp));
        var bgColor1 = d3.interpolateRdYlBu(colorScale(temp+20));*/
        var bgColor = colorScale(temp);
        var bgColor1 = colorScale(temp + 15);
        d3.select('.top-section').style('background', 'linear-gradient(to bottom,' + bgColor + ',' + bgColor1);
    }

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
