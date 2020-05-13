//*************Select Search Parameters**************
//When I select a catagory, 


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

//******************* Query Content *********************
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
      var titleEl = $("<h3>");
      var descEl = $("<div>").attr("id", "description");
      var articleLink = $("<a>").attr("id", "link");
      var publishedAt = $("<div>");
      //connect api text content to card
      $(titleEl).text(response.articles[i].title);
      console.log(response.articles[i].title)
      $(publishedAt).text(response.articles[i].publishedAt);
      $(descEl).text(response.articles[i].description);
      $(articleLink).attr("href", response.articles[i].url);
      $(articleLink).text("click to article");

      //appended the text elements within the div
      $(cardEl).append(contentEl, titleEl, publishedAt, descEl, articleLink);
    

      //Accessed the API line 3 to append news information
      //connected the api image url to the card image
      var urlToImage = response.articles[i].urlToImage;
      $(cardImage).attr("src", urlToImage)
      $("#card").css("width", "100%");
      
      
     
    
    //appended the card element to the div id
      $("#card").append(cardEl);

    };

    //add search criteria


});







