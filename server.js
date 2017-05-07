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




app.get('/city/:city', function(req, res, next) { // req and res are special express utilities to help us send and recieve data

    var city = req.params.city;

    // gets the flickr data
    function flickrCall(cb) {
        getFlickrData(city, function(err, result) {
            cb(err, result);
        })
    }

    function wikipediaCall(cb) {
      getWikipediaData(city, function(err, result) {
          cb(err, result);
      })
    }

    function weatherLatLongCall(cb) {
        getWeatherData(city, function(err, result) {
            cb(err, {lat: result.coord.lat, long: result.coord.lon})
                //console.log('weather result: ', result)
        })
    }

    // gets the weather data
    function weatherCall(cb) {
        getWeatherData(city, function(err, result) {
            cb(err, result)
                //console.log('weather result: ', result)
        })
    }

    // get just the lat and long from foursquare
    // function foursquareCall(cb) {
    //     getFoursquareData(city, function(err, result) {
    //         cb(err, { lat: result.geocode.center.lat, long: result.geocode.center.lng })
    //     })
    // }

    // get all the foursquare data
    function foursquareVenueCall(cb) {
        getFoursquareData(city, function(err, result) {
            cb(err, result)
        })
    }

    // uses the trends/closest route to get the woeid
    function twitterClosest(geolocation, cb) {
        Tweet.closest(geolocation)
            .then(function(id) {
                cb(null, id)
            }, function(err) {
                cb(err)
            })
    }

    // uses the trends/place route to get the trends
    function twitterPlace(id, cb) {
        Tweet.place(id)
            .then(function(result) {
                cb(null, result)
            }, function(err) {
                cb(err)
            })
    }

    // gets the tweets from the search/tweets route
    function twitterCall(cb) {
        Tweet.search({
                q: city,
                count: 5,
                result_type: 'popular recent',
                lang: 'en'
            })
            .then(function(result) {
                cb(null, result)
            }, function(err) {
                cb(err)
            })
    }

    // foursquareCall gets lat and long, then passes it to twitterClosest for the woeid then to TwitterPlace for the trends
    function twitterTrends(cb) {
        async.waterfall([
            weatherLatLongCall,
            twitterClosest,
            twitterPlace
        ], function(err, results) {
            cb(err, results);
        })
    }

    // All together now!
    async.parallel([
            foursquareVenueCall,
            flickrCall,
            weatherCall,
            twitterCall,
            twitterTrends,
            wikipediaCall
        ],
        function(err, results) {
            if (err) {
                console.log(err)
                return res.status(500).send(err)
            }
            return res.json(results)
        })
});
//END of get request

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
    request.get('https://api.foursquare.com/v2/venues/explore', options, function(err, response, body) {
        if (err) {
            return cb(err, null)
        }
        // need to parse response because it was returning as a string
        //console.log(JSON.parse(body).response.geocode.center);
        //var coord = JSON.parse(body).response.geocode.center
        return cb(null, JSON.parse(body).response)
    })
};


// Flickr photos
var getFlickrData = function(city, cb) {
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
    request.get('https://api.flickr.com/services/rest/?', options, function(err, response, body) {
        if (err) {
            return cb(err, null)
        }
        // need to parse response because it was returning as a string
        return cb(null, JSON.parse(response.body));
    })
};

var getWeatherData = function(city, cb) {
    var options = {
            qs: {
                q: city,
                units: 'imperial',
                appid: 'b51ff059850fb59ef5b5085a6e089a74'
            }
        }
        // get something cool from the OpenWeatherMap
    request.get('http://api.openweathermap.org/data/2.5/weather?', options, function(err, response, body) {
        if (err) {
            return cb(err, null)
        }
        // need to parse response because it was returning as a string
        //console.log(response.body);
        return cb(null, JSON.parse(response.body));
    })
};

var getWikipediaData = function(city, cb) {
  var options = {
    qs: {
    action: 'opensearch',
    search: city,
    contentType: 'application/json; charset=utf-8',
    async: false,
    format: 'json'
  }
}

    // get something cool from Wikipedia
request.get('https://en.wikipedia.org/w/api.php', options, function(err, response, body) {
    if (err) {
        return cb(err, null)
    }
    // need to parse response because it was returning as a string
    //console.log(response.body);
    return cb(null, JSON.parse(response.body));
    })

}

app.listen(process.env.PORT || '8000');
