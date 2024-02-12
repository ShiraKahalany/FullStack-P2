function setCookie(name, value, hoursToLive){
    const date = new Date();
    date.setTime(date.getTime() +  (hoursToLive * 60 * 60 * 1000)); // converting hours to milliseconds
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// function setCookie(name, value, minutesToLive){
//     const date = new Date();
//     date.setTime(date.getTime() +  (minutesToLive * 60 * 1000)); // converting minutes to milliseconds
//     let expires = "expires=" + date.toUTCString();
//     document.cookie = `${name}=${value}; ${expires}; path=/`;
// }

function getUserFromCookie() {
    var name = "user=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) == 0) {
            var userCookie = cookie.substring(name.length, cookie.length);
            return JSON.parse(userCookie);
        }
    }
    return null; // Return null if user cookie is not found
}

function deleteCookie(name){
    setCookie(name, null, null);
}