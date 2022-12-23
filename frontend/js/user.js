function loadUser() {
    getUserName();
    updateProfile();

    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user')
    document.getElementById("title").innerHTML = "User: "+user;

    // Load user's post
    info = getInfo(user);
    addUnit(user, info[0], info[1], info[2], info[3], null);

    for (let i = 0; i < info[4].length; i++) {
        showComment(info[4][i]);
    }
}

function showComment(comment) {
    let element = document.createElement("div");
    let user = comment[0];
    let userColor = "#00ff00;";
    let text = comment[1];
    element.innerHTML = `<hr /><p><b style='color: ${userColor}'>${user}</b>: ${text}</p>`
    document.getElementById("comments").appendChild(element);
}