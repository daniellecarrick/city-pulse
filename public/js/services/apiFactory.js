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

//  get something cool from the FourSquare API
    apiFactory.getFourSq = function(location) {
        return $http.get('https://api.foursquare.com/v2/venues/explore?',
          { params: { 
            section: 'food',
            near: location,
            limit: 5,
            client_id: 'QLJUKUZ0FU0NVLOWLUZJOOJHB1MTWSYMPHQBSKJ5FXKJH102',
            client_secret: '5L3IZX1VKHONEULQBYLDSIC4HTZWEXVJFQRL4FE4ZIAWNS20',
            v: 20161231,
            m: 'foursquare'
         } })
            .then(function(response) {
                console.log(response.data);
                return response.data
            }, function(err) {});
    };

return apiFactory;

});