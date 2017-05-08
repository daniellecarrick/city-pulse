app.controller('locationController', function($scope, apiFactory, $http) {



  function getLocation(){
    var msg;

    /**
    first, test for feature support
    **/
    if('geolocation' in navigator){
      // geolocation is supported :)
      requestLocation();
    }else{
      // no geolocation :(
      msg = "Sorry, looks like your browser doesn't support geolocation";
      outputResult(msg); // output error message
      $('.pure-button').removeClass('pure-button-primary');
    }

    /***
    requestLocation() returns a message, either the users coordinates, or an error message
    **/
    function requestLocation(){
      /**
      getCurrentPosition() below accepts 3 arguments:
      a success callback (required), an error callback  (optional), and a set of options (optional)
      **/

      var options = {
        // enableHighAccuracy = should the device take extra time or power to return a really accurate result, or should it give you the quick (but less accurate) answer?
        enableHighAccuracy: false,
        // timeout = how long does the device have, in milliseconds to return a result?
        timeout: 5000,
        // maximumAge = maximum age for a possible previously-cached position. 0 = must return the current position, not a prior cached position
        maximumAge: 0
      };

      // call getCurrentPosition()
      navigator.geolocation.getCurrentPosition(success, error, options);

      // upon success, do this
      function success(pos){
        // get longitude and latitude from the position object passed in
        var lng = pos.coords.longitude;
        var lat = pos.coords.latitude;
        // and presto, we have the device's location!
        msg = 'Latitude: ' + lat  +  '  --  Longitude: ' + lng + '<br>' + '<img src="http://maps.googleapis.com/maps/api/staticmap?zoom=15&size=1440x300&maptype=roadmap&markers=color:red%7Clabel:A%7C' + lat + ',' + lng+ '&sensor=false">';
        outputResult(msg); // output message
        $('.pure-button').removeClass('pure-button-primary').addClass('pure-button-success'); // change button style
      }

      // upon error, do this
      function error(err){
        // return the error message
        msg = 'Error: ' + err + ' :(';
        outputResult(msg); // output button
        $('.pure-button').removeClass('pure-button-primary').addClass('pure-button-error'); // change button style
      }
    } // end requestLocation();

    /***
    outputResult() inserts msg into the DOM
    **/
    function outputResult(msg){
      $('.result').addClass('result').html(msg);
    }
  } // end getLocation()

  // attach getLocation() to button click
  $('.pure-button').on('click', function(){
    // show spinner while getlocation() does its thing
    $('.result').html('<i class="fa fa-spinner fa-spin"></i>');
    console.log("City Latitude is " + apiFactory.cityLat);
    console.log("City Longitude is " + apiFactory.cityLong);
    getLocation();

    



  });









  //
  // //Calculates distance as the crow flies
  // function calculateDistance(lat1, lon1, lat2, lon2){
  //   //calculation from http://www.movable-type.co.uk/scripts/latlong.html
  //   var R = 3958.76; // miles
  //
  //   //Setting
  //   var latRads1 = toRadians(lat1);
  //   var latRads2 = toRadians(lat2);
  //   var latDeltaRads = toRadians(lat2-lat1);
  //   var lonDeltaRads = toRadians(lon2-lon1);
  //
  //   var a = Math.sin(latDeltaRads/2) * Math.sin(latDeltaRads/2) +
  //           Math.cos(latRads1) * Math.cos(latRads2) *
  //           Math.sin(lonDeltaRads/2) * Math.sin(lonDeltaRads/2);
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //   return (R * c).toFixed(1);
  // }
  //
  // function toRadians(value) {
  //   return value * Math.PI / 180;
  // }
  //
  // // below is another example
  //
  // function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  //   var R = 6371; // Radius of the earth in km
  //   var dLat = deg2rad(lat2-lat1);  // deg2rad below
  //   var dLon = deg2rad(lon2-lon1);
  //   var a =
  //     Math.sin(dLat/2) * Math.sin(dLat/2) +
  //     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
  //     Math.sin(dLon/2) * Math.sin(dLon/2)
  //     ;
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //   var d = R * c; // Distance in km
  //   return d;
  // }
  //
  // function deg2rad(deg) {
  //   return deg * (Math.PI/180)
  // }
  //
  //
  //
  //
  //
  //









});
