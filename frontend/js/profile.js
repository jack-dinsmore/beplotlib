function loadProfile() {
    getUserName();
    document.getElementById("title").innerHTML = userName;

    let email = "a";
    let color = "";
    let displayName = "a";
    let affil = "Other";
    let dept = "Other";
    document.getElementById("email").value = email;
    document.getElementById("color").value = color;
    document.getElementById("display").value = displayName;
    document.getElementById("affil").value = affil;
    document.getElementById("dept").value = dept;
}

function update() {
    let email = document.getElementById("email").value;
    let color = document.getElementById("color").value;
    let displayName = document.getElementById("display").value;
    let affil = document.getElementById("affil").value;
    let dept = document.getElementById("dept").value;

    document.getElementById("error").innerHTML = "<span style='color: green;'>Succeeded!</span>"
}