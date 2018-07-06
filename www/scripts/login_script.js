function buildLogin() {
    var pane = buildBaseForm("Login to your admin account", "javascript: login()");
    var form = pane.children[0];

    form.appendChild(buildBasicInput("user_username", "Username"));
    form.appendChild(buildPasswordInput("user_password", "Password"));
    form.appendChild(buildBasicSubmit("Login"));
}

function logout() {
    if (confirm("Are you sure you wish to logout?")) {
        //TODO fazer request aqui
        if (true) {
            switchPage("landing");
            displayUserNavigation(null);
        } else {
            alert("Failed to login " + mensagemErro);
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

    //TODO TROCAR POR USER REAL
    var user = {
        username: "Ruben A.",
        profilePic: "https://scontent.flis6-1.fna.fbcdn.net/v/t1.0-1/p160x160/14203139_1171191686287756_1371049704152551327_n.jpg?_nc_cat=0&oh=c08d35b96e20fc9ae5263d03519297b9&oe=5BE3C970"
    }

    //TODO fazer request aqui
    if (true) {
        switchPage("overview");
        displayUserNavigation(user);
    } else {
        alert("Failed to login " + mensagemErro);
    }
}