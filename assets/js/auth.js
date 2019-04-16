// // listen for auth satus changes
// auth.onAuthStateChanged(user => {
//     if (user) {
//         db.collection('cards').get().then(snapshot => {
//             setupCards(snapshot.docs);
//         });
//     } else {
//         setupCards([]);
//     }
// });

// //Create new genre
// const createForm = document.querySelector('#create-form');
// createForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     db.collection('cards').add({
//         genre: createForm['genre'].value,
//     }).then(() => {
//         // close the login modal and reset the form
//         const modal = document.querySelector("#modal-create");
//         M.Modal.getInstance(modal).close();
//         createForm.reset();

//     })
// });


// //signup
// const signupForm = document.querySelector('#signup-form');
// signupForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     // get user info
//     const email = signupForm['signup-email'].value;
//     const password = signupForm['signup-password'].value;

//     // sign up user
//     auth.createUserWithEmailAndPassword(email, password).then(cred => {
//         const modal = document.querySelector("#modal-signup");
//         M.Modal.getInstance(modal).close();
//         signupForm.reset();
//     });
// });

// // logout
// const logout = document.querySelector('#logout');
// logout.addEventListener('click', (e) => {
//     e.preventDefault();
//     auth.signOut();
// });

// // login
// const loginForm = document.querySelector('#login-form');
// loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     // get user info
//     const email = loginForm['login-email'].value;
//     const password = loginForm['login-password'].value;

//     auth.signInWithEmailAndPassword(email, password).then(cred => {
//         // close the login modal and reset the form
//         const modal = document.querySelector("#modal-login");
//         M.Modal.getInstance(modal).close();
//         loginForm.reset();
//     });
// });