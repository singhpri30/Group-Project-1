#   connect navigation link to page

#   connect cards to news links
  
#   link articles to cards
1.  create classes for individual cards
2.  acquire api websites url and key
3.  create ajax function for each card
//Add images to the cards

//add description to cards/ Next, I need to figure out how to itterate this and append dynamically

refactor code and itterate
for (var i = 0; i < timeArray.length; i++) {
    $("#" + timeArray[i]).val(localStorage.getItem(timeArray[i]));
}

//develop search parameters using key words for articles