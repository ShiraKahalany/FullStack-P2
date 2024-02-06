var currentUser = JSON.parse(localStorage.getItem('currentUser'));

document.getElementById('userName').innerHTML = currentUser.userName;
document.getElementById('firstName').innerHTML = currentUser.firstName;
document.getElementById('lastName').innerHTML = currentUser.lastName;
document.getElementById('email').innerHTML = currentUser.email;
document.getElementById('birthDate').innerHTML = currentUser.birthDate;

