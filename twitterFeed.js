console.log("Twitterfeed.js")

var Twit = require('twit');

var T = new Twit({
      consumer_key:         'DI6GuGKQcwEIRn1WQPiijwNpH'
    , consumer_secret:      'y1JrJyeIvtPUuA6twQQImyK1KswULZM3QTd56sMhkPgCzHkxIX'
    , access_token:         '855763024287850498-VK1kORKkSS6Yue1wmyBZaXO1b3FwEUx'
    , access_token_secret:  'GrhpFs0wxUnN5A1XtRXtKJrQ2eXJG3JfTETySAbawtFaJ'
  })


// this function gets the tweets
function search(params) {
  //console.log(params);
  return T.get('search/tweets', params)
        .then((result) => {
          //console.log(result);
          return result.data.statuses;
        })
}

function closest(geolocation) {
  return T.get('trends/closest', geolocation)
        .then((result) => {
          //console.log("trends/closest result is: " + result.data[0].woeid);
          console.log('closest', result);
          place = result.data[0].woeid;
          return place;
          // return result.data.statuses;
        })

        }

function place(id){
  return T.get('trends/place', {id: id})
          .then((res) => {
            console.log("trends/place result is: " + res.data);
            return res.data;
          })
    }
       // .catch((err) => console.log('error', err))





module.exports = {
  search: search,
  closest: closest,
  place: place
}
// var config = require ('./config')
