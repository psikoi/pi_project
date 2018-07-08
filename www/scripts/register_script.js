/**
 * Holds information about the users in the database.
 */
var users = [];

/**
 * Holds information of the user type name related to a certain user type id. 
 * Key = id, Value = username
 * example, after being populated:
 * { 1 : "Type1", 2 : "Type2" }
 */
var userTypes = {};

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
 * Gets all user types, populating the userTypes object with their id and name.
 */
function getUserTypes(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/userType", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).userType.forEach(function(current){
                userTypes[current.id] = current.user_type;
            });
        }
    }
    xhr.send();
}

/**
 * Sends a request to add a new user, using the POST endpoint.
 * @param {string} username - Username of the user being added.
 * @param {string} password - Password of the user being added.
 */
function sendRegisterRequest(username, password){
    var success = true;
    var adminId = getAdministratorTypeId();

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/user", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            if("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        };
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"username": username, "password": password, "profilePicUrl": "", "userTypeId": adminId}));

    return success;
}

/**
 * Gets the user type id corresponding to the "Administrator" user type.
 */
function getAdministratorTypeId(){
    var id;
    for (var key in userTypes) {
        if (userTypes.hasOwnProperty(key)) {
            if(userTypes[key] == "Administrator"){
                id = key;
            }
        }
    }
    return id;
}

/**
 * Checks if the username already exists.
 * @param {string} username - Username being checked.
 */
function usernameAlreadyExists(username){
    var res = false;
    users.forEach(function(current){
        if(current.username.toUpperCase() == username.toUpperCase()){
            res = true;
        }
    });
    return res;
}

/**
 * Returns an user object corresponding to the given username.
 * @param {string} username - Username of the user.
 */
function getUserByName(username){
    var user;

    users.forEach(function(current){
        if(current.username == username){
            user = current;
        }
    });

    return user;
}


function buildRegister() {
    getUserAccounts();
    getUserTypes();

    var pane = buildBaseForm("Register a new admin account", "javascript: register()");
    var form = pane.children[0];

    form.appendChild(buildBasicInput("user_username", "Username"));
    form.appendChild(buildPasswordInput("user_password", "Password"));
    form.appendChild(buildPasswordInput("user_password_confirm", "Password (Confirmation)"));
    form.appendChild(buildBasicSubmit("Register"));
}

/**
 * Brings up a form that the user will use to 
 * attempt to register a new user account.
 */
function register() {

    var username = document.getElementById("user_username").value;
    var password = document.getElementById("user_password").value;
    var passwordConfirm = document.getElementById("user_password_confirm").value;

    if (username.length == 0) {
        alert("That username is not valid");
        return;
    }

    if (password.length == 0) {
        alert("That password is not valid");
        return;
    }

    if (password !== passwordConfirm) {
        alert("Those passwords do not match.");
        return;
    }

    if(usernameAlreadyExists(username)){
        alert("username already exists");
        return;
    }

    var requestOk = sendRegisterRequest(username, password);
    
    if (requestOk) {
        getUserAccounts();
        var user = getUserByName(username);
        updateLoggedInUser(user);
        switchPage("overview");
        displayUserNavigation(user);
    } else {
        alert("Failed to register ");
    }
}