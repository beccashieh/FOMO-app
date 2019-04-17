// //--------------------------------TV/Movie Page -----------------------------
// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyCh071lx7bhqjjnj28RYQNvOpOMTCcqWUo",
//     authDomain: "fomo-nomo-2442f.firebaseapp.com",
//     databaseURL: "https://fomo-nomo-2442f.firebaseio.com",
//     projectId: "fomo-nomo-2442f",
//     storageBucket: "fomo-nomo-2442f.appspot.com",
//     messagingSenderId: "1064584092617"
// };
// firebase.initializeApp(config);
// var database = firebase.database();

// //Create global variables
// var movieQueryURL = "";
// var tvQueryURL = "";
// var suggestTVQueryURL = "";
// var startDate = "";
// var endDate = "";
// var favoriteGenre = "";
// var favoriteGenreID = 0;
// var hasCustomGenre = false;
// var startDateInput = "";
// var endDateInput = "";


let movieQueryURL = '';
let tvQueryURL = '';
let recTVQueryURL = '';
let genre = '';
let genreID = 0;
let userID = "";
let userLoggedIn = false;
let startDateInput = '';
let endDateInput = '';
let startDateDisplay = '';
let endDateDisplay = '';
let hasDateInput = false;
let genreOptions = [{
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
            $("#movie-row").empty();
            $("#tv-row").empty();
            $("#suggestTV-row").empty();

            userLoggedIn = true;
            userID = doc.id;
            genre = doc.data().genre;
            genre = genre.charAt(0).toUpperCase() + genre.slice(1);
            console.log(genre);
            console.log(userID);

            generateGenreID();
            generateCustomURLs();
            getMovies();
            getTV();
            getSuggestedTV();

        });
    } else {
        $("#movie-row").empty();
        $("#tv-row").empty();
        $("#suggestTV-row").empty();
        console.log('user logged out');
        genre = '';
        generateGenreID();
        generateGenericURLs();
        getMovies();
        getTV();
        $("#suggestTV-header").css("display", "none");
    }
});

// edit favorite genre
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('users').doc(userID).update({
        genre: createForm['genre'].value
    }).then(() => {
        // close modal and clear fields
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    });
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
            genre: signupForm['favorite-genre'].value
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

const generateGenreID = () => {
    for (i = 0; i < genreOptions.length; i++) {
        if (genre === genreOptions[i].name) {
            genreID = genreOptions[i].id;
        }
    }
}

const generateGenericURLs = () => {
    movieQueryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c472f72e061f4083caae81e6e937276a&sort_by=popularity.desc";
    tvQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&sort_by=popularity.desc";
    suggestTVQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&language=en&page=1&sort_by=popularity.desc";
}
const generateCustomURLs = () => {
    console.log(hasDateInput)

    if (hasDateInput === false) {
        movieQueryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c472f72e061f4083caae81e6e937276a&sort_by=popularity.desc&with_genres=" + genreID + "";
        tvQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&sort_by=popularity.desc";
        suggestTVQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&language=en&page=1&sort_by=popularity.desc&with_genres=" + genreID + "";
    } else if (hasDateInput === true){
        movieQueryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c472f72e061f4083caae81e6e937276a&with_genres=" + genreID + "&primary_release_date.gte=" + startDateInput + "&primary_release_date.lte=" + endDateInput + "&sort_by=popularity.desc";
        tvQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&sort_by=popularity.desc";
        suggestTVQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&language=en&page=1&sort_by=popularity.desc&with_genres=" + genreID + "";
    }
}

const movieList = document.querySelector('#movie-row');
// Axios request
function getMovies() {
    axios.get(movieQueryURL).then(function (response) {
        console.log(response)

        // generate section header
        if (userLoggedIn === true && hasDateInput === false) {
            $("#movie-header").css("display", "block").text(`Top ${genre} Movies Available Today`);
        } else if (userLoggedIn === true && hasDateInput === true) {
            $("#movie-header").css("display", "block").text(`Top ${genre} Movies from ${startDateDisplay} to ${endDateDisplay}`);
        } else {
            $("#movie-header").css("display", "block").text(`Most Popular Movies Available Today`);
        }

        var html = '';
        let cardCount = 0;
        for (let j = 0; cardCount < 6; j++) {
            if (response.data.results[j].original_language === 'en') {
                var name = response.data.results[j].original_title;
                var imageURL = response.data.results[j].poster_path;
                var overview = response.data.results[j].overview;

                let cardItem = `
                <div class="col l2 col m4 col s4">
                    <div class = "card">
                        <div class = "card-image waves-effect waves-block waves-light">
                            <img class = "activator" src = "https://image.tmdb.org/t/p/w200${imageURL}">
                        </div> 

                        <div class = "card-content">
                            <span class = "card-title activator grey-text text-darken-4"> ${name} 
                                <i class = "material-icons right"> more_vert </i>
                            </span>
                        </div> 
                        
                        <div class = "card-reveal">
                            <span class = "card-title grey-text text-darken-4"> 
                                <i class = "material-icons right"> close </i>
                                ${name}
                            </span>
                            <p>${overview}</p> 
                        </div> 
                    </div>
                </div>
                `;
                html = html + cardItem;
                cardCount++;
            }
        }
        movieList.innerHTML = html
    });

};

const suggestTVList = document.querySelector('#tv-row');

function getTV() {
    axios.get(tvQueryURL).then(function (response) {
        console.log(response)

        // generate section header
        $("#tv-header").css("display", "block").text(`Most Popular TV Shows Available Today`);


        var html = '';
        let cardCount = 0;
        for (let j = 0; cardCount < 6; j++) {
            if (response.data.results[j].original_language === 'en') {
                var name = response.data.results[j].original_name;
                var imageURL = response.data.results[j].poster_path;
                var overview = response.data.results[j].overview;

                let cardItem = `
                <div class="col l2 col m4 col s4">
                    <div class = "card">
                        <div class = "card-image waves-effect waves-block waves-light">
                            <img class = "activator" src = "https://image.tmdb.org/t/p/w200${imageURL}">
                        </div> 

                        <div class = "card-content">
                            <span class = "card-title activator grey-text text-darken-4"> ${name} 
                                <i class = "material-icons right"> more_vert </i>
                            </span>
                        </div> 
                        
                        <div class = "card-reveal">
                            <span class = "card-title grey-text text-darken-4"> 
                                <i class = "material-icons right"> close </i>
                                ${name}
                            </span>
                            <p>${overview}</p> 
                        </div> 
                    </div>
                </div>
                `;
                html = html + cardItem;
                cardCount++;
            }
        }
        suggestTVList.innerHTML = html
    });

};

const tvList = document.querySelector('#suggestTV-row');

function getSuggestedTV() {

    axios.get(suggestTVQueryURL).then(function (response) {

        console.log(response)

        // generate section header
        $("#suggestTV-header").css("display", "block").text(`Suggested TV Shows Based on Your Movie Preferences`);

        var html = '';
        let cardCount = 0;
        for (let j = 0; cardCount < 6; j++) {
            if (response.data.results[j].original_language === 'en') {
                var name = response.data.results[j].original_name;
                var imageURL = response.data.results[j].poster_path;
                var overview = response.data.results[j].overview;

                let cardItem = `
                <div class="col l2 col m4 col s4">
                    <div class = "card">
                        <div class = "card-image waves-effect waves-block waves-light">
                            <img class = "activator" src = "https://image.tmdb.org/t/p/w200${imageURL}">
                        </div> 

                        <div class = "card-content">
                            <span class = "card-title activator grey-text text-darken-4"> ${name} 
                                <i class = "material-icons right"> more_vert </i>
                            </span>
                        </div> 
                        
                        <div class = "card-reveal">
                            <span class = "card-title grey-text text-darken-4"> 
                                <i class = "material-icons right"> close </i>
                                ${name}
                            </span>
                            <p>${overview}</p> 
                        </div> 
                    </div>
                </div>
                `;
                html = html + cardItem;
                cardCount++;
            }
        }
        tvList.innerHTML = html
    });

};

$('#date-button').click(function () {
    //Prevent default
    event.preventDefault();
    $("#movie-row").empty();
    $("#tv-row").empty();
    $("#suggest-tv-row").empty();

    hasDateInput = true;

    //Capture date in the input box
    startDateInput = $("#startDate").val();
    let startDateObj = new Date(startDateInput);
    startDateObj.setHours(startDateObj.getHours() + 7);


    let startMM = startDateObj.getMonth() + 1;
    let startDD = startDateObj.getDate();
    let startYYYY = startDateObj.getFullYear();
    startDateDisplay = startMM + "/" + startDD + "/" + startYYYY

    endDateInput = $("#endDate").val();
    let endDateObj = new Date(endDateInput);
    endDateObj.setHours(endDateObj.getHours() + 7);

    let endMM = endDateObj.getMonth() + 1;
    let endDD = endDateObj.getDate();
    let endYYYY = endDateObj.getFullYear();
    endDateDisplay = endMM + "/" + endDD + "/" + endYYYY

    //generateGenreID();
    generateCustomURLs();
    getMovies();
    getTV();
    getSuggestedTV();

});








// //setup cards
// function setupCards (data) {
//     if (data.length) {
//         let html = '';
//         data.forEach(doc => {
//             card = doc.data();
//             const li = `
//         <li>
//             <div class = "collapsible-header grey lighten-4">${card.title}</div>
//             <div class = "collapsible-body white">${card.content}</div>
//         </li>
//         `;
//             html += li
//         });

//         cards.innerHTML = html
//     } else {
//         cards.innerHTML = `<h5 class="center-align">Login to view movies</h5>`
//     }
// };


// //Get user's favorite genere from modal
// $('#custom-button').click(function () {
//     favoriteGenre = $("#favorite-genre").val()

//     for (i = 0; i < genres.length; i++) {
//         if (favoriteGenre === genres[i].name) {
//             favoriteGenreID = genres[i].id;
//             hasCustomGenre = true
//         }
//     }

//     database.ref().set({
//         favoriteGenre: favoriteGenre,
//         favoriteGenreID: favoriteGenreID
//     });

//     console.log(favoriteGenreID);
// });

// //When a user clicks submit
// $('#submit-button').click(function () {
//     //Prevent default
//     event.preventDefault();
//     $("#movie-row").empty();
//     $("#tv-row").empty();
//     $("#suggest-tv-row").empty();

//     //Capture date in the input box
//     startDateInput = $("#startDate").val();
//     console.log(startDateInput)
//     startDate = new Date(startDateInput);
//     newStartDate = startDate.setHours(startDate.getHours() + 7);

//     endDateInput = $("#endDate").val();
//     endDate = new Date(endDateInput);
//     newEndDate = endDate.setHours(endDate.getHours() + 7);

//     generateURLs();
//     getMovies();
//     getTV();
//     if (hasCustomGenre === true) {
//         getSuggestedTV();
//     }


// });

// function generateURLs() {
//     if (hasCustomGenre === true) {
//         movieQueryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c472f72e061f4083caae81e6e937276a&primary_release_date.gte=" + startDateInput + "&primary_release_date.lte=" + endDateInput + "&language=en-US&sort_by=popularity.desc&with_genres=" + favoriteGenreID + "";
//         tvQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&sort_by=popularity.desc";
//         suggestTVQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&language=en&page=1&sort_by=popularity.desc&with_genres=" + favoriteGenreID + "";
//     } else {
//         movieQueryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c472f72e061f4083caae81e6e937276a&primary_release_date.gte=" + startDateInput + "&primary_release_date.lte=" + endDateInput + "&language=en-US&sort_by=popularity.desc";
//         tvQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&language=en&page=1&sort_by=popularity.desc";
//     }
// }
// //Axios request
// function getMovies() {
//     axios.get(movieQueryURL).then(function (response) {
//         console.log(response)
//         //TEST

//         if (isNaN(startDate) || isNaN(endDate)) {
//             var movieHeaderContainer = $('<div class="row">');
//             var movieHeaderText = $('<h4>').text("Highest Rated " + favoriteGenre + " Movies out Today");
//             movieHeaderText.appendTo(movieHeaderContainer);
//             movieHeaderContainer.appendTo("#movie-row");
//         } else {
//             console.log(startDate);
//             startMM = startDate.getMonth() + 1;
//             startDD = startDate.getDate();
//             startYYYY = startDate.getFullYear();
//             var displayStartDate = startMM + "/" + startDD + "/" + startYYYY

//             endMM = endDate.getMonth() + 1;
//             endDD = endDate.getDate();
//             endYYYY = endDate.getFullYear();
//             var displayEndDate = endMM + "/" + endDD + "/" + endYYYY


//             var movieHeaderContainer = $('<div class="row">');
//             var movieHeaderText = $('<h4>').text("Highest Rated " + favoriteGenre + " Movies Between " + displayStartDate + " and " + displayEndDate);
//             movieHeaderText.appendTo(movieHeaderContainer);
//             movieHeaderContainer.appendTo("#movie-row");
//         }
//         var cardCount = 0
//         for (var j = 0; cardCount < 6; j++) {
//             if (response.data.results[j].original_language === 'en') {
//                 var name = response.data.results[j].original_title;
//                 var imageURL = response.data.results[j].poster_path;
//                 var overview = response.data.results[j].overview;

//                 var cardColumn = $('<div class="col m2 col s4 ">');

//                 var newCard = $('<div class="card-movie card">');

//                 var cardBody = $('<div class="card-image waves-effect waves-block waves-light">');
//                 var cardPic = $('<img class = "activator">');
//                 cardPic.attr('src', `https://image.tmdb.org/t/p/w200${imageURL}`);
//                 cardBody.append(cardPic);
//                 cardBody.appendTo(newCard);

//                 var cardContentHolder = $('<div class = "card-content">')
//                 var cardTitle = $('<span class="card-title activator grey-text text-darken-4">' + name + '<i class="material-icons right">more_vert</i></span>')
//                 var cardLink = $('<p></p>')

//                 cardContentHolder.append(cardTitle);
//                 cardContentHolder.append(cardLink);
//                 cardContentHolder.appendTo(newCard);

//                 var cardRevealHolder = $('<div class="card-reveal">')
//                 var cardRevealTitle = $('<span class="card-title grey-text text-darken-4">' + name + '<i class="material-icons right">close</i></span>')
//                 var cardRevealOverview = $('<p>' + overview + '</p>')

//                 cardRevealHolder.append(cardRevealTitle);
//                 cardRevealHolder.append(cardRevealOverview);
//                 cardRevealHolder.appendTo(newCard);


//                 newCard.appendTo(cardColumn);
//                 cardColumn.appendTo($("#movie-row"));
//                 cardCount++;
//             }
//         }
//     });

// };

// function getTV() {
//     axios.get(tvQueryURL).then(function (response) {
//         //TEST
//         console.log(response);

//         //if (isNaN(startDate) || isNaN(endDate)) {
//             var tvHeaderContainer = $('<div class="row">');
//             var tvHeaderText = $('<h4>').text("Highest Rated TV Shows out Today");
//             tvHeaderText.appendTo(tvHeaderContainer);
//             tvHeaderContainer.appendTo("#tv-row");

//         // } else {
//         //     console.log(startDate);
//         //     startMM = startDate.getMonth() + 1;
//         //     startDD = startDate.getDate();
//         //     startYYYY = startDate.getFullYear();
//         //     var displayStartDate = startMM + "/" + startDD + "/" + startYYYY

//         //     endMM = endDate.getMonth() + 1;
//         //     endDD = endDate.getDate();
//         //     endYYYY = endDate.getFullYear();
//         //     var displayEndDate = endMM + "/" + endDD + "/" + endYYYY


//         //     var tvHeaderContainer = $('<div class="row">');
//         //     var tvHeaderText = $('<h4>').text("Highest Rated TV Shows Between " + displayStartDate + " and " + displayEndDate);
//         //     tvHeaderText.appendTo(tvHeaderContainer);
//         //     tvHeaderContainer.appendTo("#tv-row");
//         // }


//         var cardCount = 0

//         for (var j = 0; cardCount < 6; j++) {
//             //var responseFirstAir = Date.parse(response.data.results[j].first_air_date);
//            // var startDateMS = Date.parse(startDate);
//             //console.log(responseFirstAir);
//             if (response.data.results[j].original_language === 'en') {
//                 var name = response.data.results[j].original_name;
//                 var imageURL = response.data.results[j].poster_path;
//                 var overview = response.data.results[j].overview;

//                 var cardColumn = $('<div class="col m2 col s4">');

//                 var newCard = $('<div class="card-movie card">');

//                 var cardBody = $('<div class="card-image waves-effect waves-block waves-light">');
//                 var cardPic = $('<img class = "activator">');
//                 cardPic.attr('src', `https://image.tmdb.org/t/p/w200${imageURL}`);
//                 cardBody.append(cardPic);
//                 cardBody.appendTo(newCard);

//                 var cardContentHolder = $('<div class = "card-content">')
//                 var cardTitle = $('<span class="card-title activator grey-text text-darken-4">' + name + '<i class="material-icons right">more_vert</i></span>')
//                 var cardLink = $('<p></p>')

//                 cardContentHolder.append(cardTitle);
//                 cardContentHolder.append(cardLink);
//                 cardContentHolder.appendTo(newCard);

//                 var cardRevealHolder = $('<div class="card-reveal">')
//                 var cardRevealTitle = $('<span class="card-title grey-text text-darken-4">' + name + '<i class="material-icons right">close</i></span>')
//                 var cardRevealOverview = $('<p>' + overview + '</p>')

//                 cardRevealHolder.append(cardRevealTitle);
//                 cardRevealHolder.append(cardRevealOverview);
//                 cardRevealHolder.appendTo(newCard);


//                 newCard.appendTo(cardColumn);
//                 cardColumn.appendTo($("#tv-row"));

//                 cardCount++;
//             }
//         }


//     });
// };

// function getSuggestedTV() {

//     axios.get(suggestTVQueryURL).then(function (response) {
//         //TEST
//         console.log(response);

//         var suggestTVHeaderContainer = $('<div class="row">');
//         var suggestTVHeaderText = $('<h4>').text("TV Shows You May Be Interested in Based on Movie Preferences");
//         suggestTVHeaderText.appendTo(suggestTVHeaderContainer);
//         suggestTVHeaderContainer.appendTo("#suggest-tv-row");

//         var cardCount = 0
//         for (var j = 0; cardCount < 6; j++) {
//             if (response.data.results[j].original_language === 'en') {
//                 var name = response.data.results[j].original_name;
//                 var imageURL = response.data.results[j].poster_path;
//                 var overview = response.data.results[j].overview;

//                 var cardColumn = $('<div class="col m2 col s4">');

//                 var newCard = $('<div class="card-movie card">');

//                 var cardBody = $('<div class="card-image waves-effect waves-block waves-light">');
//                 var cardPic = $('<img class = "activator">');
//                 cardPic.attr('src', `https://image.tmdb.org/t/p/w200${imageURL}`);
//                 cardBody.append(cardPic);
//                 cardBody.appendTo(newCard);

//                 var cardContentHolder = $('<div class = "card-content">')
//                 var cardTitle = $('<span class="card-title activator grey-text text-darken-4">' + name + '<i class="material-icons right">more_vert</i></span>')
//                 var cardLink = $('<p></p>')

//                 cardContentHolder.append(cardTitle);
//                 cardContentHolder.append(cardLink);
//                 cardContentHolder.appendTo(newCard);

//                 var cardRevealHolder = $('<div class="card-reveal">')
//                 var cardRevealTitle = $('<span class="card-title grey-text text-darken-4">' + name + '<i class="material-icons right">close</i></span>')
//                 var cardRevealOverview = $('<p>' + overview + '</p>')

//                 cardRevealHolder.append(cardRevealTitle);
//                 cardRevealHolder.append(cardRevealOverview);
//                 cardRevealHolder.appendTo(newCard);

//                 newCard.appendTo(cardColumn);
//                 cardColumn.appendTo($("#suggest-tv-row"));

//                 cardCount++;
//             }
//         }
//     });
// //};