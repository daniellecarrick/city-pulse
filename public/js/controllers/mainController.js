app.controller('mainController', function($scope, apiFactory, $http) {

    $scope.city = 'New York City';
    $scope.coord = {};

    $scope.fahrenheit = true;
    $scope.switchTemperature = function() {
        $scope.fahrenheit = !$scope.fahrenheit;
    }

    $scope.counter = 0;
    $scope.nextPhoto = function() {
        $scope.counter += 1;
        console.log($scope.counter);
    }

    $scope.lastPhoto = function() {
        $scope.counter -= 1;
        console.log($scope.counter);
    }

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
