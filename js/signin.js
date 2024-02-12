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
        let failedAttempts = localStorage.getItem('failedAttempts') || 0;
        localStorage.setItem('failedAttempts', failedAttempts);
        if (user.password === password.value){
            handleLogin(user);
            failedAttempts = 0;
            localStorage.setItem('failedAttempts', failedAttempts);
        } else {
            failedAttempts = parseInt(failedAttempts);
            failedAttempts++;
            localStorage.setItem('failedAttempts', failedAttempts);
            
            if (failedAttempts >= 2) {
                alert('You have entered the wrong password 3 times. You are blocked for 30 seconds.');
                submitBu.style.display = 'none';
                setTimeout(() => {
                    localStorage.removeItem('failedAttempts');
                    submitBu.style.display = 'block'; // Show the button after unblocking
                }, 30000); // Unblock after 30 seconds
            } else {
                alert('Password is not correct, try again.');
            }
        }
        
    } else {
        alert('This username does not exist.');
    }
}





