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

  // now run all the requests and then give us the results
  async.parallel([
    function(cb){
    getFoursquareData(city, function(err, result){
      cb(err, result)
    })
  },
    function(cb){
    getFlickrData(city, function(err, result){
      cb(err, result)
    })
  }],
    function(err, results){
    if(err) {
      // handle err
    }
    return res.json(results)
  })
})

var getFoursquareData = function(city, cb) {

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
        if(error) {
          return cb(error, null)
        }
        // need to parse response because it was returning as a string
        return cb(null, JSON.parse(body).response)
      })
};

// Flickr photos
var getFlickrData  = function(city, cb) {
  var options = {
    qs: {
      method: 'flickr.photos.search',
      api_key: '6ae44d19471914449a7bc6764acba0ef',
      text: city,
      format: 'json',
      nojsoncallback: '?',
      page: '1',
      sort: 'relevance'
   }
   };
     // get something cool from the Flickr
  request.get('https://api.flickr.com/services/rest/?', options, function(error, response, body) {
    if(error) {
      return cb(error, null)
    }
    // need to parse response because it was returning as a string
    console.log(response.body);
    return cb(null, JSON.parse(response.body));
  })
};


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



