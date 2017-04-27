app.controller('mainController', function($scope, apiFactory, $http) {

  $scope.location = 'New York, NY';
  $scope.tweets= {};
  $scope.coords = {
    lat: 40.71,
    lon: -74.01
  };

  //search triggered on button click
  $scope.search = function(location) {
    // console.log(location);
    // pass along to the factory
    apiFactory.getWeather(location).then(function (weatherDB) {
      // setTimeout(function() {
            $scope.weatherDB = weatherDB;
            $scope.coords = weatherDB.coord;
            console.log($scope.coords);
            //set the background color based on temp
            setBackground(weatherDB);
      // }, 2000)
            return $scope.coords;
    });
    apiFactory.getFourSq(location).then(function (fourDB) {
            $scope.fourDB = fourDB.response.groups[0].items;
            //$scope.fourDB = fourDB;
            //console.log(fourDB.response.groups[0].items);
    });

///////////////////////////   1. get five English language tweets mentioning location:   /////////////////////

  //   var params = {
  //   q: $scope.location,
  //   coordinates: true,
  //   lang: 'en',
  //   count: 5
  // }
  
  //   $http.post('/api/tweets', params)
  //   .then(function (tweets) {
  //   $scope.tweets = tweets.data;
  //   console.log(tweets);
  // }, function(err) {
  //   console.log(err);
  // })
  // }

///////////////////////////////////////////   2. get WOEID from lat & long:   /////////////////////////////////

    // var params = {
    //   lat: $scope.coords.lat,
    //   long: $scope.coords.lon
    // }
  
    // $http.post('/api/tweets', params)
    // .then(function (tweets) {
    //     $scope.tweets = tweets.data.data[0].woeid;
    //     console.log($scope.tweets)
    // }, function(err) {
    //       console.log(err);
    //    })
    // }

/////////////////////////////////////////   3. get top 50 trending topics by WOEID:   ///////////////////////////

  //   var params = {
  //   id: "2488042"
  //   // exclude: "hashtags"
  // }
  
  //   $http.post('/api/tweets', params)
  //   .then(function (tweets) {
  //   $scope.tweets = tweets.data.data[0].trends;
  //   console.log(tweets.data.data[0].trends);
  // }, function(err) {
  //   console.log(err);
  // })
  // }

//////////////////////////////////////////  COMBO 2-3  /////////////////////////////////////////////////////

  // var cityWOEID = {};   

    function getWOEID() {
      var params = {
      lat: $scope.coords.lat,
      long: $scope.coords.lon
    }
      return $http.post('/api/tweets', params)
    };

    // function getTrendingTweets() {
    //   console.log('got here');
    //   console.log(cityWOEID);
    //   var params = {
    //   id: cityWOEID
    //   } 
    //   return $http.post('/api/tweets', params)
    // };

  getWOEID()
  .then(function(response) {
    console.log("this is response.data:");
    console.log(response.data);
    console.log(response.data.data[0].locations[0].name);
    // return response;
    angular.copy(response.data.data[0].locations[0].name, $scope.tweets);
  })

  // .then(getTrendingTweets())  
  // .then(function(res) {
  //   console.log("this is response.data for trends:");
  //   console.log(res.data);
  // })

  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////
  /* Background color is based on temperature */
  var setBackground = function(weatherDB) {
    var temp = weatherDB.main.temp;
    var colorScale = d3.scaleLinear().domain([0,130]).range([1,0]);
    var bgColor = d3.interpolateRdYlBu(colorScale(temp));
    var bgColor1 = d3.interpolateRdYlBu(colorScale(temp+20));
    d3.select('body').style('background', 'linear-gradient(to bottom,'+ bgColor + ',' + bgColor1);
        // console.log(bgColor);
    }

//* Tweet stuff */
  // $scope.tweets=[]
  $scope.search($scope.location);

});