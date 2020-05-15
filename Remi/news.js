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

//create option for select button -loop
for (var i = 0; i < categories.length; i++) {
  var category = categories[i];
  var newOption = $("<option>");
  newOption.text(category);
  newOption.val(category);
  select.append(newOption);
}
//called articles to make sure worked
getArticles();

//create change listener function be able to change the catagories and gets articles again in line 86
$("#selectID").change(function () {
  var value = $(this).val();
  console.log(value);
  getArticles(value);
});

//This is how I want my articles to be gotton from the Api
function getArticles(topic) {
  console.log(topic);

  //Check to make sure we have a valid topic before adding parameters to the query string
  var topicString = "";
  if (categories.indexOf(topic) >= 0) {
    topicString = `&category=${topic}`;
  }

  //Add the category param only if it exists, otherwise nothing, makes search parameters flexible
  var queryURL = `https://newsapi.org/v2/top-headlines?country=us${topicString}&apiKey=5c9461f2787b49e1a8dc82cb0c1ad839`;
  console.log(queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    popArticles(response.articles);
  });
}
//tfunction to empty the old artilces with new selected ones
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
    $(cardEl).append(cardImgEl).css("border", "solid 10px");

    //Dynamically created text element
    var contentEl = $("<div>").css({
      padding: "10px",
      "background-color": "darkgray",
    });
    var titleEl = $("<h3>");
    var descEl = $("<div>").attr("id", "description");
    var articleLink = $("<a>").attr({ id: "link", target: "_blank" });
    var publishedAt = $("<div>");

    //connect api text content to card
    $(titleEl)
      .text(articleList[i].title)
      .css({ "font-weight": "bold", "margin-left": "10px" });
    console.log(articleList[i].title);
    $(publishedAt).text(articleList[i].publishedAt).css("margin-left", "10px");
    $(descEl).text(articleList[i].description).css("margin-left", "10px");
    $(articleLink).attr("href", articleList[i].url).css("margin-left", "10px");
    $(articleLink).text("click to article")
    .css("color", "darkblue");

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
//terniary operator
//and or for variable assignment
