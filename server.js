/*var express = require('express');
var app = express();

// Tells express to look fr files using either of the below as a root
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.listen(8000, function() {
  console.log("Let's find some cities on 8000");
});*/

var express = require('express');
var app = express();
var Tweet = require('./twitterFeed');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Tells express to look fr files using either of the below as a root
app.use(express.static('public'));
app.use(express.static('node_modules'));

//  twit post route
app.post('/api/tweets', function(req, res, next){
  console.log(req.body);
  Tweet(req.body).then(function(result){
  res.send(result);
  });
})

app.listen(8000, function() {
  console.log("Let's find some cities on 8000");
});