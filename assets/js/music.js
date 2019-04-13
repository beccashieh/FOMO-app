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
  //Clear output section
  $("#output").empty();
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
      newCard.attr("class", "card medium artist-item");
      // Storing artist names
      var artistName = artistArray[i].name;
      // Storing URL for artist image
      var artistImage = artistArray[i].image[3]["#text"];
      // Storing URL for arist last.fm page
      var artistUrl = artistArray[i].url;
      // Creating artist rank variable
      var artistRank = i + 1;
      // Begin building cards
      var cardPicHolder = $("<div>");
      cardPicHolder.attr(
        "class",
        "responsive-img card-image hoverable artist-card"
      );
      var cardUrl = $("<a>");
      cardUrl.attr("href", artistUrl);
      cardUrl.prependTo(cardPicHolder);
      var cardPic = $("<img>");
      cardPic.attr("src", artistImage);
      cardPic.attr("class", "card-image");

      cardPic.appendTo(cardUrl);
      cardPicHolder.appendTo(newCard);
      var cardBody = $("<div>");
      cardBody.attr("class", "");
      cardBody.append("<h5> # " + artistRank + "</h5>");
      cardBody.append("<h5>" + artistName + "</h5>");
      cardBody.appendTo(newCard);
      var cardLinks = $("<div>");
      cardLinks.attr("class", "card-action");
      var cardColumn = $("<div>");
      cardColumn.attr("class", "col s3");
      newCard.appendTo(cardColumn);
      cardColumn.prependTo($("#output"));
    }
  });
});

//API call for Top 10 Songs
$("#top-songs-button").click(function() {
  // Clear output section
  $("#output").empty();
  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: topSongQueryUrl,
    method: "GET"
  }).then(function(response) {
    // Storing an array of artist names
    var tracksArray = response.tracks.track;
    for (var i = 0; i < tracksArray.length; i++) {
      var newCard = $("<div>");
      newCard.attr("class", "card medium song-item");
      // Storing artist names
      var trackName = tracksArray[i].name;
      var trackImage = tracksArray[i].image[3]["#text"];
      var trackUrl = tracksArray[i].url;
      var trackRank = i + 1;
      var cardPicHolder = $("<div>");
      cardPicHolder.attr(
        "class",
        "responsive-img card-image hoverable artist-card"
      );
      var cardUrl = $("<a>");
      cardUrl.attr("href", trackUrl);
      cardUrl.prependTo(cardPicHolder);
      var cardPic = $("<img>");
      cardPic.attr("src", trackImage);
      cardPic.attr("class", "card-image");
      cardPic.appendTo(cardUrl);
      cardPicHolder.appendTo(newCard);
      var cardBody = $("<div>");
      cardBody.attr("class", "");
      cardBody.append("<h5> # " + trackRank + "</h5>");
      cardBody.append("<h5>" + trackName + "</h5>");
      cardBody.appendTo(newCard);
      var cardLinks = $("<div>");
      cardLinks.attr("class", "card-action");
      var cardColumn = $("<div>");
      cardColumn.attr("class", "col s3");
      newCard.appendTo(cardColumn);
      cardColumn.prependTo($("#output"));
    }
  });
});
