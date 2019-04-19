$('.dropdown-button').dropdown();
console.log('.dropdown-button');

$(document).ready(function () {
    $('.modal').modal();
});

$(document).ready(function () {
    $('.card').modal();
});

$(document).ready(function() {
    $(".sidenav").sidenav();
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

