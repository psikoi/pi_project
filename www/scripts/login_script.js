/**
 * Holds information about the users in the database.
 */
var users = [];

/**
 * Holds information about which user is currentely logged in.
 */
var currentUser;

/**
 * Checks and reads cookies about the user that is logged in.
 * If the browser has cookies refering to a certain user,
 * it automaticaly logs that user in.
 */
function readLogInCookies() {
    var cookie = document.cookie;

    userId = cookie.split("=")[1]

    if(userId != undefined){
        getUserAccounts();
        users.forEach(function(current){
            if(current.id == userId){
                currentUser = current;
            }
        });

        switchPage("overview");
        displayUserNavigation(currentUser);
    }
}

/**
 * Gets all user accounts.
 */
function getUserAccounts(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/user", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).users.forEach(function(current){
                users.push(current);
            });
        }
    }
    xhr.send();
}

/**
 * Gets the id of the current active session, by comparing
 * its user_id to the id of the currently logged in user.
 */
function getCurrentActiveSessionId(){
    var id;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/activeSession", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).activeSessions.forEach(function(current){
                if(current.user_id == currentUser.id){
                    id = current.id;
                }
            });
        }
    }
    xhr.send();

    return id;
}

/**
 * Sends a request to add an active session.
 * @param {object} user - User being logged in. 
 */
function sendLoginRequest(user){
    var success = true;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/activeSession", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            if("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        };
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"userId": user.id}));

    return success;
}

/**
 * Sends a request to delete an active session.
 * @param {object} user - user being logged out.
 */
function sendLogoutRequest(user){
    var success = true;
    var id = getCurrentActiveSessionId();

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/activeSession", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            if("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        };
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"id": id}));

    return success;
}

/**
 * Updates the currently logged in user.
 * This implies setting cookies for the user and changing the
 * global variable "currentUser".
 * @param {object} user - New logged in user.
 */
function updateLoggedInUser(user){
    document.cookie = "loggedInUser = " + user.id;
    currentUser = user;
}

/**
 * Checks if the username is already taken by any user.
 * @param {string} username - Username being checked.
 */
function userNameExists(username){
    var res = false;
    
    users.forEach(function(current){
        if(current.username.toUpperCase() == username.toUpperCase()){
            res = true;
        }
    });

    return res;
}

/**
 * Checks if the password introduced belongs to the user.
 * @param {string} username - Username of the user.
 * @param {string} password - Password being checked.
 */
function correctPassword(username, password){
    var res = false;
    users.forEach(function(current){
        if(current.username.toUpperCase() == username.toUpperCase()){
            if(current.password == password){
                res = true;
            }
        }
    });
    return res;
}

/**
 * Gets an user object, given its username.
 * @param {string} username - Username of the user.
 */
function getUser(username){
    var user;

    users.forEach(function(current){
        if(current.username == username){
            user = current;
        }
    });

    return user;
}

/**
 * Removes the cookies from the browser.
 */
function removeLogInCookies(){
    document.cookie = document.cookie + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function buildLogin() {
    getUserAccounts();

    var pane = buildBaseForm("Login to your admin account", "javascript: login()");
    var form = pane.children[0];

    form.appendChild(buildBasicInput("user_username", "Username"));
    form.appendChild(buildPasswordInput("user_password", "Password"));
    form.appendChild(buildBasicSubmit("Login"));
}

/**
 * Logs the user out.
 */
function logout() {
    if (confirm("Are you sure you wish to logout?")) {
        var requestOk = sendLogoutRequest(currentUser);
        if (requestOk) {
            currentUser = undefined;
            removeLogInCookies();
            switchPage("landing");
            displayUserNavigation(null);
        } else {
            alert("Failed to logout ");
        }
    }
}

/**
 * Brings up a form that the user will use to 
 * attempt to log in.
 */
function login() {

    var username = document.getElementById("user_username").value;
    var password = document.getElementById("user_password").value;

    if (username.length == 0) {
        alert("That username is not valid");
        return;
    }

    if (password.length == 0) {
        alert("That password is not valid");
        return;
    }

    if(!userNameExists(username)){
        alert("Username doesn't exist");
        return;
    }

    if(!correctPassword(username, password)){
        alert("Wrong password");
        return;
    }

    var user = getUser(username);
    var requestOk = sendLoginRequest(user);
    
    if (requestOk) {
        updateLoggedInUser(user);
        switchPage("overview");
        displayUserNavigation(user);
    } else {
        alert("Failed to login ");
    }   
}
