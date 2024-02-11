
function handleLogin(user) {
    localStorage.setItem('currentUser',  JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
    window.parent.location.href = '../index.html';
}

function handleLogout() {
    // Clear session storage and redirect to login page
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('update', 'false');
    window.parent.location.href = '../index.html';
}

function showAlert() {
    alert("This feature is still under development.");
}

function addScore(fileName, userName, score) {
    fetch(`${fileName}.json`)
    .then((response) => response.json())
    .then((data) => {
        const existingUserIndex = data.findIndex(item => item.userName === userName);
        
        if (existingUserIndex !== -1) {
            // User already exists in data
            const existingScore = parseInt(data[existingUserIndex].score);
            
            if (score > existingScore) {
                // New score is greater, replace the existing score
                data[existingUserIndex].score = `${score}`;
            }
        } else {
            // User doesn't exist, add a new entry
            const userScore = {
                userName: userName,
                score: `${score}`,
            };
            data.push(userScore);
        }

        const updatedJSON = JSON.stringify(data);
    });
}
