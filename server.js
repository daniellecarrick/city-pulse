var express = require('express');
var app = express();
app.listen(8000, function() {
  console.log("Let's find some cities on 8000");
});
app.use(express.static('public'));