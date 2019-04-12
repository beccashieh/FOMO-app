//--------------------------------TV/Movie Page -----------------------------

//Create global variables
var queryURL = '';
var startDate = "";
var endDate = "";

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;



//When a user clicks submit
$('#submit-button').click(function () {
    //Prevent default
    event.preventDefault();
    //$("#movie-row").empty();
    //Capture date in the input box
    // var startDate = $("#startDate").val();
    // var endDate = $("#endDate").val();
    //If there is something in the search bar, 
    //insert the date as a parameter in the query URL and call the ajax request
    //if (startDate !== "" && endDate !== "") {
    queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=c472f72e061f4083caae81e6e937276a&primary_release_date.lte=" + today + "&language=en&sort_by=popularity.desc";
    getMovies();
    //}
});
//Ajax request
function getMovies() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //TEST
        console.log(response);

        for (var j = 2; j >= 0; j--) {
            var avgVote = response.results[j].vote_average;
            var movieName = response.results[j].original_title;
            var posterURL = response.results[j].poster_path;
            var movieOverview = response.results[j].overview;
            var movieNameID = response.results[j].original_title.replace(/\s/g, '-').replace(/[^\w\s]/gi, '');

            var cardColumn = $('<div class="col s3">');

            var newCard = $('<div class="card-movie">');
           
            var cardBody = $('<div class="card-content">');
            cardBody.append('<h5>' + movieName + '</h5>');
            cardBody.append('<p>' + movieOverview + '</p>');
            cardBody.appendTo(newCard)

            var cardPicHolder = $('<div class = "card-image">')
            var cardPic = $('<img class = card-image>');
            cardPic.attr('src', `https://image.tmdb.org/t/p/w200${posterURL}`);
            cardPic.prependTo(cardPicHolder);
            cardPicHolder.prependTo(newCard);

            
            newCard.appendTo(cardColumn);
            cardColumn.appendTo($("#movie-row"));
            


            













            // var card = $("<div class = 'card col s3'>")

            // var cardImage = $(`<img src= https://image.tmdb.org/t/p/w200${posterURL}>`);
            // var cardMovieDescription = $("<p>").text(movieOverview);


            // var cardImageContainer = $("<div class = 'card-image'>").append(cardImage).append(cardMovieDescription);


            // cardImageContainer.appendTo(card);
            // card.appendTo($("#card-container"));


            // var cardTitle = $("<h3 class = 'card-title'>").text(movieName);



            // var cardContentContainer = $("<div class='card-content '>").append(cardTitle).append(cardMovieDescription);

            // cardContentContainer.appendTo(card);






            // //var cardLink = $("<a class='btn-floating halfway-fab waves-effect waves-light red'><i class='material-icons'>add</i></a>");
            // var cardDescription = $("<div class = 'card-content>");

            // var avgVote = response.results[j].vote_average;
            // var movieName = response.results[j].original_title;
            // var posterURL = response.results[j].poster_path;
            // var movieOverview = response.results[j].overview;
            // var movieNameID = response.results[j].original_title.replace(/\s/g, '-').replace(/[^\w\s]/gi, '');

            // var movieImage = cardImage.attr('src', `https://image.tmdb.org/t/p/w200${posterURL}`);
            // var cardMovieTitle = cardTitle.text(movieName);
            // //var cardMovieAvgVote = $('<h5 class = "card-title">').text("Average Viewer Rating: " + avgVote);
            // var cardMovieOverview = cardDescription.append('<p>');


            // var cardImg = cardImageContainer.append(movieImage)
            //     .append(cardMovieTitle)
            //     .append(cardMovieOverview);

            // var card = cardMovieOverview.text(cardDescription);


            // cardContainer.insertAfter(cardImg);

        }

        //$("#movie-row").html(cardContainer);
    });
};