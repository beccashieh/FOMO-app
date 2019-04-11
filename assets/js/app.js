//Global variables
var apiKey = "10f8d0af1f97ab76b64e7be5940dcbd0";
var queryUrl =
  "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" +
  apiKey +
  "&limit=10&format=json";
//API call for Top 10 Artists
$(document).on("click", "#top-artists", function() {
  // Storing our giphy API URL

  var queryUrl =
    "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" +
    apiKey +
    "&limit=10&format=json";
  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    // Storing an array of artist names
    // console.log(response);
    var artistArray = response.artists.artist;
    // console.log(artistArray);
    // Looping over every result item
    for (var i = 0; i < artistArray.length; i++) {
      // Storing artist names
      var artistName = artistArray[i].name;
      var artistImage = artistArray[i].image[2];
      console.log(artistName);
      console.log(artistImage);
    }
  });
});

//API call for Top 10 Songs
$("#top-songs").click(function() {
  // Storing our giphy API URL
  var apiKey = "10f8d0af1f97ab76b64e7be5940dcbd0";
  var queryUrl =
    "https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=" +
    apiKey +
    "&limit=10&format=json";
  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    // Storing an array of artist names
    // console.log(response);
    var tracksArray = response.tracks.track;
    // console.log(tracksArray);
    // Looping over every result item
    for (var i = 0; i < tracksArray.length; i++) {
      // Storing artist names
      var trackName = tracksArray[i].name;
      var trackImage = tracksArray[i].image[2];
      console.log(trackName);
      console.log(trackImage);
    }
  });
});
