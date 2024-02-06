var currentUser = JSON.parse(localStorage.getItem('currentUser'));

document.getElementById('userName').innerHTML = currentUser.userName;
document.getElementById('firstName').innerHTML = currentUser.firstName;
document.getElementById('lastName').innerHTML = currentUser.lastName;
document.getElementById('email').innerHTML = currentUser.email;
document.getElementById('birthDate').innerHTML = currentUser.birthDate;


const updateButton = document.getElementById('updateDetails');
console.log(updateButton);
updateButton.addEventListener('click', update);

function update() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    let indexToRemove = users.findIndex(user => user.id === currentUser.id);
    if (indexToRemove !== -1) {
        users.splice(indexToRemove, 1); // Remove the user from the array
        localStorage.setItem('users', JSON.stringify(users)); // Update the localStorage
        localStorage.setItem('update', 'true');
        window.location.href = 'signup.html'; 
    } else {
        console.error('User not found in localStorage');
    }
}