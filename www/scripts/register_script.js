function buildRegister() {
    var pane = buildBaseForm("Register a new admin account", "javascript: register()");
    var form = pane.children[0];

    form.appendChild(buildBasicInput("user_username", "Username"));
    form.appendChild(buildPasswordInput("user_password", "Password"));
    form.appendChild(buildPasswordInput("user_password_confirm", "Password (Confirmation)"));
    form.appendChild(buildBasicSubmit("Register"));
}

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
        alert("Failed to register " + mensagemErro);
    }
}