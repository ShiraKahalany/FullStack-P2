const signInButton = document.getElementById("signIn"),
  signOutButton = document.getElementById("signOut"),
  profileButton = document.getElementById("profile");

if (isLoggedIn()) {
  // Hide submit button and display "My Profile" button
  signInButton.style.display = "none";
  signOutButton.style.display = "block";
  profileButton.style.display = "block";
} else {
  profileButton.style.display = "none";
  signOutButton.style.display = "none";
  signInButton.style.display = "block";
}

// Function to check if user is logged in
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

const signOut = document.getElementById("signOut");
signOut.addEventListener("click", handleLogout);
