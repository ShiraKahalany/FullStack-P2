const firstNameInput = document.getElementById('firstName'),
lastNameInput = document.getElementById('lastName'),
userNameInput = document.getElementById('userName'),
passwordInput = document.getElementById('password'),
emailInput = document.getElementById('email'),
birthDateInput = document.getElementById('birthDate'),
submitButton = document.getElementById('signupSubmit');

submitButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission
    addUser();
});

document.addEventListener('DOMContentLoaded', function() {
    if(localStorage.getItem('update') && localStorage.getItem('update') === 'true'){
        document.querySelector('h1').innerHTML = 'Update Details';
        document.querySelector('h3').style.display = 'none';
        document.querySelector('button').innerHTML = 'Update';
        document.querySelector('p').style.display = 'none';
        document.querySelector('a').style.display = 'none';

        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        setUserDetails(currentUser.firstName,
            currentUser.lastName, currentUser.userName, 
            currentUser.password, currentUser.email);
    }   
});

function setUserDetails(first, last, name, pass, email){
    document.getElementById("firstName").value = first;
    document.getElementById("lastName").value = last;
    document.getElementById("userName").value = name;
    document.getElementById("password").value = pass;
    document.getElementById("email").value = email;
}

function createUserObject() {
    return {
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
      userName: userNameInput.value,
      password: passwordInput.value,
      email: emailInput.value,
      birthDate: birthDateInput.value
    };
}

function addUser(){

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = createUserObject();

    if (checkUserName(user.userName, users) &&
        checkPassword(user.password) &&
        checkEmail(user.email)) {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        handleLogin(user);
    }
}

function checkUserName(userName, users){
    if (users && users.some(user => user.userName === userName)) {
        alert('Username already exists. Please choose another one.');
        return false;
    }

    return true;
}

function checkPassword(password){
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return false;
    }

    if (!/^[a-zA-Z0-9]+$/.test(password)) {
        alert('Password can only contain letters and numbers.');
        return false;
    }

    return true;
}

function checkEmail(email){
    if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return false;
    }

    return true;
}