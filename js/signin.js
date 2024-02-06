const userName = document.getElementById('userName'),
password = document.getElementById('password'),
submitBu = document.getElementById('signinSubmit');

submitBu.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission
    submit();
});

function submit() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    var user = users.find(user => user.userName === userName.value);
    
    if (user) {
        if (user.password === password.value){
            handleLogin(user);
        } else {
            alert('Password is not correct, try again.');
        }
        
    } else {
        alert('This username does not exist.');
    }
}



