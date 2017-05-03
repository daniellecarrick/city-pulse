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

/*function searchTrends(params) {
  return T.get('trends/closest', params)
        .then((result) => {
          //console.log("trends/closest result is: " + result.data[0].woeid);
          place = result.data[0].woeid;
          return place;
          // return result.data.statuses;
        })
        .then(function search(params) {
          var params = {
            id: place
          }
          return T.get('trends/place', params)
          .then((res) => {
            console.log("trends/place result is: " + res.data);
            return res;
          })
        })
        .catch((err) => console.log('error', err))
}*/


module.exports = search;
// var config = require ('./config')
