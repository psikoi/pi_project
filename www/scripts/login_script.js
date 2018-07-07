var users = [];
var currentUser;

function readLogInCookies() {
    var cookie = document.cookie;

    userId = cookie.split("=")[1]
    console.log(userId)

    if(userId != undefined){
        getUserAccounts();

        users.forEach(function(current){
            if(current.id = userId){
                currentUser = current;
            }
        });

        switchPage("overview");
        displayUserNavigation(currentUser);
    }
}

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

function userNameExists(username){
    var res = false;
    
    users.forEach(function(current){
        if(current.username.toUpperCase() == username.toUpperCase()){
            res = true;
        }
    });

    return res;
}

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

function getUser(username){
    var user;

    users.forEach(function(current){
        if(current.username == username){
            user = current;
        }
    });

    return user;
}

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

function logout() {
    if (confirm("Are you sure you wish to logout?")) {
        var requestOk = sendLogoutRequest(currentUser);
        if (requestOk) {
            removeLogInCookies();
            switchPage("landing");
            displayUserNavigation(null);
        } else {
            alert("Failed to logout ");
        }
    }
}

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
        document.cookie = "loggedInUser = " + user.id;
        currentUser = user;
        switchPage("overview");
        displayUserNavigation(user);
    } else {
        alert("Failed to login ");
    }   
}
