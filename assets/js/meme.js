//Click function to populate all-time popular memes.
$(document).on("click", "#all-time", function() {
  var apiKey = "a705723d-1d59-4e23-9395-56d8d2087e71";
  var queryURL =
    "http://version1.api.memegenerator.net//Instances_Select_ByPopular?languageCode=en&pageIndex=0&urlName=&days=&apiKey=" + apiKey;
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
    
    for (var i = 0; i < memeArr.length; i++) {
      var newCard = $("<div>");
      newCard.attr("class", "card meme-item");

      var memeHolder = $("<div>");
      memeHolder.attr("class", "card-image");
      var memePic = $("<img>");
      memePic.attr("src", memeArr[i].instanceImageUrl);
      memePic.attr("class", "card-image");
      memePic.appendTo(memeHolder);
      memeHolder.appendTo(newCard);

    //   var cardBody = $("<div>");
    //   cardBody.attr("class", "card-content");
    //   cardBody.append("<h5>" + memeArr[i].urlName + "</h5>");
    //   cardBody.append("<h4>" + "Ranking: " + memeArr[i].ranking + "</h4>");
    //   cardBody.appendTo(newCard)

      var cardColumn = $("<div>");
      cardColumn.attr("class", "col s3");
      newCard.appendTo(cardColumn);
      cardColumn.appendTo($("#results-content"));
    }
  
  });
});

//Click function to populate weekly popular memes.
$(document).on("click", "#week", function() {
    var apiKey = "a705723d-1d59-4e23-9395-56d8d2087e71";
    var queryURL =
      "http://version1.api.memegenerator.net//Instances_Select_ByPopular?languageCode=en&pageIndex=0&urlName=&days=7&apiKey=" + apiKey;
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
      
      for (var i = 0; i < memeArr.length; i++) {
        var newCard = $("<div>");
        newCard.attr("class", "card meme-item");
  
        var memeHolder = $("<div>");
        memeHolder.attr("class", "card-image");
        var memePic = $("<img>");
        memePic.attr("src", memeArr[i].instanceImageUrl);
        memePic.attr("class", "card-image");
        memePic.appendTo(memeHolder);
        memeHolder.appendTo(newCard);
  
        var cardColumn = $("<div>");
        cardColumn.attr("class", "col s3");
        newCard.appendTo(cardColumn);
        cardColumn.appendTo($("#results-content"));
      }
    
    });
  });

  //Click function to populate monthly popular memes.
$(document).on("click", "#all-time", function() {
    var apiKey = "a705723d-1d59-4e23-9395-56d8d2087e71";
    var queryURL =
      "http://version1.api.memegenerator.net//Instances_Select_ByPopular?languageCode=en&pageIndex=0&urlName=&days=30&apiKey=" + apiKey;
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
      
      for (var i = 0; i < memeArr.length; i++) {
        var newCard = $("<div>");
        newCard.attr("class", "card meme-item");
  
        var memeHolder = $("<div>");
        memeHolder.attr("class", "card-image");
        var memePic = $("<img>");
        memePic.attr("src", memeArr[i].instanceImageUrl);
        memePic.attr("class", "card-image");
        memePic.appendTo(memeHolder);
        memeHolder.appendTo(newCard);
  
      //   var cardBody = $("<div>");
      //   cardBody.attr("class", "card-content");
      //   cardBody.append("<h5>" + memeArr[i].urlName + "</h5>");
      //   cardBody.append("<h4>" + "Ranking: " + memeArr[i].ranking + "</h4>");
      //   cardBody.appendTo(newCard)
  
        var cardColumn = $("<div>");
        cardColumn.attr("class", "col s3");
        newCard.appendTo(cardColumn);
        cardColumn.appendTo($("#results-content"));
      }
    
    });
  });
