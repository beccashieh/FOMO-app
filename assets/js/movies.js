// //--------------------------------TV/Movie Page -----------------------------

// global variables
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
let displayFavoriteMovies = false;
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

// initialize modals
$(document).ready(function () {
    $('.modal').modal();
});

$(document).ready(function () {
    $('.card').modal();
});



//listen for auth status changes
auth.onAuthStateChanged(user => {
    console.log(displayFavoriteMovies);
    // CHANGE IF THE USER IS LOGGED IN
    if (user) {
        // runs every time something changes in the database
        db.collection('users').doc(user.uid).onSnapshot(doc => {
            $("#movie-row").empty();
            $("#tv-row").empty();
            $("#suggestTV-row").empty();
            //favoriteMovieArr = [];
            $("#favorite-movie-row").empty();
            // signifies that the user is logged in
            userLoggedIn = true;
            userID = doc.id;
            // capture genre and make it uppercase
            genre = doc.data().genre;
            genre = genre.charAt(0).toUpperCase() + genre.slice(1);
            // capture favorite movie ids
            favoriteMovieArr = doc.data().favoriteMovieID;
            // get the genre id
            generateGenreID();
            // create urls using the genre ids
            generateCustomURLs();
            // get the movies from the api
            getMovies();
            // get the tv shows from the api
            getTV();
            // suggest tv shows based on movie preference
            getSuggestedTV();
            // if favorite movies are showing, empty the div and reshow the new favorite movie list
            // if (displayFavoriteMovies === true) {
            //     $("#favorite-movie-row").html('');
            //     generateFavoriteMovies();
            // }

            // $("#see-favorite-movie-btn").css("display", "block");

            // $('.add-favorite-btn').css("display", "block");

        });
    } else {
        $("#movie-row").empty();
        $("#tv-row").empty();
        $("#suggestTV-row").empty();
        $("#favorite-movie-row").empty();
        displayFavoriteMovies = false;

        // empty genre
        genre = '';
        // generate ids for all popular movies
        generateGenreID();
        // generate urls for all popular movies
        generateGenericURLs();
        // get the popular movies
        getMovies();
        // get the popular tv shows
        getTV();
        // hide the suggested movies
        $("#suggestTV-header").css("display", "none");

        // $("#see-favorite-movie-btn").css("display", "none");

        // $('.add-favorite-btn').css("display", "none");

        // $('#favorite-movie-header').css("display", "none");


    }
});

// edit favorite genre
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // padate the favorite genre value for the user
    db.collection('users').doc(userID).update({
        genre: createForm['genre'].value
    }).then(() => {
        // close modal and clear fields
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    });
});



// // generate favorite movies
// $("#see-favorite-movie-btn").on('click', function () {
//     // if the movies are already showing, hide the favorite movie div
//     // if not, show the favorite movie cards
//     if (displayFavoriteMovies === true) {
//         displayFavoriteMovies = false;
//         console.log(displayFavoriteMovies);
//         $("#favorite-movie-row").empty();
//         $('#favorite-movie-header').css('display', 'none');
//         $('#favorite-movie-row').css('display', 'none');
//     } else {
        
//         displayFavoriteMovies = true;
//         console.log(displayFavoriteMovies);
//         $("#favorite-movie-row").empty();
//         generateFavoriteMovies();

//     }
// });

// // show favorite movies
// function showFavoriteMovies() {
//     $("#favorite-movie-row").empty();
//     displayFavoriteMovies = true;

// }

// signup
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // signup the user and set values in db
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
    displayFavoriteMovies = false;
    userLoggedIn = false;
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    displayFavoriteMovies = false;

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

// generate genre id using the genreOptions array
const generateGenreID = () => {
    for (i = 0; i < genreOptions.length; i++) {
        if (genre === genreOptions[i].name) {
            genreID = genreOptions[i].id;
        }
    }
}

// generate generic URLs since no user is logged in
const generateGenericURLs = () => {
    movieQueryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c472f72e061f4083caae81e6e937276a&sort_by=popularity.desc";
    tvQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&sort_by=popularity.desc";
    suggestTVQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&language=en&page=1&sort_by=popularity.desc";
}

// generate URLs based on user preference
const generateCustomURLs = () => {
    // if there is a date input, customize URLs for those dates
    if (hasDateInput === false) {
        movieQueryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c472f72e061f4083caae81e6e937276a&sort_by=popularity.desc&with_genres=" + genreID + "";
        tvQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&sort_by=popularity.desc";
        suggestTVQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&language=en&page=1&sort_by=popularity.desc&with_genres=" + genreID + "";
    } else if (hasDateInput === true && genre !== '') {
        movieQueryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c472f72e061f4083caae81e6e937276a&with_genres=" + genreID + "&primary_release_date.gte=" + startDateInput + "&primary_release_date.lte=" + endDateInput + "&sort_by=popularity.desc";
        tvQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&sort_by=popularity.desc";
        suggestTVQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&language=en&page=1&sort_by=popularity.desc&with_genres=" + genreID + "";
    } else if (hasDateInput === true && genre === '') {
        movieQueryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c472f72e061f4083caae81e6e937276a&primary_release_date.gte=" + startDateInput + "&primary_release_date.lte=" + endDateInput + "&sort_by=popularity.desc";
        tvQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&sort_by=popularity.desc";

    }
    console.log(movieQueryURL);
}

// generate cards for favorite movies stored in db
// const generateFavoriteMovies = () => {
//     $("#favorite-movie-row").empty();
//     // for all of the ids in the favoriteMovieArr, create a card containing that movie
//     for (let i = 0; i < favoriteMovieArr.length; i++) {
//         //generate url for axios call
//         movieQueryURL = "https://api.themoviedb.org/3/movie/" + favoriteMovieArr[i] + "?api_key=c472f72e061f4083caae81e6e937276a&language=en-US";
//         // axios call
//         axios.get(movieQueryURL).then(function (response) {

//             // generate section header and show the row
//             $("#favorite-movie-header").css("display", "block").text(`Your Favorite Movies`);
//             $('#favorite-movie-row').css('display', 'block');
//             // create card if the movie's language is in english (can be changed for internation product)
//             var html = '';
//             if (response.data.original_language === 'en') {
//                 let name = response.data.original_title;
//                 let imageURL = response.data.poster_path;
//                 let overview = response.data.overview;
//                 let id = response.data.id;

//                 let cardItem = `
//                 <div class="col l2 col m4 col s4">
//                     <div class = "card">
//                         <div class = "card-image waves-effect waves-block waves-light">
//                             <img class = "activator" src = "https://image.tmdb.org/t/p/w200${imageURL}">
//                         </div> 

//                         <div class = "card-content">
//                             <span class = "card-title activator grey-text text-darken-4"> ${name} 
//                                 <i class = "material-icons right"> more_vert </i>
//                             </span>
//                         </div> 
                        
//                         <div class = "card-reveal">
//                             <span class = "card-title grey-text text-darken-4"> 
//                                 <i class = "material-icons right"> close </i>
//                                 ${name}
//                             </span>
//                             <p>${overview}</p> 
//                         </div> 
//                         <button class="btn btn-success waves-effect waves-light red accent-2 hoverbale remove-favorite-btn"> Remove as Favorite </button>
//                     </div>
//                 </div>
//                 `;
//                 html = html + cardItem;

//             }
//             // append to favorite movie row
//             $("#favorite-movie-row").append(html);
//             // run the remove function that will only fire if a user clicks on remove button
//             removeFavoriteMovieToDB();

//         });
//     }
//     // tvQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&sort_by=popularity.desc";
//     // suggestTVQueryURL = "https://api.themoviedb.org/3/discover/tv?api_key=c472f72e061f4083caae81e6e937276a&language=en&page=1&sort_by=popularity.desc";
// }

// get movies based on user preference, or generic url
const movieList = document.querySelector('#movie-row');
// Axios request
function getMovies() {
    axios.get(movieQueryURL).then(function (response) {

        // generate section header
        if (userLoggedIn === true && hasDateInput === false) {
            $("#movie-header").css("display", "block").text(`Top ${genre} Movies Available Today`);
        } else if (userLoggedIn === true && hasDateInput === true) {
            $("#movie-header").css("display", "block").text(`Top ${genre} Movies from ${startDateDisplay} to ${endDateDisplay}`);
        } else {
            $("#movie-header").css("display", "block").text(`Most Popular Movies Available Today`);
        }
        // create cards
        var html = '';
        let cardCount = 0;
        for (let j = 0; cardCount < 6; j++) {
            if (response.data.results[j].original_language === 'en') {
                let name = response.data.results[j].original_title;
                let imageURL = response.data.results[j].poster_path;
                let overview = response.data.results[j].overview;
                let id = response.data.results[j].id;

                let cardItem = `
                <div class="col l2 col m6 col s12">
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
// get most popular tv shows right now
const tvList = document.querySelector('#tv-row');

function getTV() {
    //axios call
    axios.get(tvQueryURL).then(function (response) {
        // generate section header
        $("#tv-header").css("display", "block").text(`Most Popular TV Shows Available Today`);
        //Create cards
        var html = '';
        let cardCount = 0;
        for (let j = 0; cardCount < 6; j++) {
            if (response.data.results[j].original_language === 'en') {
                var name = response.data.results[j].original_name;
                var imageURL = response.data.results[j].poster_path;
                var overview = response.data.results[j].overview;

                let cardItem = `
                <div class = "col l2 col m6 col s12">
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
        // call add or remove favorite movie function since page has loaded
        //addFavoriteMovieToDB();
        //removeFavoriteMovieToDB();
    });
};
// get suggested tv shows base on movie prefferences
const suggestTVList = document.querySelector('#suggestTV-row');

function getSuggestedTV() {
    //axios call
    axios.get(suggestTVQueryURL).then(function (response) {
        // generate section header
        $("#suggestTV-header").css("display", "block").text(`Suggested TV Shows Based on Your Movie Preferences`);
        //create cards
        var html = '';
        let cardCount = 0;
        for (let j = 0; cardCount < 6; j++) {
            if (response.data.results[j].original_language === 'en') {
                var name = response.data.results[j].original_name;
                var imageURL = response.data.results[j].poster_path;
                var overview = response.data.results[j].overview;

                let cardItem = `
                <div class="col l2 col m6 col s12">
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
        // call add or remove favorite movie function since page has loaded
        //addFavoriteMovieToDB();
        //removeFavoriteMovieToDB();
    });

};

// when user clicks the date button, change the movies based on the date range
$('#date-button').click(function (event) {
event.preventDefault();
    if ($('#startDate').val() !== '' && $('#endDate').val() !== '') {
        hasDateInput = true;
        //Prevent default
        event.preventDefault();
        $("#movie-row").empty();
        $("#tv-row").empty();
        $("#suggest-tv-row").empty();

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

        // rerun the get movies and tv functions with the appropriate date range
        generateCustomURLs();
        getMovies();
        getTV();
        getSuggestedTV();
    }
});

// // add as favorite movie
// function addFavoriteMovieToDB() {
//     //const addFavoriteMovie = document.querySelector('.add-favorite-btn');
//     //addFavoriteMovie.addEventListener('submit', (e) => {

//     $('.add-favorite-btn').on('click', function (event) {
//         let favoriteMovieArr = [];
//         //$('#favorite-movie-row').empty();
//         event.preventDefault();
//         // grab the id from the button pressed
//         let btnID = this.id;
//         console.log(btnID);
//         // push id to the favorite move array
//         favoriteMovieArr = favoriteMovieArr.push(btnID);
//         // eliminate duplicates
//         favoriteMovieArr = [...new Set(favoriteMovieArr)];
//         // update favorite movie id array in db
//         return db.collection('users').doc(userID).set({
//             favoriteMovieArr: favoriteMovieArr
//         }, {
//                 merge: true
//             });
//     });

// }

// // remove as favorite movie
// function removeFavoriteMovieToDB() {
//     //const addFavoriteMovie = document.querySelector('.add-favorite-btn');
//     //addFavoriteMovie.addEventListener('submit', (e) => {
//     $('.remove-favorite-btn').on('click', function (event) {
//         event.preventDefault();
//         // grab the id from the button pressed
//         let btnID = this.id;
//         // find the removed id in the array and remove it
//         for (let i = 0; i < favoriteMovieArr.length; i++) {
//             if (favoriteMovieArr[i] === btnID) {
//                 favoriteMovieArr.splice(i, 1)
//             };
//         };
//         //update favorite movie id array in db
//         return db.collection('users').doc(userID).set({
//             favoriteMovieID: favoriteMovieArr
//         }, {
//             merge: true
//         });
//     });
// }







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