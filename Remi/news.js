var queryURL = "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5c9461f2787b49e1a8dc82cb0c1ad839";

$.ajax({
  url: queryURL,
  method: 'GET',
}).then(function (response) {
console.log(response);
// console.log(response.articles[0].author);

//Add images to the cards



//add description to cards/ Next, I need to figure out how to itterate this and append dynamically
var cardContent =response.articles[0].content;
$("#description-1").append(cardContent);

var cardContent = response.articles[1].content;
$("#description-2").append(cardContent);

var cardContent = response.articles[2].content;
$("#description-3").append(cardContent);

var cardContent = response.articles[3].content;
$("#description-4").append(cardContent);

var cardContent = response.articles[4].content;
$("#description-5").append(cardContent);

var cardContent = response.articles[6].content;
$("#description-6").append(cardContent);

var cardContent = response.articles[7].content;
$("#description-7").append(cardContent);

var cardContent = response.articles[8].content;
$("#description-8").append(cardContent);

var cardContent = response.articles[9].content;
$("#description-9").append(cardContent);

var cardContent = response.articles[10].content;
$("#description-10").append(cardContent);

var cardContent = response.articles[13].content;
$("#description-11").append(cardContent);

var cardContent = response.articles[14].content;
$("#description-12").append(cardContent);


//add events listeners to article object
var buttonEl = response.articles[0].url;
console.log(response.articles[0].url);



















                            });

// $.ajax({
// url: queryURL,
// method: 'GET',
// }).then(function (response) {
// console.log(response);
// console.log(response.Runtime);
// var content = response.wind.speed;v
// $("#windSpeed").append(content);
// });
