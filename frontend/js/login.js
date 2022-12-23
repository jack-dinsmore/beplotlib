function register() {
    window.location.href = "register.html";
}

function login() {
    userName = document.getElementById("userName").value
    if (usernameExists(userName)) {
        // Successful login
        document.cookie = "userName="+userName+";";
        window.location.href = "home.html";
    } else {
        document.getElementById("error").innerHTML = `<span style='color: red; text-align: center;'>User name "${userName}" does not exist.</span>`;
    }
}