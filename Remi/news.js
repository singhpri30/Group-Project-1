var queryURL = "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5c9461f2787b49e1a8dc82cb0c1ad839";

$.ajax({
  url: queryURL,
  method: 'GET',
}).then(function (response) {
  console.log(response);
  console.log(response.articles[0].author);

  // var content = response.wind.speed;
  // $("#windSpeed").append(content);
});
// ---------------------------------------------------------

