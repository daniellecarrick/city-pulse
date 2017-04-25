app.controller('mainController', function($scope, apiFactory, $http) {
  $scope.location;
  $scope.tweets=[]
  var params = {
    q: 'London',
    count: 5
    // geocode: latitude/longitude
  }

  $http.post('/api/tweets', params)
  .then(function (result) {
    $scope.tweets = result.data;

    //  for (var i = 0; i < result.data.length; i++) {
    //    console.log(result.data[i].text);
    //    $scope.tweets = result.data[i].text;
    //  }
   });

  console.log("controller works");
});
