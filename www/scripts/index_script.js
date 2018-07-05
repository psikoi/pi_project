$(document).ready(function () {
    buildNavigation();
    switchPage("players");
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

/* Returns whether or not the given parameter is an integer */
function isInt(num) {
    return !isNaN(num) &&
        parseInt(Number(num)) == num &&
        !isNaN(parseInt(num, 10));
}

/* Returns whether or not the given string is in a mm:ss time format */
function isTime(str) {
    return (/^(?:[0-5][0-9]):[0-5][0-9]$/).test(str);
}

/* Builds a simple text input */
function buildBasicInput(id, placeholder) {
    var input = document.createElement("input");
    input.type = "text";
    input.id = id;
    input.placeholder = placeholder;
    return input;
}

/* Builds a simple password input */
function buildPasswordInput(id, placeholder) {
    var input = document.createElement("input");
    input.type = "password";
    input.id = id;
    input.placeholder = placeholder;
    return input;
}

/* Builds a simple date input */
function buildDateInput(id) {
    var input = document.createElement("input");
    input.type = "date";
    input.id = id;
    return input;
}

/* Builds a simple selector with the given options */
function buildSelector(id, options) {
    var selector = document.createElement("select");
    selector.id = id;
    options.forEach(element => {
        var option = document.createElement("option");
        option.textContent = element;
        selector.appendChild(option);
    });
    return selector;
}

/* Builds a simple submit button */
function buildBasicSubmit(text) {
    var button = document.createElement("button");
    button.type = "submit";
    button.textContent = text;
    return button;
}

/* Builds a base form that can be used to build on top of. */
function buildBaseForm(titleText, action) {
    var pageContent = document.getElementById("page_content");

    var darkPane = document.createElement("div");
    darkPane.id = "dark_pane";

    var form = document.createElement("form");
    form.action = action;

    var close = document.createElement("a");
    close.className = "form_exit";
    close.href = "javascript: closeForm()";

    var closeImg = document.createElement("img");
    closeImg.src = "images/icons/close.png";

    close.appendChild(closeImg);

    var title = document.createElement("div");
    title.className = "form_title";
    title.textContent = titleText;

    form.appendChild(close);
    form.appendChild(title);
    darkPane.appendChild(form);

    pageContent.appendChild(darkPane);
    return darkPane;
}

/* Closes the currently opened form */
function closeForm() {
    var pageContent = document.getElementById("page_content");
    pageContent.removeChild(document.getElementById("dark_pane"));
}