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
      // Storing artist names
      var artistDiv = $("<div>");
      var artistName = artistArray[i].name;
      var artistImage = artistArray[i].image[2]["#text"];
      var p = $("<p>").text(artistName);
      var artistImg = $("<img>");
      artistImg.attr("src", artistImage);
      artistImg.addClass("img col s3");
      artistDiv.append(p);
      artistDiv.append(artistImg);
      $("#topartists").prepend(artistDiv);
    }
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
