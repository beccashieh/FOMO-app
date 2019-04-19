var newsInput = '';
var userLoggedIn = false;
var searchNum = 0;
$(document).ready(function() {
    $(".sidenav").sidenav();
  });
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
            //How you get data
            userLoggedIn = true;
            userID = doc.id;
            newsTopic = doc.data().newsTopic;
            console.log(newsTopic)
            $('#news-query-input').text(newsTopic)
            newsInput = newsTopic;
            genNews();
            searchNum ++;
        });
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
    console.log("Logged Out");
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Logged In")

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


$('#news-query-input').click(function () {
    $('#news-query-input').animate( {
        width: '80%'
    })
})
function genNews() {
console.log('working')
$(".news-item").remove()
if (userLoggedIn === false) {
newsInput = $('#news-query-input').val();
if (newsInput === '') {
    newsInput = 'javascript'
}
} else if (searchNum >= 1) {
    newsInput = $('#news-query-input').val();
if (newsInput === '') {
    newsInput = 'javascript'
}
} else {
    newsInput = newsTopic;
}

var searchURL = 'https://newsapi.org/v2/everything?' +
'q=' + newsInput +
'&apiKey=4d40ce544309489b9dd043dfac1e6abf'

axios.get(searchURL).then(function (result) {
        event.preventDefault()
        console.log(searchURL)
        console.log(result)
        if (result.data.articles.length === 0) {
            blankDiv = $('<div>')
            blankDiv.append("<h3> Sorry, but your search didn't turn up any results. </h3>");
            blankDiv.appendTo($('#news-item-box'))
        }
        for (var i = 1; i < result.data.articles.length; i++) {
            
            var newCard = $('<div>')
            newCard.attr('class', 'card news-item')

            var cardPicHolder = $('<div>')
            cardPicHolder.attr('class', 'card-image')
            var cardPic = $('<img>')
            cardPic.attr('src', result.data.articles[i].urlToImage)
            cardPic.attr('class' , 'card-image')
            cardPic.appendTo(cardPicHolder)
            cardPicHolder.appendTo(newCard)

            var cardBody = $('<div>')
            cardBody.attr('class', 'card-content')
            if (result.data.articles[i].urlToImage === null) {
                cardPicHolder.remove();
                cardBody.append('<h4>' + result.data.articles[i].title + '</h4>')
                cardBody.append('<h6>' + result.data.articles[i].source.name + '</h6>')
            } else if (result.data.articles[i].title.length > 55) {
            titleConcat = ''
            for (var j = 0; j < 52; j++) {
               titleConcat += result.data.articles[i].title[j]
            }
            titleAbbreviated = titleConcat + '...'

            cardBody.append('<h5 class= "activator">' + titleAbbreviated + '</h5>')
            cardBody.append('<p>' + result.data.articles[i].source.name + '</p>')
            revealDiv = $('<div>')
            revealDiv.attr('class', 'card-reveal')
            revealSpan = $('<span class="card-title">')
            var closer = $('<i class="material-icons right"> X </i>')
            revealSpan.append(closer)
            revealSpan.append('<h4>' + result.data.articles[i].source.name + '</h4>' )
            revealDiv.append(revealSpan);
            revealDiv.append('<h5>' + result.data.articles[i].title + '</h5>')

            var revealLinks = $('<div>')
            revealLinks.attr('class' , 'card-action')
            var revLink = $('<a>')
            revLink.attr('href', result.data.articles[i].url)
            revLink.attr('target', 'blank');
            revLink.text('Check it out!')
            revLink.appendTo(revealLinks)
            revealLinks.appendTo(revealDiv)
            
            newCard.append(revealDiv);
            } else {
            cardBody.append('<h5>' + result.data.articles[i].title + '</h5>') 
            }
            cardBody.appendTo(newCard)

            var cardLinks = $('<div>')
            cardLinks.attr('class' , 'card-action')
            var newsLink = $('<a>')
            newsLink.attr('href', result.data.articles[i].url)
            newsLink.attr('target', 'blank');
            newsLink.text('Check it out!')
            newsLink.appendTo(cardLinks)
            cardLinks.appendTo(newCard)

            var cardColumn = $('<div>')
            cardColumn.attr('class' , 'col s3')
            newCard.appendTo(cardColumn);
            cardColumn.appendTo($('#news-item-box'));
            
            if ((i % 4 === 0) && (i !== 0)) {
                $('#news-item-box').removeAttr('id')
                var newRow = $('<div>')
                newRow.attr('class', 'row news-item')
                newRow.attr('id', 'news-item-box')
                newRow.appendTo($('#results'))
            }
        }
            var newCard = $('<div>')
            newCard.attr('class', 'card news-item')

            var cardPicHolder = $('<div>')
            cardPicHolder.attr('class', 'card-image')
            var cardPic = $('<img>')
            cardPic.attr('src', result.data.articles[0].urlToImage)
            cardPic.attr('class' , 'card-image')
            cardPic.appendTo(cardPicHolder)
            cardPicHolder.appendTo(newCard)

            var cardBody = $('<div>')
            cardBody.attr('class', 'card-content')
            if (result.data.articles[0].urlToImage === null) {
                cardBody.append('<h3>' + result.data.articles[0].title + '</h3>')
                cardBody.append('<h6>' + result.data.articles[0].source.name + '</6>')
            } else {
            cardBody.append('<h5>' + result.data.articles[0].title + '</h5>')
            cardBody.append('<p>' + result.data.articles[0].source.name + '</p>') }
            cardBody.appendTo(newCard)

            var cardLinks = $('<div>')
            cardLinks.attr('class' , 'card-action')
            var newsLink = $('<a>')
            newsLink.attr('href', result.data.articles[0].url)
            newsLink.text('Check it out!')
            newsLink.appendTo(cardLinks)
            cardLinks.appendTo(newCard)

            var cardColumn = $('<div>')
            cardColumn.attr('class' , 'col s3')
            newCard.appendTo(cardColumn);
            cardColumn.appendTo($('#news-item-box'));

            $('#results').slideDown(1500)

    })
    
}
$('#news-search').on('click', function() {
    genNews();
})