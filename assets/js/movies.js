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

$(document).ready(function () {
    $(".sidenav").sidenav();
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
            hasDateInput = false;
            // signifies that the user is logged in
            userLoggedIn = true;
            userID = doc.id;
            // capture genre and make it uppercase
            genre = doc.data().genre;
            genre = genre.charAt(0).toUpperCase() + genre.slice(1);
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
            $("#change-genre-btn").css("display", "block");

        });
    } else {
        $("#movie-row").empty();
        $("#tv-row").empty();
        $("#suggestTV-row").empty();
        hasDateInput = false;

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
        $("#change-genre-btn").css("display", "none");


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
    userLoggedIn = false;
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userLoggedIn = true;

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
}

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
        } else if (userLoggedIn === false && hasDateInput === true) {
            $("#movie-header").css("display", "block").text(`Top Movies from ${startDateDisplay} to ${endDateDisplay}`);
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
        if (userLoggedIn === true) {
            getSuggestedTV();
        };
    };
});