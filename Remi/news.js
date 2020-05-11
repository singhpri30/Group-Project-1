

  // ******************* Query Content *********************
var queryURL = "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5c9461f2787b49e1a8dc82cb0c1ad839";
$.ajax({
  url: queryURL,
  method: 'GET',
}).then(function (response) {
  console.log(response);
  //Add cards Dynamically
  var cards = $("#card").html(); {
    for (let i = 0; i < 6; i++) {
      $("#card").css("width", "60%").append(cards);
    }
  };
  //Add API urlToImage content dynamically
  var publishedAt = response.articles[i].publishedAt;
  for (var i = 0; i < 12; i++) {
    $("#publishedAt").append(publishedAt);
  }


  //Add API Date publishedAt content dynamically
  var publishedAt = response.articles[i].publishedAt;
  for (var i = 0; i < 12; i++) {
    $("#publishedAt").append(publishedAt);
  }

  //Add API content dynamically
  var publishedAt = response.articles[i].publishedAt;
  for (var i = 0; i < 12; i++) {
    $("#publishedAt").append(publishedAt);
  }

  //Add API Click Event for url
  var publishedAt = response.articles[i].publishedAt;
  for (var i = 0; i < 12; i++) {
    $("#publishedAt").append(publishedAt);
  }

});

// var datePub = response.articles[0].publishedAt;
// // $("#description-1").prepend(datePub);

//***********************NEWS SEARCH***********************
// $('#searchBtn').on('click', function (event) {
// event.preventDefault();
// var searchVar = $("#textInput").val(categoryVar);
// var apiKey = "3d48ff05268143ca8cee6e2228ae78ba";
// var categoryVar = "business"; "entertainment"; "general"; "health"; "science"; "sports"; "technology";
// var queryUrl = `https://newsapi.org/v2/top-headlines?q=${searchVar}&category=${categoryVar}&country=us&apiKey=${apiKey}`;
// $.ajax({
// url: queryUrl,
// method: "GET",
// }).then(function (response) {
// console.log(response);
// });
// });



// for (var i = 0; i < content.length; i++) {
// $("#description-1" + articles[i]).val(cardContent);
// }
// $('#btn-1').on('click', function () {
// // event.preve
// +ntDefault();
// var urlToImage = response.articles[0].urlToImage;
// // $("#btn-1").append("<img src="">", urlToImage);
// });
// //prepend and add new h4 element for date of publication in description area
// var datePub = response.articles[0].publishedAt;
// $("#description-1").prepend(datePub);
// // console.log(response.articles[0].publishedAt);
// var datePub = response.articles[1].publishedAt;
// $("#description-2").prepend(datePub);
// var datePub = response.articles[2].publishedAt;
// $("#description-3").prepend(datePub);
// var datePub = response.articles[3].publishedAt;
// $("#description-4").prepend(datePub);
// var datePub = response.articles[4].publishedAt;
// $("#description-5").prepend(datePub);
// var datePub = response.articles[6].publishedAt;
// $("#description-6").prepend(datePub);
// var datePub = response.articles[7].publishedAt;
// $("#description-7").prepend(datePub);
// var datePub = response.articles[8].publishedAt;
// $("#description-8").prepend(datePub);
// var datePub = response.articles[9].publishedAt;
// $("#description-9").prepend(datePub);
// var datePub = response.articles[10].publishedAt;
// $("#description-10").prepend(datePub);
// var datePub = response.articles[13].publishedAt;
// $("#description-11").prepend(datePub);
// var datePub = response.articles[14].publishedAt;
// $("#description-12").prepend(datePub);
// for (let i = 0; i < timeArray.length; i++) {
// $("#" + timeArray[i]).val(localStorage.getItem(timeArray[i]));
// }



//add description to cards/ Next, I need to figure out how to itterate this and append dynamically
// var cardContent = response.articles[0].content;
// $("#description-1").append(cardContent);
// var cardContent = response.articles[1].content;
// $("#description-2").append(cardContent);
// var cardContent = response.articles[2].content;
// $("#description-3").append(cardContent);
// var cardContent = response.articles[3].content;
// $("#description-4").append(cardContent);
// var cardContent = response.articles[4].content;
// $("#description-5").append(cardContent);
// var cardContent = response.articles[6].content;
// $("#description-6").append(cardContent);
// var cardContent = response.articles[7].content;
// $("#description-7").append(cardContent);
// var cardContent = response.articles[8].content;
// $("#description-8").append(cardContent);
// var cardContent = response.articles[9].content;
// $("#description-9").append(cardContent);
// var cardContent = response.articles[10].content;
// $("#description-10").append(cardContent);
// var cardContent = response.articles[13].content;
// $("#description-11").append(cardContent);
// var cardContent = response.articles[14].content;
// $("#description-12").append(cardContent);
// var cardContent = response.articles[0].content;
// for (var i = 0; i < content.length; i++) {
// $("#description-1" + articles[i]).val(cardContent);
// }
// $('#btn-1').on('click', function () {
// // event.preventDefault();
// var urlToImage = response.articles[0].urlToImage;
// // $("#btn-1").append("<img src="">", urlToImage);
// });








// });
// $("#btn-1").click(function(){
// $("#btn-").click(buttonEl);
// console.log(response.articles[0].url);



















// $.ajax({
// url: queryURL,
// method: 'GET',
// }).then(function (response) {
// console.log(response);
// console.log(response.Runtime);
// var content = response.wind.speed;
// $("#windSpeed").append(content);
// });  