//--------------------------------TV/Movie Page -----------------------------
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAO-1qqiwYrkU1LRwx1uH1VPAIsEQh_pZs",
    authDomain: "gtcbc-click-counter-1.firebaseapp.com",
    databaseURL: "https://gtcbc-click-counter-1.firebaseio.com",
    projectId: "gtcbc-click-counter-1",
    storageBucket: "gtcbc-click-counter-1.appspot.com",
    messagingSenderId: "649973711502"
};
firebase.initializeApp(config);
var database = firebase.database();

// const auth = firebase.auth();
// auth.signInWithEmailAndPassword(email, password);
// auth.createUserWithEmailAndPassword(email, password);


//Create global variables
var movieQueryURL = "";
var tvQueryURL = "";
var suggestTVQueryURL = "";
var startDate = "";
var endDate = "";
var favoriteGenre = "";
var favoriteGenreID = 0;
var hasCustomGenre = false;
var startDateInput = "";
var endDateInput = "";
var genres = [{
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
];



database.ref().on('value', function (snapshot) {
    // If Firebase has a highPrice and highBidder stored (first case)
    if (snapshot.child("favoriteGenre").exists()) {
        hasCustomGenre = true

        event.preventDefault();
        $("#movie-row").empty();
        $("#tv-row").empty();
        $("#suggest-tv-row").empty();

        //Capture date in the input box
        var startDateInput = $("#startDate").val();
        startDate = new Date(startDateInput);
        newStartDate = startDate.setHours(startDate.getHours() + 7);

        var endDateInput = $("#endDate").val();
        endDate = new Date(endDateInput);
        newEndDate = endDate.setHours(endDate.getHours() + 7);

        // Set the variables for highBidder/highPrice equal to the stored values in firebase.
        favoriteGenre = snapshot.val().favoriteGenre;
        favoriteGenreID = snapshot.val().favoriteGenreID;
        // startDate = snapshot.val().startDate;
        // endDate = snapshot.val().endDate;

        generateURLs();
        getMovies();
        getTV();
        getSuggestedTV();
    }
});

$(document).ready(function () {
    $('.modal').modal();
});

//Get user's favorite genere from modal
$('#custom-button').click(function () {
    favoriteGenre = $("#favorite-genre").val()

    for (i = 0; i < genres.length; i++) {
        if (favoriteGenre === genres[i].name) {
            favoriteGenreID = genres[i].id;
            hasCustomGenre = true
        }
    }

    database.ref().set({
        favoriteGenre: favoriteGenre,
        favoriteGenreID: favoriteGenreID
    });

    console.log(favoriteGenreID);
});

//When a user clicks submit
$('#submit-button').click(function () {
    //Prevent default
    event.preventDefault();
    $("#movie-row").empty();
    $("#tv-row").empty();
    $("#suggest-tv-row").empty();

    //Capture date in the input box
    startDateInput = $("#startDate").val();
    console.log(startDateInput)
    startDate = new Date(startDateInput);
    newStartDate = startDate.setHours(startDate.getHours() + 7);

    endDateInput = $("#endDate").val();
    endDate = new Date(endDateInput);
    newEndDate = endDate.setHours(endDate.getHours() + 7);

    generateURLs();
    getMovies();
    getTV();
    if (hasCustomGenre === true) {
        getSuggestedTV();
    }


});

function generateURLs() {
    if (hasCustomGenre === true) {
        movieQueryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c472f72e061f4083caae81e6e937276a&primary_release_date.gte=" + startDateInput + "&primary_release_date.lte=" + endDateInput + "&language=en-US&sort_by=popularity.desc&with_genres=" + favoriteGenreID + "";
        tvQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&language=en&page=1&original_language=en&primary_release_date.gte=" + startDateInput + "&primary_release_date.lte=" + endDateInput + "&sort_by=popularity.desc";
        suggestTVQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&language=en&page=1&sort_by=popularity.desc&with_genres=" + favoriteGenreID + "";
    } else {
        movieQueryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c472f72e061f4083caae81e6e937276a&primary_release_date.gte=" + startDateInput + "&primary_release_date.lte=" + endDateInput + "&language=en-US&sort_by=popularity.desc";
        tvQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&language=en&page=1&primary_release_date.gte=" + startDateInput + "&primary_release_date.lte=" + endDateInput + "&sort_by=popularity.desc";
    }
}
//Axios request
function getMovies() {
    axios.get(movieQueryURL).then(function (response) {
        console.log(response)
        //TEST

        if (isNaN(startDate) || isNaN(endDate)) {
            var movieHeaderContainer = $('<div class="row">');
            var movieHeaderText = $('<h4>').text("Highest Rated " + favoriteGenre + " Movies out Today");
            movieHeaderText.appendTo(movieHeaderContainer);
            movieHeaderContainer.appendTo("#movie-row");
        } else {
            console.log(startDate);
            startMM = startDate.getMonth() + 1;
            startDD = startDate.getDate();
            startYYYY = startDate.getFullYear();
            var displayStartDate = startMM + "/" + startDD + "/" + startYYYY

            endMM = endDate.getMonth() + 1;
            endDD = endDate.getDate();
            endYYYY = endDate.getFullYear();
            var displayEndDate = endMM + "/" + endDD + "/" + endYYYY


            var movieHeaderContainer = $('<div class="row">');
            var movieHeaderText = $('<h4>').text("Highest Rated " + favoriteGenre + " Movies Between " + displayStartDate + " and " + displayEndDate);
            movieHeaderText.appendTo(movieHeaderContainer);
            movieHeaderContainer.appendTo("#movie-row");
        }
        var cardCount = 0
        for (var j = 0; cardCount < 4; j++) {
            if (response.data.results[j].original_language === 'en') {
                var name = response.data.results[j].original_title;
                var imageURL = response.data.results[j].poster_path;
                var overview = response.data.results[j].overview;

                var cardColumn = $('<div class="col s3">');

                var newCard = $('<div class="card-movie card">');

                var cardBody = $('<div class="card-image waves-effect waves-block waves-light">');
                var cardPic = $('<img class = "activator">');
                cardPic.attr('src', `https://image.tmdb.org/t/p/w200${imageURL}`);
                cardBody.append(cardPic);
                cardBody.appendTo(newCard);

                var cardContentHolder = $('<div class = "card-content">')
                var cardTitle = $('<span class="card-title activator grey-text text-darken-4">' + name + '<i class="material-icons right">more_vert</i></span>')
                var cardLink = $('<p></p>')

                cardContentHolder.append(cardTitle);
                cardContentHolder.append(cardLink);
                cardContentHolder.appendTo(newCard);

                var cardRevealHolder = $('<div class="card-reveal">')
                var cardRevealTitle = $('<span class="card-title grey-text text-darken-4">' + name + '<i class="material-icons right">close</i></span>')
                var cardRevealOverview = $('<p>' + overview + '</p>')

                cardRevealHolder.append(cardRevealTitle);
                cardRevealHolder.append(cardRevealOverview);
                cardRevealHolder.appendTo(newCard);


                newCard.appendTo(cardColumn);
                cardColumn.appendTo($("#movie-row"));
                cardCount++;
            }
        }
    });

};

function getTV() {
    axios.get(tvQueryURL).then(function (response) {
        //TEST
        console.log(response);

        //if (isNaN(startDate) || isNaN(endDate)) {
            var tvHeaderContainer = $('<div class="row">');
            var tvHeaderText = $('<h4>').text("Highest Rated TV Shows out Today");
            tvHeaderText.appendTo(tvHeaderContainer);
            tvHeaderContainer.appendTo("#tv-row");

        // } else {
        //     console.log(startDate);
        //     startMM = startDate.getMonth() + 1;
        //     startDD = startDate.getDate();
        //     startYYYY = startDate.getFullYear();
        //     var displayStartDate = startMM + "/" + startDD + "/" + startYYYY

        //     endMM = endDate.getMonth() + 1;
        //     endDD = endDate.getDate();
        //     endYYYY = endDate.getFullYear();
        //     var displayEndDate = endMM + "/" + endDD + "/" + endYYYY


        //     var tvHeaderContainer = $('<div class="row">');
        //     var tvHeaderText = $('<h4>').text("Highest Rated TV Shows Between " + displayStartDate + " and " + displayEndDate);
        //     tvHeaderText.appendTo(tvHeaderContainer);
        //     tvHeaderContainer.appendTo("#tv-row");
        // }
        var cardCount = 0
        for (var j = 0; cardCount < 4; j++) {
            if (response.data.results[j].original_language === 'en') {
                var name = response.data.results[j].original_name;
                var imageURL = response.data.results[j].poster_path;
                var overview = response.data.results[j].overview;

                var cardColumn = $('<div class="col s3">');

                var newCard = $('<div class="card-movie card">');

                var cardBody = $('<div class="card-image waves-effect waves-block waves-light">');
                var cardPic = $('<img class = "activator">');
                cardPic.attr('src', `https://image.tmdb.org/t/p/w200${imageURL}`);
                cardBody.append(cardPic);
                cardBody.appendTo(newCard);

                var cardContentHolder = $('<div class = "card-content">')
                var cardTitle = $('<span class="card-title activator grey-text text-darken-4">' + name + '<i class="material-icons right">more_vert</i></span>')
                var cardLink = $('<p></p>')

                cardContentHolder.append(cardTitle);
                cardContentHolder.append(cardLink);
                cardContentHolder.appendTo(newCard);

                var cardRevealHolder = $('<div class="card-reveal">')
                var cardRevealTitle = $('<span class="card-title grey-text text-darken-4">' + name + '<i class="material-icons right">close</i></span>')
                var cardRevealOverview = $('<p>' + overview + '</p>')

                cardRevealHolder.append(cardRevealTitle);
                cardRevealHolder.append(cardRevealOverview);
                cardRevealHolder.appendTo(newCard);


                newCard.appendTo(cardColumn);
                cardColumn.appendTo($("#tv-row"));

                cardCount++;
            }
        }


    });
};

function getSuggestedTV() {

    axios.get(suggestTVQueryURL).then(function (response) {
        //TEST
        console.log(response);

        var suggestTVHeaderContainer = $('<div class="row">');
        var suggestTVHeaderText = $('<h4>').text("TV Shows You May Be Interested in Based on Movie Preferences");
        suggestTVHeaderText.appendTo(suggestTVHeaderContainer);
        suggestTVHeaderContainer.appendTo("#suggest-tv-row");

        var cardCount = 0
        for (var j = 0; cardCount < 4; j++) {
            if (response.data.results[j].original_language === 'en') {
                var name = response.data.results[j].original_name;
                var imageURL = response.data.results[j].poster_path;
                var overview = response.data.results[j].overview;

                var cardColumn = $('<div class="col s3">');

                var newCard = $('<div class="card-movie card">');

                var cardBody = $('<div class="card-image waves-effect waves-block waves-light">');
                var cardPic = $('<img class = "activator">');
                cardPic.attr('src', `https://image.tmdb.org/t/p/w200${imageURL}`);
                cardBody.append(cardPic);
                cardBody.appendTo(newCard);

                var cardContentHolder = $('<div class = "card-content">')
                var cardTitle = $('<span class="card-title activator grey-text text-darken-4">' + name + '<i class="material-icons right">more_vert</i></span>')
                var cardLink = $('<p></p>')

                cardContentHolder.append(cardTitle);
                cardContentHolder.append(cardLink);
                cardContentHolder.appendTo(newCard);

                var cardRevealHolder = $('<div class="card-reveal">')
                var cardRevealTitle = $('<span class="card-title grey-text text-darken-4">' + name + '<i class="material-icons right">close</i></span>')
                var cardRevealOverview = $('<p>' + overview + '</p>')

                cardRevealHolder.append(cardRevealTitle);
                cardRevealHolder.append(cardRevealOverview);
                cardRevealHolder.appendTo(newCard);

                newCard.appendTo(cardColumn);
                cardColumn.appendTo($("#suggest-tv-row"));

                cardCount++;
            }
        }
    });
};