// ******************* Query Content *********************
var queryURL = "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5c9461f2787b49e1a8dc82cb0c1ad839";
$.ajax({
  url: queryURL,
  method: 'GET',
}).then(function (response) {
  console.log(response);
  //Add cards Dynamically
  // $("#card").clear();

    for (let i = 0; i < 20; i++) {
      //Dynamically created elements within the card
      var parentDiv = $("<div>");
      var cardEl = $("<div>").attr("class", "card");
      var cardImgEl = $("<div>").attr("id", "card-image");
      var imgFig = $("<figure>").attr("class", "image is-3by2");
      var cardImage = $("<img>"); 
    //appended the elements within the div
      $(imgFig).append(cardImage);
      $(cardImgEl).append(imgFig);
      $(cardEl).append(cardImgEl);
     

      //Dynamically created text element
      var contentEl = $("<div>");
      var titleEl = $("<ht>").attr("class", "title is-1");
      var descEl = $("<div>").attr("id", "description");
      var articleLink = $("<a>").attr("id", "link");
      var publishedAt = $("<div>");
      //appended the text elements within the div
      $(cardEl).append(contentEl, titleEl, descEl, articleLink, publishedAt);
    

      //Accessed the API line 3 to append news information
      //connected the api image url to the card image
      var urlToImage = response.articles[i].urlToImage;
      $(cardImage).attr("src", urlToImage)
      $("#card").css("width", "100%");
      
      //connect api text content to card
      $(titleEl).text(response.articles[i].title);
      $(publishedAt).text(response.articles[i].publishedAt);
      $(descEl).text(response.articles[i].description);
      // $(articleLink).attr("src", response.articles[i].url)
      $(articleLink).text(response.articles[i].url);
     
    
    //appended the card element to the div id
      $("#card").append(cardEl);
     
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




//add description to cards/ Next, I need to figure out how to itterate this and append dynamically
// var cardContent = response.articles[0].content;
// $("#description-1").append(cardContent);




// $.ajax({
// url: queryURL,
// method: 'GET',
// }).then(function (response) {
// console.log(response);
// console.log(response.Runtime);
// var content = response.wind.speed;
// $("#windSpeed").append(content);
// });  
