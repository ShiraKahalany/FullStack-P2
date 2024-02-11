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





// fetch("/json/memory.json")
//     .then(response => response.json())
//     .then(memoryScores => {
//         const memoryTable = document.getElementById('memoryScores');
//         if (memoryScores.length > 0) {
//             memoryScores.forEach(score => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `<td>${score.userName}</td><td>${score.score}</td>`;
//                 memoryTable.appendChild(row);
//             });
//         } else {
//             memoryTable.innerHTML = '<tr><td colspan="2">No scores available</td></tr>';
//         }
//     })
//     .catch(error => console.error('Error loading memory game scores:', error));


// fetch("/json/Tic-Tac-Toe.json")
//     .then(response => response.json())
//     .then(ticTacToeScores => {
//         const ticTacToeTable = document.getElementById('ticTacToeScores');
//         if (ticTacToeScores.length > 0) {
//             ticTacToeScores.forEach(score => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `<td>${score.userName}</td><td>${score.score}</td>`;
//                 ticTacToeTable.appendChild(row);
//             });
//         } else {
//             ticTacToeTable.innerHTML = '<tr><td colspan="2">No scores available</td></tr>';
//         }
//     })
//     .catch(error => console.error('Error loading Tic Tac Toe game scores:', error));




    // Load memory game scores
fetch("/json/memory.json")
.then(response => response.json())
.then(memoryScores => {
    const memoryTable = document.getElementById('memoryTable');
    if (memoryScores.length > 0) {
        memoryTable.style.display = 'block'; // Display the table
        const memoryScoresTable = document.getElementById('memoryScores');
        memoryScores.forEach(score => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${score.userName}</td><td>${score.score}</td>`;
            memoryScoresTable.appendChild(row);
        });
    } else {
        memoryTable.style.display = 'none'; // Hide the table
    }
})
.catch(error => console.error('Error loading memory game scores:', error));

// Load Tic Tac Toe game scores
fetch("/json/Tic-Tac-Toe.json")
.then(response => response.json())
.then(ticTacToeScores => {
    const ticTacToeTable = document.getElementById('ticTacToeTable');
    if (ticTacToeScores.length > 0) {
        ticTacToeTable.style.display = 'block'; // Display the table
        const ticTacToeScoresTable = document.getElementById('ticTacToeScores');
        ticTacToeScores.forEach(score => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${score.userName}</td><td>${score.score}</td>`;
            ticTacToeScoresTable.appendChild(row);
        });
    } else {
        ticTacToeTable.style.display = 'none'; // Hide the table
    }
})
.catch(error => console.error('Error loading Tic Tac Toe game scores:', error));




