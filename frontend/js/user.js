function loadProfile() {
    getUserName();
    updateProfile();
    document.getElementById("title").innerHTML = userName;
}