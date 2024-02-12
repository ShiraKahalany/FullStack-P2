var currentUser = getUserFromCookie();

document.getElementById('userName').innerHTML = currentUser.userName;
document.getElementById('firstName').innerHTML = currentUser.firstName;
document.getElementById('lastName').innerHTML = currentUser.lastName;
document.getElementById('email').innerHTML = currentUser.email;
document.getElementById('birthDate').innerHTML = currentUser.birthDate;


const updateButton = document.getElementById('updateDetails');
console.log(updateButton);
updateButton.addEventListener('click', update);

displayTable("memory");
displayTable("ticTacToe");

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

function displayTable(name){
    var scores = JSON.parse(localStorage.getItem(name)) || [];
    const table = document.getElementById(name + 'Table');
    if (scores.length > 0){
        table.style.display = 'block'; // Display the table
        const scoresTable = document.getElementById(name + 'Scores');
        scores.forEach(score => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${score.userName}</td><td>${score.score}</td>`;
            scoresTable.appendChild(row);
        });
    } else {
        table.style.display = 'none'; // Hide the table
    }
}


