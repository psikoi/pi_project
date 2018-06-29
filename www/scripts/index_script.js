$( document ).ready(function() {
    buildNavigation();
});

function buildNavigation(){

    var body = document.body;

    var navigation = document.createElement("div");
    navigation.id = "navigation";
    navigation.className = "navigation";

    var logo = document.createElement("img");
    logo.src = "images/logo_navigation.png";

    var nav = document.createElement("nav");
    var ul = document.createElement("ul");

    ul.appendChild(buildNavButton("Home", "javascript:showOverview()"));
    ul.appendChild(buildNavButton("Players", "javascript:showPlayers()"));
    ul.appendChild(buildNavButton("Sessions", "javascript:showSessions()"));

    var separator = document.createElement("li");
    separator.id = "nav_separator";
    separator.textContent = "|";

    ul.appendChild(separator);

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

function buildNavButton(text, url){
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.textContent = text;
    a.href = url;
    li.appendChild(a);
    return li;
}

/**
 * Shows the overview section, hiding the players and the sessions
 * sections.
 */
function showOverview() {
    $("#players").css("display", "none");
    $("#sessions").css("display", "none");
    $("#overview").css("display", "block");
}

/**
 * Shows the players section, hiding the sessions and the overview
 * sections.
 */
function showPlayers() {
    $("#sessions").css("display", "none");
    $("#overview").css("display", "none");
    $("#players").css("display", "block");
}

/**
 * Shows the sessions sections, hiding the players and the overview
 * sections.
 */
function showSessions() {
    $("#players").css("display", "none");
    $("#overview").css("display", "none");
    $("#sessions").css("display", "block");
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