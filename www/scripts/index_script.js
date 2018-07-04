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

/**
 * Stub method, this should scroll the page down to the Players section,
 * change the selector value to the appropriate time span
 * and populate it with only players registered during the timespan
 * given by the parameter.
 */
function showPlayersList(timeSpan) {
}

/**
 * Stub method, this should scroll the page down to the Sessions section,
 * change the selector value to the appropriate time span
 * and populate it with only sessions played during the timespan
 * given by the parameter.
 */
function showSessionsList(timeSpan) {
}

function addPlayer() {
    //TO-DO clear all the form fields
    toggleForm("new_player_form", true);
}

function editPlayer() {
    //TO-DO clear all the form fields
    toggleForm("edit_player_form", true);
}

/**
 * Stub method, this should call backend methods to
 * change a player's status to banned and also
 * display that change on the player table.
 */
function banPlayer() {
}

/**
 * Stub method, this should call backend methods to
 * delete a player account and also remove that player
 * from the players table.
 */
function removePlayer() {
}

function addSession() {
    //TO-DO clear all the form fields
    toggleForm("new_session_form", true);
}

function editSession() {
    //TO-DO clear all the form fields
    toggleForm("edit_session_form", true);
}

/**
 * Stub method, this should call backend methods to
 * delete a game session and also remove that player
 * from the sessions table.
 */
function removeSession() {
}

/**
 * Stub method, this should call backend methods to
 * authenticate and login a user account.
 */
function login() {
    toggleForm("login_form", false);
}

function submitPlayerRegister() {
    toggleForm("new_player_form", false);
}

function submitPlayerEdit() {
    toggleForm("edit_player_form", false);
}

function submitSessionRegister() {
    toggleForm("new_session_form", false);
}

function submitSessionEdit() {
    toggleForm("edit_session_form", false);
}

function toggleForm(formId, on) {

    var form = $("#" + formId);
    var darkPane = $("#dark_pane");

    if (on) {
        form.css("display", "inline-block");
        darkPane.show();
    } else {
        form.css("display", "none");
        darkPane.hide();
    }
}