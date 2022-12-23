var friends = [];
var unloadedFriends = [];

function loadHome() {
    getUserName();
    updateProfile();
    getFriends();
    loadMore();
}

function getFriends() {
    friends = ["usera", "userb", "userc", "userdd", "usere", "userf", "userg", "userh"];
    unloadedFriends = [...friends];
}

function getInfo(userName) {
    var imageName = "example";
    var imageWidth = "100%";
    var userColor = "red";
    var caption = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    var comments = [["bothron","Hi"]];
    return [userColor, imageName, imageWidth, caption, comments]
}

function loadMore() {
    for (let i =0; i <= 5; i++) {
        loadRandom();
    }

    if (unloadedFriends.length == 0) {
        // Done loading.
        document.getElementById("caughtUp").innerHTML = "<p>You're all caught up!</p>";
    }
}

function loadRandom() {
    if (unloadedFriends.length == 0) {
        return;
    }
    const index = Math.floor(Math.random() * unloadedFriends.length)
    const userName = unloadedFriends[index];
    unloadedFriends.splice(index, 1)
    info = getInfo(userName);
    addUnit(userName, info[0], info[1], info[2], info[3], info[4].length);
}

function addUnit(userName, userColor, imageName, imageWidth, caption, numComments) {
    var element = document.createElement("div");
    element.className = "unit";
    if (numComments === null) {
        // Do not display comments
        element.innerHTML = `<img src="${imageName}" width="${imageWidth}" /> <p><b style="color: ${userColor};">${userName}.</b> ${caption} </p>`;

    } else {
        element.innerHTML = `<img src="${imageName}" width="${imageWidth}" /> <p><b style="color: ${userColor};">${userName}.</b> ${caption} </p> <p style='color: gray;'><a href="user.html?user=${userName}">Comments: ${numComments}</a></p>`;
    }
    document.getElementById("posts").appendChild(element);
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (unloadedFriends.length > 0) {
            loadMore();
        }
    }
};