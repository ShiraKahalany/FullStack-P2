// Function to handle user login
function handleLogin(user) {
  // Set user information in cookie with expiration time of 6 hours
  setCookie("user", JSON.stringify(user), 6);
  // Redirect to index page
  window.parent.location.href = "../index.html";
}

// Function to handle user logout
function handleLogout() {
  localStorage.setItem("update", "false");
  deleteCookie("user");
  window.parent.location.href = "../index.html";
}

// Function to show alert for under development features
function showAlert() {
  alert("This feature is still under development.");
}

// Function to add user score to localStorage
function addScore(name, userName, newScore) {
  // Retrieve scores from localStorage or initialize empty array
  var scores = JSON.parse(localStorage.getItem(name)) || [];
  // Find user score if exists
  var userScore = scores.find((s) => s.userName === userName);
  if (userScore) {
    // Update score if new score is higher
    if (userScore.score < newScore) {
      userScore.score = newScore;
      localStorage.setItem(name, JSON.stringify(scores));
    }
  } else {
    // Add new user score
    scores.push({
      userName: userName,
      score: newScore
    });
    localStorage.setItem(name, JSON.stringify(scores));
  }
}

// Function to reset failed login attempts
function resetFailedAttempts() {
  // Reset failed login attempts to 0
  localStorage.setItem('failedAttempts', 0);
}
