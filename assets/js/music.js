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

var countryList = [
  "Afghanistan",
  "Aland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo, Democratic Republic of the",
  "Cook Islands",
  "Costa Rica",
  "Côte d'Ivoire",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (Malvinas)",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (Democratic People's Republic of)",
  "Korea, Republic of",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova, Republic of",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "North Macedonia",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Réunion",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan, Province of China",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom of Great Britain and Northern Ireland",
  "United States of America",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];

$(document).ready(function () {
  $('.modal').modal();
});

$(document).ready(function () {
  $('.card').modal();
});

//listen for auth status changes
auth.onAuthStateChanged(user => {
  // CHANGE IF THE USER IS LOGGED IN
  if (user) {
    // runs every time something changes in the database
    db.collection('users').doc(user.uid).onSnapshot(doc => {


    });
  //IF THE USER IS NOT LOGGED IN DO...
  } else {

  }
});


// signup
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // signup the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      genre: signupForm['favorite-genre'].value,
      artist: signupForm['music-artist'].value,
      newsTopic: signupForm['favorite-news-topic'].value
    });
  }).then(() => {
    // close modal and clear fields
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // close modal and clear fields
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
















//Autocomplete function
$(document).ready(function() {
  $("input.autocomplete").autocomplete({ source: countryList });
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

//Top 10 Songs function
$("#top-songs-button").click(function() {
  // Clear output section
  $("#output").empty();
  // Perfoming an AJAX GET request to our queryURL
  axios.get(topSongQueryUrl).then(function(response) {
    // Storing an array of artist names
    var tracksArray = response.data.tracks.track;
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
