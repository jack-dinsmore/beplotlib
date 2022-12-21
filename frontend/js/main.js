var friends = [];
var unloadedFriends = [];

function init() {
    getFriends();
    loadMore();
}

function getFriends() {
    friends = ["a", "b", "c", "d", "e", "f", "g", 'H'];
    unloadedFriends = [...friends];
}

function getInfo(userName) {
    var imageName = "example";
    var imageWidth = "100%";
    var userColor = "red";
    var comment = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    return [userColor, imageName, imageWidth, comment]
}

function loadMore() {
    for (let i =0; i <= 4; i++) {
        loadRandom();
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
    addUnit(userName, info[0], info[1], info[2], info[3]);
}

function addUnit(userName, userColor, imageName, imageWidth, comment) {
    var element = document.createElement("div");
    element.className = "unit";
    element.innerHTML = `<img src="${imageName}" width="${imageWidth}" /> <p><b style="color: ${userColor};"><a href="user.html?user=${userName}">@${userName}</a>:</b> ${comment} </p>`;
    document.getElementById("posts").appendChild(element);
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (unloadedFriends.length > 0) {
            loadMore();
        }
    }
};