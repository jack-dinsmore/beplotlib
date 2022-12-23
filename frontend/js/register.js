function register() {
    let name = document.getElementById("userName").value;
    let email = document.getElementById("email").value;
    let dept = document.getElementById("dept").value;
    let affil = document.getElementById("affil").value;
    let color = document.getElementById("color").value;
    let display = document.getElementById("display").value;
    if (display == "") {
        display = name;
    }
    if (dept == "") {
        dept = "Other";
    }
    if (affil == "") {
        affil = "Other";
    }
    if (checkUsername(name)) {
        // Invalid form
        document.getElementById("error").innerHTML = "<span style='color: red;'>Error: username is invalid</span>";
        return;
    }
    if (email == "") {
        // Invalid form
        document.getElementById("error").innerHTML = "<span style='color: red;'>Error: email was empty</span>";
        return;
    }

    // Push all info to database

    userName = name;
    document.cookie = "userName="+name+';';
    console.log(name);
    console.log(email);
    console.log(dept);
    console.log(affil);
    console.log(color);

    window.location.href = "home.html";
}

function checkUsername() {
    let name = document.getElementById("userName").value;
    if (isValidUsername(name)) {
        document.getElementById("taken").innerHTML = "<span style='color: green;'>Available!</span>";
    } else { 
        document.getElementById("taken").innerHTML = "<span style='color: red;'>Unavailable</span>";
    }
}

function isValidUsername(name) {
    if ("" == name) {
        return false;
    }
    if (name.includes(' ')) {
        return false;
    };
    if (name.includes(String.fromCharCode(11088))) { // ⭐️
        return false;
    };
    if (name.includes(String.fromCharCode(55357))) { // 👑
        return false;
    }
    return !usernameExists(name);
}