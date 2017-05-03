console.log("foursquare.js")

var Foursquare = require('twit');

var F = new Foursquare({
      consumer_key:         'DI6GuGKQcwEIRn1WQPiijwNpH'
    , consumer_secret:      'y1JrJyeIvtPUuA6twQQImyK1KswULZM3QTd56sMhkPgCzHkxIX'
    , access_token:         '855763024287850498-VK1kORKkSS6Yue1wmyBZaXO1b3FwEUx'
    , access_token_secret:  'GrhpFs0wxUnN5A1XtRXtKJrQ2eXJG3JfTETySAbawtFaJ'
  })


// this function gets the tweets
function search(params) {
  //console.log(params);
  return F.get('search/tweets', params)
        .then((result) => {
          //console.log(result);
          return result.data.statuses;
        })
}

module.exports = search;