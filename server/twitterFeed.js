console.log("The bot is starting")

var Twit = require('twit');

var T = new Twit({
      consumer_key:         'DI6GuGKQcwEIRn1WQPiijwNpH'
    , consumer_secret:      'y1JrJyeIvtPUuA6twQQImyK1KswULZM3QTd56sMhkPgCzHkxIX'
    , access_token:         '855763024287850498-VK1kORKkSS6Yue1wmyBZaXO1b3FwEUx'
    , access_token_secret:  'GrhpFs0wxUnN5A1XtRXtKJrQ2eXJG3JfTETySAbawtFaJ'
  })

  // T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
  //   console.log(data)
//


// T.get('search/tweets', params, gotData);
// search(params);

function gotData(err, data, response) {

  var tweets = data.statuses;
  for (var i = 0; i < tweets.length; i++) {
    console.log(i + "----" + tweets[i].text);
  }
};

function search(params) {
  return T.get('search/tweets', params)
        .then((result) => {
          return result.data.statuses;
        })
        .catch((err) => console.log('error', err))

}


module.exports = search;
// var config = require ('./config')
