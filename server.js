var express = require('express');
var app = express();

// Tells express to look fr files using either of the below as a root
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.listen(8000, function() {
  console.log("Let's find some cities on 8000");
});