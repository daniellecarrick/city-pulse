app.service('apiFactory', function($http) {
  //$http.get('http://api.openweathermap.org/data/2.5/weather?q=', config).then(successCallback, errorCallback);
  // Simple GET request example:
/*$http({
  method: 'GET',
  url: 'http://api.openweathermap.org/data/2.5/weather?',
  params: {q: $scope.location}
}).then(function successCallback(response) {
    console.log(response);
  }, function errorCallback(err) {
    console.log(err);
  });*/


/*$http({
  method: 'GET',
  url: 'http://api.openweathermap.org/data/2.5/weather?q=London',
  params: { appid: 'b51ff059850fb59ef5b5085a6e089a74'}
}).then(function successCallback(response) {
    console.log(response);
  }, function errorCallback(err) {
    console.log(err);
  });*/

var apiFactory = {};

//  get the weather
    apiFactory.getWeather = function(location) {
        return $http.get('http://api.openweathermap.org/data/2.5/weather?',
          { params: { q: location,
            appid: 'b51ff059850fb59ef5b5085a6e089a74' } })
            .then(function(response) {
                console.log(response.data);
                return response.data
            }, function(err) {});
    };

// this is a test from nate's branch

return apiFactory;

});