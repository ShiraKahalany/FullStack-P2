
function handleLogin(user) {
    localStorage.setItem('currentUser',  JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
    window.parent.location.href = '../index.html';
}

function handleLogout() {
    // Clear session storage and redirect to login page
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false');
    window.parent.location.href = '../index.html';
}