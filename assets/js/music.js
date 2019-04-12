//Global variables
var apiKey = "10f8d0af1f97ab76b64e7be5940dcbd0";
var topArtistQueryUrl =
  "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" +
  apiKey +
  "&limit=10&format=json";
var topSongQueryUrl =
  "https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=" +
  apiKey +
  "&limit=10&format=json";
//API call for Top 10 Artists
$(document).on("click", "#top-artists-button", function() {
  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: topArtistQueryUrl,
    method: "GET"
  }).then(function(response) {
    // Storing an array of artist names
    // console.log(response);
    var artistArray = response.artists.artist;
    // console.log(artistArray);
    // Looping over every result item
    for (var i = 0; i < artistArray.length; i++) {
      var newCard = $("<div>");
      newCard.attr("class", "card news-item");
      // Storing artist names
      var artistName = artistArray[i].name;
      var artistImage = artistArray[i].image[2]["#text"];
      var cardPicHolder = $("<div>");
      cardPicHolder.attr("class", "card-image");
      var cardPic = $("<img>");
      cardPic.attr("src", artistImage);
      cardPic.attr("class", "card-image");
      cardPic.appendTo(cardPicHolder);
      cardPicHolder.appendTo(newCard);

      var cardBody = $("<div>");
      cardBody.attr("class", "card-content");
      cardBody.append("<h5>" + artistName + "</h5>");
      cardBody.append("<p>" + artistName + "</p>");
      cardBody.appendTo(newCard);

      var cardLinks = $("<div>");
      cardLinks.attr("class", "");
      var artistLink = $("<a>");
      artistLink.attr("src", "#");
      artistLink.text("Find out more!");
      artistLink.appendTo(newCard);

      var cardColumn = $("<div>");
      cardColumn.attr("class", "col s3");
      newCard.appendTo(cardColumn);
      cardColumn.appendTo($("#topartists"));
    }
    // var p = $("<p>").text(artistName);
    // var artistImg = $("<img>");
    // artistImg.attr("src", artistImage);
    // artistImg.addClass("img col s3");
    // artistDiv.append(p);
    // artistDiv.append(artistImg);
    // $("#topartists").prepend(artistDiv);
  });
});

//API call for Top 10 Songs
$("#top-songs-button").click(function() {
  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: topSongQueryUrl,
    method: "GET"
  }).then(function(response) {
    // Storing an array of artist names
    // console.log(response);
    var tracksArray = response.tracks.track;
    // console.log(tracksArray);
    // Looping over every result item
    for (var i = 0; i < tracksArray.length; i++) {
      // Storing artist names
      var trackDiv = $("<div>");
      var trackName = tracksArray[i].name;
      var trackImage = tracksArray[i].image[2]["#text"];
      var p = $("<p>").text(trackName);
      var trackImg = $("<img>");
      trackImg.attr("src", trackImage);
      trackImg.addClass("img col s3");
      trackDiv.append(p);
      trackDiv.append(trackImg);
      $("#top-songs").prepend(trackDiv);
    }
  });
});
