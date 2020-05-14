//******************* Query Content *********************
// var queryURL = "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5c9461f2787b49e1a8dc82cb0c1ad839";
// $.ajax({
//   url: queryURL,
//   method: 'GET',
// }).then(function (response) {
//   console.log(response);

//     for (let i = 0; i < 20; i++) {
//       //Dynamically created elements within the card

//       var cardEl = $("<div>").attr("class", "card");
//       var cardImgEl = $("<div>").attr("id", "card-image");
//       var imgFig = $("<figure>").attr("class", "image is-3by2");
//       var cardImage = $("<img>");

//       //appended the elements within the div
//       $(imgFig).append(cardImage);
//       $(cardImgEl).append(imgFig);
//       $(cardEl).append(cardImgEl);

//       //Dynamically created text element
//       var contentEl = $("<div>");
//       var titleEl = $("<h3>");
//       var descEl = $("<div>").attr("id", "description");
//       var articleLink = $("<a>").attr("id", "link");
//       var publishedAt = $("<div>");

//       //connect api text content to card
//       $(titleEl).text(response.articles[i].title);
//       console.log(response.articles[i].title)
//       $(publishedAt).text(response.articles[i].publishedAt);
//       $(descEl).text(response.articles[i].description);
//       $(articleLink).attr("href", response.articles[i].url);
//       $(articleLink).text("click to article");

//       //appended the text elements within the div
//       $(cardEl).append(contentEl, titleEl, publishedAt, descEl, articleLink);

//       //Accessed the API line 3 to append news information
//       //connected the api image url to the card image
//       var urlToImage = response.articles[i].urlToImage;
//       $(cardImage).attr("src", urlToImage)
//       $("#card").css("width", "100%");

//     //appended the card element to the div id
//       $("#card").append(cardEl);

//     };

//     //add search criteria

// });

//******************* Search *********************

// When I select a catagory, it searches for witin my news feed
var categories = [
  "Business",
  "Entertainment",
  "General",
  "Health",
  "Science",
  "Sports",
  "Technology",
];
var select = $("#selectID");

for (var i = 0; i < categories.length; i++) {
  var category = categories[i];

  var newOption = $("<option>");
  newOption.text(category);
  newOption.val(category);
  select.append(newOption);
}

getArticles("entertainment");

$("#selectID").change(function () {
  var value = $(this).val().toLowerCase();
  console.log(value);
  getArticles(value);
});

function getArticles(topic) {
  console.log(topic);
  var queryURL = `http://newsapi.org/v2/top-headlines?country=us&category=${topic}&apiKey=5c9461f2787b49e1a8dc82cb0c1ad839`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    popArticles(response.articles);
  });
}

function popArticles(articleList) {
  $("#card").empty();

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
    $(titleEl).text(articleList[i].title);
    console.log(articleList[i].title);
    $(publishedAt).text(articleList[i].publishedAt);
    $(descEl).text(articleList[i].description);
    $(articleLink).attr("href", articleList[i].url);
    $(articleLink).text("click to article");

    //appended the text elements within the div
    $(cardEl).append(contentEl, titleEl, publishedAt, descEl, articleLink);

    //Accessed the API line 3 to append news information
    //connected the api image url to the card image
    var urlToImage = articleList[i].urlToImage;
    $(cardImage).attr("src", urlToImage);
    $("#card").css("width", "100%");

    //appended the card element to the div id
    $("#card").append(cardEl);
  }
}

// Populate
// Function that takes the response object, and prints 20 items from it onto the page... It also has to clear the box that has the content.

// GetArticles
// Function that makes an ajax call, and then calls the Populate functino, pssing in that response object

// GetArticle("Business"){

// $.ajax(url + "business")
// .then(function(){ POPULATE(response)})
// }

// var catagoryVar = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"];
// $('#select').empty();
// $.each(options, function (i, p) {
//   $('#select').append($('<option></option>').val(p).html(p));
// });

// var apiKey = "3d48ff05268143ca8cee6e2228ae78ba";
// var queryUrl = `https://newsapi.org/v2/top-headlines?q=${searchVar}&category=${categoryVar}&country=us&apiKey=${apiKey}`;
// $.ajax({
// url: queryUrl,
// method: "GET",
// }).then(function (response) {
// console.log(response);
// });
// });

// capture the value selected from the dropdown and pass it into the  catatoryVar
