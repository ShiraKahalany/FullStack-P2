function handleLogin(user) {
  setCookie("user", JSON.stringify(user), 6);
  window.parent.location.href = "../index.html";
}

function handleLogout() {
  localStorage.setItem("update", "false");
  deleteCookie("user");
  window.parent.location.href = "../index.html";
}

function showAlert() {
  alert("This feature is still under development.");
}

function addScore(name, userName, newScore) {
  var scores = JSON.parse(localStorage.getItem(name)) || [];
  var userScore = scores.find((s) => s.userName === userName);
  console.log(userScore);
  if (userScore) {
    if (userScore.score < newScore) {
      userScore.score = newScore;
      localStorage.setItem(name, JSON.stringify(scores));
    }
  } else {
    scores.push(
      {
        userName: userName,
        score: newScore
      });
    localStorage.setItem(name, JSON.stringify(scores));
  }
}
  
function resetFailedAttempts() {
  localStorage.setItem('failedAttempts', 0);
}
