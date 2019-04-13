//Click function to populate all-time popular memes.
$(document).on("click", "#forever", function() {
  $("#results-content").empty();
  var apiKey = "a705723d-1d59-4e23-9395-56d8d2087e71";
  var queryURL =
    "http://version1.api.memegenerator.net//Instances_Select_ByPopular?languageCode=en&pageIndex=0&urlName=&days=&apiKey=" +
    apiKey;
  console.log("this is the url " + queryURL);

  //Ajax function to pull the results from the Meme Generator API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var memeArr = response.result; //shows the results
    console.log(memeArr);

    //div to hold result cards
    var meme = $("<div>");
    meme.addClass("results-content");

    //Adds title above the result cards.
    var foreverTitle = $("<h5>");
    foreverTitle.text("These are the most popular memes of all time!");
    foreverTitle.appendTo("#results-content");

    //For loop to create the cards for 6 results.
    for (var i = 0; i < 6; i++) {
      var newCard = $("<div>");
      newCard.attr("class", "card meme-item");

      //Renders the images on the cards using the result url for all time popular memes.
      var memeHolder = $("<div>");
      memeHolder.attr("class", "card-image");
      $(".card-image").attr("id", "all-time");
      var memePic = $("<img>");
      memePic.attr("src", memeArr[i].instanceImageUrl);
      memePic.attr("class", "card-image");
      memePic.appendTo(memeHolder);
      memeHolder.appendTo(newCard);

      //Renders the generator link for users to create their own meme using the popular meme image.
      var cardLinks = $("<div>");
      cardLinks.attr("class", "card-links");
      var generatorLink = $("<a>");
      generatorLink.attr("href", memeArr[i].instanceUrl);
      console.log(memeArr[i].instanceUrl);
      generatorLink.text("Make your own!");
      generatorLink.appendTo(newCard);

      //Columns to control the sizing of the cards and add them to the results-content div.
      var cardColumn = $("<div>");
      cardColumn.attr("class", "col s5");
      newCard.appendTo(cardColumn);
      cardColumn.appendTo($("#results-content"));
    }
  });
});

//Click function to populate weekly popular memes.
$(document).on("click", "#week", function() {
  $("#results-content").empty();
  $("#weeklyTitle").show();
  var apiKey = "a705723d-1d59-4e23-9395-56d8d2087e71";
  var queryURL =
    "http://version1.api.memegenerator.net//Instances_Select_ByPopular?languageCode=en&pageIndex=0&urlName=&days=7&apiKey=" +
    apiKey;
  console.log("this is the url " + queryURL);

  //Ajax function to pull the results from the Meme Generator API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var memeArr = response.result; //shows the results
    console.log(memeArr);

    //div to hold result cards
    var meme = $("<div>");
    meme.addClass("results-content");

    //Adds title above result cards.
    var weekTitle = $("<h5>");
    weekTitle.text("These are the most popular memes for the week!");
    weekTitle.appendTo("#results-content");

    //For loop to generate cards for 6 results.
    for (var i = 0; i < 6; i++) {
      var newCard = $("<div>");
      newCard.attr("class", "card meme-item");

      //Renders the images on the cards using the result url for the week's popular memes.
      var memeHolder = $("<div>");
      memeHolder.attr("class", "card-image");
      $(".card-image").attr("id", "weekly");
      var memePic = $("<img>");
      memePic.attr("src", memeArr[i].instanceImageUrl);
      memePic.attr("class", "card-image");
      memePic.appendTo(memeHolder);
      memeHolder.appendTo(newCard);

      //Renders the generator link for users to create their own meme using the popular meme image.
      var cardLinks = $("<div>");
      cardLinks.attr("class", "card-links");
      var generatorLink = $("<a>");
      generatorLink.attr("href", memeArr[i].instanceUrl);
      console.log(memeArr[i].instanceUrl);
      generatorLink.text("Make your own!");
      generatorLink.appendTo(newCard);

      //Columns to control sizing of the cards and add them to the results-content div.
      var cardColumn = $("<div>");
      cardColumn.attr("class", "col s5");
      newCard.appendTo(cardColumn);
      cardColumn.appendTo($("#results-content"));
    }
  });
});

//Click function to populate monthly popular memes.
$(document).on("click", "#month", function() {
  $("#results-content").empty();
  $("#monthlyTitle").show();
  var apiKey = "a705723d-1d59-4e23-9395-56d8d2087e71";
  var queryURL =
    "http://version1.api.memegenerator.net//Instances_Select_ByPopular?languageCode=en&pageIndex=0&urlName=&days=30&apiKey=" +
    apiKey;
  console.log("this is the url " + queryURL);

  //Ajax function to pull the results from the Meme Generator API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var memeArr = response.result; //shows the results
    console.log(memeArr);

    //div to hold result cards
    var meme = $("<div>");
    meme.addClass("results-content");

    //Adds title above result cards.
    var monthTitle = $("<h5>");
    monthTitle.text("These are the most popular memes for the last month!");
    monthTitle.appendTo("#results-content");

    //For loop to generate cards for 6 results.
    for (var i = 0; i < 6; i++) {
      var newCard = $("<div>");
      newCard.attr("class", "card meme-item");

      //Renders the images on the cards using the result url for the month's popular memes.
      var memeHolder = $("<div>");
      memeHolder.attr("class", "card-image");
      $(".card-image").attr("id", "monthly");
      var memePic = $("<img>");
      memePic.attr("src", memeArr[i].instanceImageUrl);
      memePic.attr("class", "card-image");
      memePic.appendTo(memeHolder);
      memeHolder.appendTo(newCard);

      //Renders the generator link for users to create their own meme using the popular meme image.
      var generatorLink = $("<a>");
      generatorLink.attr("class", "card-links");
      generatorLink.attr("href", memeArr[i].instanceUrl);
      console.log(memeArr[i].instanceUrl);
      generatorLink.text("Make your own!");
      generatorLink.appendTo(newCard);

      //Columns to control the sizing of the cards and add them to the results-content div.
      var cardColumn = $("<div>");
      cardColumn.attr("class", "col s5");
      newCard.appendTo(cardColumn);
      cardColumn.appendTo($("#results-content"));
    }
  });
});
