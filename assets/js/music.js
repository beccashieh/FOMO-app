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
var countryUrl = "https://restcountries.eu/rest/v2/all?fields=name";
var userLoggedIn = false;
var favArtist = "";

//Autocomplete function for country list
$(document).ready(function() {
  axios.get(countryUrl).then(function(response) {
    console.log(response);
    var countryArray = response.data;
    var dataCountry = {};
    for (var i = 0; i < countryArray.length; i++) {
      dataCountry[countryArray[i].name] = countryArray[i].flag; //countryArray[i].flag or null
    }
    $("input.autocomplete").autocomplete({
      data: dataCountry,
      limit: 2 // The max amount of results that can be shown at once. Default: Infinity.
    });
  });
});

$(document).ready(function() {
  $(".modal").modal();
});

$(document).ready(function() {
  $(".card").modal();
});

$(document).ready(function() {
  $(".sidenav").sidenav();
});

// listen for auth status changes
auth.onAuthStateChanged(user => {
  // CHANGE IF THE USER IS LOGGED IN
  if (user) {
    // runs every time something changes in the database
    db.collection("users")
      .doc(user.uid)
      .onSnapshot(doc => {
        $("#output").empty();

        userLoggedIn = true;
        userID = doc.id;
        favArtist = doc.data().artist;
        favoriteArtist();
      });
    //IF THE USER IS NOT LOGGED IN DO...
  } else {
    $("#output").empty();
    favArtist = "";
  }
});

// signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  // signup the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return db
        .collection("users")
        .doc(cred.user.uid)
        .set({
          genre: signupForm["favorite-genre"].value,
          artist: signupForm["music-artist"].value,
          newsTopic: signupForm["favorite-news-topic"].value
        });
    })
    .then(() => {
      // close modal and clear fields
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    });
});

// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", e => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  //get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // close modal and clear fields
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});

//Top 10 Artists function
$(document).on("click", "#top-artists-button", function() {
  //Clear output section
  $("#output").empty();
  // Perfoming an AJAX GET request to our queryURL
  axios.get(topArtistQueryUrl).then(function(response) {
    // Storing an array of artist names
    var artistArray = response.data.artists.artist;
    // console.log(artistArray);
    // Looping over every result item
    for (var i = artistArray.length - 1; i >= 0; i--) {
      var newCard = $("<div>");
      newCard.attr("class", "card small artist-item");
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
      cardColumn.attr("class", "col s12 m6 l2");
      newCard.prependTo(cardColumn);
      cardColumn.prependTo($("#output"));
    }
  });
});

//Top 10 Songs function
$("#top-songs-button").click(function() {
  // Clear output section
  $("#output").empty();
  // Perfoming an AJAX GET request to our queryURL
  axios.get(topSongQueryUrl).then(function(response) {
    // Storing an array of artist names
    var tracksArray = response.data.tracks.track;
    for (var i = tracksArray.length - 1; i >= 0; i--) {
      var newCard = $("<div>");
      newCard.attr("class", "card small song-item");
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
      cardColumn.attr("class", "col s12 m6 l2");
      newCard.appendTo(cardColumn);
      cardColumn.prependTo($("#output"));
    }
  });
});

//Top 10 Artists by Country function
$("#top-artist-country-button").click(function() {
  country = $("#country-input").val();
  var topArtistbyCountryUrl =
    "https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=" +
    country +
    "&api_key=" +
    apiKey +
    "&limit=10&format=json";
  //Clear output section
  $("#output").empty();
  // Perfoming an AJAX GET request to our queryURL
  console.log(country);
  axios.get(topArtistbyCountryUrl).then(function(response) {
    console.log(response);
    // Storing an array of artist names
    var artistArray = response.data.topartists.artist;
    // console.log(artistArray);
    // Looping over every result item
    // console.log(response);
    for (var i = artistArray.length - 1; i >= 0; i--) {
      var newCard = $("<div>");
      newCard.attr("class", "card small artist-item");
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
      cardColumn.attr("class", "col s12 m6 l2");
      newCard.appendTo(cardColumn);
      cardColumn.prependTo($("#output"));
    }
  });
});

//Top 10 Songs by Country function
$("#top-songs-country-button").click(function() {
  country = $("#country-input").val();
  var topSongsbyCountryUrl =
    "https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=" +
    country +
    "&api_key=" +
    apiKey +
    "&limit=10&format=json";
  //Clear output section
  $("#output").empty();
  console.log(country);
  // Perfoming an AJAX GET request to our queryURL
  axios.get(topSongsbyCountryUrl).then(function(response) {
    console.log(response);
    // Storing an array of artist names
    var tracksArray = response.data.tracks.track;
    // console.log(artistArray);
    // Looping over every result item
    // console.log(response);
    for (var i = tracksArray.length - 1; i >= 0; i--) {
      var newCard = $("<div>");
      newCard.attr("class", "card small song-item");
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
      cardColumn.attr("class", "col s12 m6 l2");
      newCard.appendTo(cardColumn);
      cardColumn.prependTo($("#output"));
    }
  });
});

function favoriteArtist() {
  // Find similar artists to favorite artist
  var similarArtistUrl =
    "https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" +
    favArtist +
    "&api_key=" +
    apiKey +
    "&limit=6&format=json";
  //Clear output section
  $("#output").empty();
  // Perfoming an AJAX GET request to our queryURL
  axios.get(similarArtistUrl).then(function(response) {
    console.log(response);
    // Storing an array of artist names
    var artistArray = response.data.similarartists.artist;
    // console.log(artistArray);
    // Looping over every result item
    // console.log(response);
    for (var i = artistArray.length - 1; i >= 0; i--) {
      var newCard = $("<div>");
      newCard.attr("class", "card small artist-item");
      // Storing artist names
      var artistName = artistArray[i].name;
      // Storing URL for artist image
      var artistImage = artistArray[i].image[3]["#text"];
      // Storing URL for arist last.fm page
      var artistUrl = artistArray[i].url;
      // Creating artist rank variable
      // var artistRank = i + 1;
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
      // cardBody.append("<h5> # " + artistRank + "</h5>");
      cardBody.append("<h5>" + artistName + "</h5>");
      cardBody.appendTo(newCard);
      var cardLinks = $("<div>");
      cardLinks.attr("class", "card-action");
      var cardColumn = $("<div>");
      cardColumn.attr("class", "col s12 m6 l2");
      newCard.appendTo(cardColumn);
      cardColumn.prependTo($("#output"));
    }
    // Adds title above output
    var artistTitle = $("<h3>");
    artistTitle.text("Artists similar to " + favArtist);
    artistTitle.prependTo("#output");
  });
}
