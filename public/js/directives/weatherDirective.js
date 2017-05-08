function getWeather() {

/*  var fetch = function (searchTerms) {
  console.log("button clicked");
  $.ajax({
    method: "GET",
    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + searchTerms + '&APPID=b51ff059850fb59ef5b5085a6e089a74'+'&units=imperial',
    dataType: "json",
    success: function(data) {
      console.log(data);
      weather(data);
      colors(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};*/

/* Append the date to our handlebars template */
/*var weather = function(data) {
  var newHTML = template({ temp: Math.floor(data.main.temp), city: data.name });
  $('.weather').append(newHTML);
}*/

/* When a user clicks the button, the value of the input field
is saved in the searchTerms variable and sent to fetch() */
/*$('button').on('click', function() {
    var searchTerms = $('input').val();
    fetch(searchTerms);
    $('.weather').empty();
})*/

/* Background color is based on temperature */
var colors = function(data) {
  var temp = data.main.temp;
  var colorScale = d3.scaleLinear().domain([0,100]).range([1,0]);
  var bgColor = d3.interpolateRdYlBu(colorScale(temp));
  d3.select('body').style('background-color', bgColor);
  }
}


/* A custom directive for the scatterplot chart */
app.directive("weatherDirective", function() {
  return {
    restrict: 'E', // only use this directive as a tag
    template: '<div class="chart-container"></div>',
    link: function (scope, elem, attrs) {
      getWeather();
    }
  };
});
