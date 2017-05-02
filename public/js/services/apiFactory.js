app.service('apiFactory', function($http) {

var apiFactory = {};
/*var map;
var service;
var infowindow;
var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

function initialize() {

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  service = new google.maps.places.PlacesService(map);
}

initialize();*/

//  get the weather from the Open Weather API
    apiFactory.getWeather = function(location) {
        return $http.get('http://api.openweathermap.org/data/2.5/weather?',
          { params: { q: location,
            units: 'imperial',
            appid: 'b51ff059850fb59ef5b5085a6e089a74' } })
            .then(function(response) {
                //console.log(response.data);
                return response.data
            }, function(err) {});
    };

    // Getting city data from our city route on the server
    apiFactory.getCityInfo = function(location) {
      return $http.get('/city/'+location ) // let's go to the server
        .then(function(response) {
          //console.log('response', response);
            return response.data
        }, function(err) {
          console.log(err);
        });
    };

      // Flickr photos
    apiFactory.getPhotos = function(location) {
        return $http.get('https://api.flickr.com/services/rest/?',
          { params: {
            method: 'flickr.photos.search',
            api_key: '6ae44d19471914449a7bc6764acba0ef',
            text: location,
            format: 'json',
            nojsoncallback: '?',
            page: '1',
            sort: 'relevance'
         } })
            .then(function(response) {
               console.log('response.data', response.data);
                return response.data
            }, function(err) {});
    };

return apiFactory;

});