let userName;

function getUserName() {
    // Get username from cookie stash
    userName = document.cookie
        .split('; ')
        .find((row) => row.startsWith('userName='))
        ?.split('=')[1];

    // Validate username
    if (!usernameExists(userName)) {
        // Log in screen
        window.location.href = "login.html";
    }
}

function updateProfile() {
    document.getElementById("profile").innerHTML = "<a href='profile.html'>"+userName+"</a>";
}
    
function usernameExists(name) {
    return name == "bothron";
}