var express = require('express');
var app = express();
var async = require('async');
var request = require('request');
var Tweet = require('./twitterFeed');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Tells express to look fr files using either of the below as a root
app.use(express.static('public'));
app.use(express.static('node_modules'));

//  twit post route
app.post('/api/tweets', function(req, res, next){
  //console.log(req.body);
  Tweet(req.body).then(function(result){
  res.send(result);
  });
})

app.listen(process.env.PORT || '8000');

app.get('/city/:city', function(req, res, next) { // req and res are special express utilities to help us send and recieve data

  var city = req.params.city;

// pre-async version
/*  function getFoursquare(city) {
    var options = {
      qs: {
        section: 'food',
        near: city,
        venuePhotos: 1,
        limit: 5,
        client_id: 'QLJUKUZ0FU0NVLOWLUZJOOJHB1MTWSYMPHQBSKJ5FXKJH102',
        client_secret: '5L3IZX1VKHONEULQBYLDSIC4HTZWEXVJFQRL4FE4ZIAWNS20',
        v: 20161231,
        m: 'foursquare'
      }
     };
    // get something cool from the FourSquare API
    request.get('https://api.foursquare.com/v2/venues/explore', options, function(error, response, body) {
      // need to parse response because it was returning as a string
      res.send(JSON.parse(body).response);
    })
  }
})*/

  // TRYINGGGGGGGG

  var getFoursquareData = function(city, callback) {
    console.log('in getFoursquareData');
    var returnedFoursquareData = 'blank';
     /* function getFoursquare(city) {*/
        console.log('in getFoursquare');
        var options = {
          qs: {
            section: 'food',
            near: city,
            venuePhotos: 1,
            limit: 5,
            client_id: 'QLJUKUZ0FU0NVLOWLUZJOOJHB1MTWSYMPHQBSKJ5FXKJH102',
            client_secret: '5L3IZX1VKHONEULQBYLDSIC4HTZWEXVJFQRL4FE4ZIAWNS20',
            v: 20161231,
            m: 'foursquare'
          }
         };
    // get something cool from the FourSquare API
      request.get('https://api.foursquare.com/v2/venues/explore', options, function(error, response, body) {
          // need to parse response because it was returning as a string
          console.log(response);
          res.send(JSON.parse(body).response);
          /*console.log(response);
          returnedFoursquareData = response;*/
        })
      //}
     return callback(null, returnedFoursquareData);
  };

  var getFlickrData = function(callback) {
      return callback(null, 'flickrResults');
  };

  var apiCalls = [getFoursquareData, getFlickrData];
  var sendResults = function(err, results) {
  console.log(results);
}

// now run all the requests and then give us the results
async.parallel(apiCalls, sendResults);
});


// ASYNC MODEL
/*
async.parallel([
    function(getFoursquareX) {
            getFoursquareX(null, 'one');
            console.log('what does this do');
    },
    function(callback) {
        setTimeout(function() {
            callback(null, 'two');
        }, 100);
    }
],
// optional callback
function(err, results) {
  console.log(results, 'optional callback');
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
});*/

/*var dbQueryFunctions = [
  function(callback) {
      return callback(null, 'userResults');
  },
  function(callback) {
      return callback(null, 'managerResults');
  }
]

// CODE SNIPPETS FOR REFERENCE
  //getWeather(berlin).then(getTwitter).then(res.send(data))
  //getFoursquare(city);
  //getFlickrPhotos(city);

function getWeather(city) {

  //return request()
  //.then(return {lat:city.lat, lon:city.lin})

}

function getTwitter(data) {

  //return request()

}*/



