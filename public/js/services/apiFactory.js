app.service('apiFactory', function($http) {

var apiFactory = {};

//  get the weather from the Open Weather API
    apiFactory.getWeather = function(location) {
        return $http.get('http://api.openweathermap.org/data/2.5/weather?',
          { params: { q: location,
            appid: 'b51ff059850fb59ef5b5085a6e089a74' } })
            .then(function(response) {
                console.log(response.data);
                return response.data
            }, function(err) {});
    };

return apiFactory;

});