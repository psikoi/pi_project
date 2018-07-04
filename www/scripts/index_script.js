$(document).ready(function () {
    buildNavigation();
    switchPage("sessions");
});


function switchPage(page) {
    clearContent();

    if (page === "overview") {
        buildOverview();
    } else if (page === "players") {
        buildPlayers();
    } else if (page === "sessions") {
        buildSessions();
    }
}

function clearContent() {
    var pageContent = document.getElementById("page_content");
    while (pageContent.firstChild) {
        pageContent.removeChild(pageContent.firstChild);
    }
}

/**
 * Builds the top navigation bar, including all,
 * the navigation links, username and profile picture.
 */
function buildNavigation() {

    var buildNavBtn = function (text, url) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.textContent = text;
        a.href = url;
        li.appendChild(a);
        return li;
    }

    var body = document.body;

    var navigation = document.createElement("div");
    navigation.id = "navigation";
    navigation.className = "navigation";

    var logo = document.createElement("img");
    logo.src = "images/logo_navigation.png";

    var nav = document.createElement("nav");
    var ul = document.createElement("ul");

    ul.appendChild(buildNavBtn("Home", "javascript:switchPage('overview')"));
    ul.appendChild(buildNavBtn("Players", "javascript:switchPage('players')"));
    ul.appendChild(buildNavBtn("Sessions", "javascript:switchPage('sessions')"));

    var separator = document.createElement("li");
    separator.id = "nav_separator";
    separator.textContent = "|";

    ul.appendChild(separator);

    //TODO CHANGE THIS TO REAL VALUES
    var userNav = document.createElement("li");

    var userNavA = document.createElement("a");
    userNavA.href = "javascript:toggleForm('login_forn', true)";

    var userNavImg = document.createElement("img");
    userNavImg.src = "images/user_profile.jpg";

    var userNavName = document.createElement("div");
    userNavName.className = "nav_username";
    userNavName.textContent = "Ruben";

    userNavA.appendChild(userNavImg);
    userNavA.appendChild(userNavName);

    userNav.appendChild(userNavA);

    ul.appendChild(userNav);

    nav.appendChild(ul);

    navigation.appendChild(logo);
    navigation.appendChild(nav);

    body.appendChild(navigation);
}