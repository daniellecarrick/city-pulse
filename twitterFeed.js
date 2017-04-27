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

//////////////////////////////    1. this function gets the tweets   //////////////////////////////////////////////////

// function search(params) {
//   console.log(params);
//   return T.get('search/tweets', params)
//         .then((result) => {
//           console.log(result);
//           return result.data.statuses;
//         })
//         .catch((err) => console.log('error', err))
// }

//////////////////////////////    2. this one is for getting WOEID from lat & long:    ////////////////////////////////

// function search(params) {
//   return T.get('trends/closest', params)
//         .then((result) => {
//           console.log("trends/closest result is: " + result.data[0].woeid);
//           return result;
//           // return result.data.statuses;
//         })
//         .catch((err) => console.log('error', err))
// }

//////////////////////////////    3. this one gets place trends by WOEID:   ////////////////////////////////////////////

// function search(params) {
//   return T.get('trends/place', params)
//         .then((result) => {
//           console.log("trends/place result is: " + result.data);
//           return result;
//           // return result.data.statuses;
//         })
//         .catch((err) => console.log('error', err))
// }

////////////////////////////////////    4. trying for combo of 3 & 4  /////////////////////////////////////////////////////


function search(params) {
  return T.get('trends/closest', params)
        .then((result) => {
          console.log("trends/closest result is: " + result.data[0].woeid);
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
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = search;

// var config = require ('./config')
