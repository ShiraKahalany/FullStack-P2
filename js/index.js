const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');

card1.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission
    isLogged("/html/Tic-Tac-Toe.html"); // Pass the event parameter to the submit function
});

card2.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission
    isLogged("/html/difficulty.html"); // Pass the event parameter to the submit function
});

function isLogged(name){
    if(!isLoggedIn()){
        alert("You are not signed in, please sign in to continue.");
    } else {
        window.location.href = name;
    }
}