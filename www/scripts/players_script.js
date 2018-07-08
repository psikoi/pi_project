var selectedPlayerId;

// Holds the information of the players currently being shown 
var currentPlayers = [];

// Holds the information of the names of the countries available in the database. Key: name, Value: id
var countries = {}

/******************************************************************** */

function getPlayers(filter){
    currentPlayers = []

    var endpoint = "/player";
    switch(filter.timespan){
        case "This month": endpoint += "/month"; break;
        case "This week": endpoint += "/week"; break;
        case "Today": endpoint += "/today"; break;
    }
    getPlayersFilter(endpoint);
    
    var aux = [];

    if(filter.search){
        currentPlayers.forEach(function(current){
            if(current.username === filter.search){
                aux = [current];
                return;
            }
        });

        currentPlayers = aux;
    }
}

function getPlayersFilter(endpoint){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint, false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).players.forEach(function(r){
                currentPlayers.push(r);
            });
        }
    }
    xhr.send();
}

function getLastPlayerRank(){
    var ranks = [];

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/player", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).players.forEach(function(r){
                ranks.push(r.rank);
            });
        }
    }
    xhr.send();

    var minimum = ranks[1];

    ranks.forEach(function(current){
        if(minimum < current)
            minimum = current;
    });

    return minimum;
}

function getCountries(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/countries", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).countries.forEach(function(r){
                countries[r.name] = r.id; 
            });
        }
    }
    xhr.send();
}

function sendAddPlayerRequest(username, password, birthDate, country){
    var countryId = countries[country];
    var rank = getLastPlayerRank() + 1;

    var success = true;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/player", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            if("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        }
    }

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"rank": rank, "username": username, "password": password, "birthDate": birthDate,
                            "status": "Active", "countryId": countryId, "registrationDate": getCurrentDateString(),
                            "userTypeId": 2}));

    return success;
}

function sendEditPlayerRequest(username, password, birthDate, country){
    var countryId = countries[country];

    var success = true;

    var player = getPlayerById(selectedPlayerId);

    registrationDate = player.registration_date.split("T")[0];

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/player", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            if("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        }
    }
    
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"id": selectedPlayerId, "rank": player.rank, "username": username, "password": password, "birthDate": birthDate,
                            "status": player.status, "countryId": countryId, "registrationDate":registrationDate,
                            "userTypeId": player.user_type_id}));

    return success;
}

function sendBanPlayerRequest(){
    var success = true;

    var player;

    currentPlayers.forEach(function(current){
        if(current.id == selectedPlayerId){
            player = current;
            return;
        }
    });

    registrationDate = player.registration_date.split("T")[0];
    birthDate = player.birth_date.split("T")[0];

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/player", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            if("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        }
    }
    
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"id": selectedPlayerId, "rank": player.rank, "username": player.username, "password": player.password, "birthDate": birthDate,
                            "status": "Banned", "countryId": player.country_id, "registrationDate": registrationDate,
                            "userTypeId": player.user_type_id}));

    return success;
}

function deletePlayer(){
    var success = true;
    
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/player", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            if("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        }
    }
    
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"id": selectedPlayerId}));

    return success;
}

/*********************************************************************** */

function nameExists(username){
    var confirmation = false;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/player", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).players.forEach(function(r){
                if(r.username.toUpperCase() === username.toUpperCase()){
                    confirmation = true;
                    return;
                }
            });
        }
    }
    xhr.send();
    return confirmation;
}

function getPlayerById(id){
    var player;

    currentPlayers.forEach(function(current){
        if(current.id == id){
            player = current;
        }
    });

    return player;
}

function getCurrentDateString(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    return yyyy + '-' + mm + '-' + dd;
}

/*********************************************************************** */

/**
 * Builds the add player form.
 */
function buildAddPlayer() {
    var pane = buildBaseForm("Add a new player account", "javascript: addPlayer()");
    var form = pane.children[0];

    form.appendChild(buildBasicInput("player_username", "Username"));
    form.appendChild(buildPasswordInput("player_password", "Password"));
    form.appendChild(buildPasswordInput("player_password_confirm", "Password (Confirmation)"));

    var birthdateLabel = document.createElement("span");
    birthdateLabel.className = "form_label";
    birthdateLabel.textContent = "Birthdate";
    form.appendChild(birthdateLabel);

    form.appendChild(buildDateInput("player_birthdate"));

    var countryLabel = document.createElement("span");
    countryLabel.className = "form_label";
    countryLabel.textContent = "Country";
    form.appendChild(countryLabel);

    
    form.appendChild(buildSelector("player_country", Object.keys(countries)));
    form.appendChild(buildBasicSubmit("Add"));
}

/**
 * Builds the edit player form.
 */
function buildEditPlayer() {
    var player;

    currentPlayers.forEach(function(current){
        if(current.id == selectedPlayerId){
            player = current;
        }
    });

    var pane = buildBaseForm("Edit a player account", "javascript: editPlayer()");
    var form = pane.children[0];

    var username = buildBasicInput("player_username", "Username");
    var password = buildBasicInput("player_password", "Password");
    var passwordConfirm = buildPasswordInput("player_password_confirm", "Password (Confirmation)");

    username.value = player.username;

    form.appendChild(username);
    form.appendChild(password);
    form.appendChild(passwordConfirm);

    var birthdateLabel = document.createElement("span");
    birthdateLabel.className = "form_label";
    birthdateLabel.textContent = "Birthdate";
    form.appendChild(birthdateLabel);

    var birthdate = buildDateInput("player_birthdate");
    birthdate.value = player.birthdate;

    form.appendChild(birthdate);

    var countryLabel = document.createElement("span");
    countryLabel.className = "form_label";
    countryLabel.textContent = "Country";
    form.appendChild(countryLabel);

    var country = buildSelector("player_country", Object.keys(countries));
    country.value = player.country;

    form.appendChild(country);

    form.appendChild(buildBasicSubmit("Confirm"));
}

/**
 * Builds the remove player dialog.
 */
function buildRemovePlayer() {
    if (confirm("Are you sure? This player will be permanently removed.")) {
        removePlayer();
    }
}

/**
 * Builds the ban player dialog.
 */
function buildBanPlayer() {
    if (confirm("Are you sure? This player will be banned.")) {
        banPlayer();
    }
}

/**
 * Adds a new player account.
 * This method verifies the user inputs and makes a add player
 * request to the server.
 */
function addPlayer() {

    const minimumPasswordLength = 8;

    var username = document.getElementById("player_username").value;
    var password = document.getElementById("player_password").value;
    var passwordConfirm = document.getElementById("player_password_confirm").value;
    var birthDate = document.getElementById("player_birthdate").value;
    var country = document.getElementById("player_country").value;

    if (username.length == 0) {
        alert("That username is not valid");
        return;
    }

    if (nameExists(username)) { 
        alert("That username already exist.");
        return;
    }

    if (password.length < minimumPasswordLength) {
        alert("The password must be " + minimumPasswordLength + " characters or more long.");
        return;
    }

    if (password !== passwordConfirm) {
        alert("The passwords do not match");
        return;
    }

    if (birthDate.length == 0) {
        alert("That date is invalid");
        return;
    }

    if (getAge(new Date(birthDate)) < 12) {
        alert("You must be 12 years old or older to register.");
        return;
    }
    
    var requestOk = sendAddPlayerRequest(username, password, birthDate, country);

    if (requestOk) { 
        alert("Player added");
        closeForm();
        updatePlayersTable();
    } else {
        alert("Player failed to add")
    }
}

/**
 * Edits a player account.
 * This method verifies the user inputs and makes a edit player
 * request to the server.
 */
function editPlayer() {

    const minimumPasswordLength = 8;

    var username = document.getElementById("player_username").value;
    var password = document.getElementById("player_password").value;
    var passwordConfirm = document.getElementById("player_password_confirm").value;
    var birthDate = document.getElementById("player_birthdate").value;
    var country = document.getElementById("player_country").value;

    if (username.length == 0) {
        alert("That username is not valid");
        return;
    }

    var player = getPlayerById(selectedPlayerId);

    if (nameExists(username) && username != player.username) { 
        alert("That username already exist.");
        return;
    }

    if (password.length < minimumPasswordLength) {
        alert("The password must be " + minimumPasswordLength + " characters or more long.");
        return;
    }

    if (password !== passwordConfirm) {
        alert("The passwords do not match");
        return;
    }

    if (birthDate.length == 0) {
        alert("That date is invalid");
        return;
    }

    var requestOk = sendEditPlayerRequest(username, password, birthDate, country);

    if (requestOk) { 
        alert("Player edited");
        closeForm();
        updatePlayersTable();
    } else {
        alert("Player failed to edit")
    }
}

/**
 * Makes a server request to ban a player.
 */
function banPlayer() {

    requestOk = sendBanPlayerRequest();

    if (requestOk) { //trocar pela variavel que diz se o pedido foi bem sucedido
        alert("Player banned");
        updatePlayersTable();
    } else {
        alert("Player failed to ban")
    }
}

/**
 * Makes a server request to remove a player.
 */
function removePlayer() {
    
    requestOk = deletePlayer();

    if (requestOk) { //trocar pela variavel que diz se o pedido foi bem sucedido
        alert("Player removed");
        updatePlayersTable();
    } else {
        alert("Player failed to remove")
    }
}

/**
 * Updates the filters with the value of the 
 * filter selector and input. Then calls for a table update.
 */
function updatePlayersFilters() {
    var search = document.getElementById("players_search");
    var selector = document.getElementById("players_timespan");

    var filters = new Object();
    filters.timespan = selector.value;

    if (search.value.length > 0)
        filters.search = search.value;

    updatePlayersTable(filters);
}

/**
 * Updates the table, deleting the outdated one, recreating
 * a new and updated table, using the filters given by parameter.
 */
function updatePlayersTable(filters) {
    var parent = document.getElementById("players").children[0];
    parent.removeChild(document.getElementById("players_table"));
    parent.appendChild(buildPlayersTable(filters));

    selectedPlayerId = -1;
    preparePlayerSelectionEvents();
}

function buildTableData(){
    var data = [];
    
    currentPlayers.forEach(function(current){
        var auxData = {};
        auxData["Id"] = current.id;
        auxData["Rank"] = current.rank;
        auxData["Username"] = current.username;
        auxData["Age"] = getAge(new Date(current.birth_date.split("T")[0]));
        auxData["Country"] = getCountryNameById(current.country_id);
        auxData["Status"] = current.status;
        data.push(auxData);
    });
    return data;
}

function getCountryNameById(id){
    var name;
    for (var key in countries) {
        if (countries.hasOwnProperty(key)) {
            if(countries[key] == id){
                name = key;
            }
        }
    }
    return name;
}

/**
 * Fetches and builds a data table with given filters.
 */
function buildPlayersTable(filters) {

    if (filters != null) {
        getPlayers(filters);
    }
    
    var table = document.createElement("table");
    table.id = "players_table";
    table.cellSpacing = "0";

    // TODO Acertar a data recebida pelo request (no array currentPlayers) com as colunas da tabela. 
    // TODO Calcular idade através da data de nascimento e exibi-la, ir buscar o nome do pais sabendo o seu id. (variavel global countries, fazer request no inico da app a todos os countries e iterar o array)

    var tableData = buildTableData();

    var columns = ["Id", "Rank", "Username", "Age", "Country", "Status"];
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    columns.forEach(function (c) {
        var column = document.createElement("th");
        column.textContent = c;
        headRow.appendChild(column);
    })
    thead.appendChild(headRow);

    var tbody = document.createElement("tbody");

    tableData.forEach(function (row) {
        var tableRow = document.createElement("tr");
        Object.keys(row).forEach(function (field) {
            var td = document.createElement("td");
            td.textContent = row[field];
            if (row[field] == "Banned") {
                td.className = "player_status_banned";
            }

            tableRow.appendChild(td);
        })
        tbody.appendChild(tableRow);
    })

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

/**
 * Builds the entire players page with its title, subtitle, table filters,
 * table actions and data table.
 */
function buildPlayers() {

    var createActionButton = function (id, event, text) {
        var btn = document.createElement("button");
        btn.id = id;
        btn.onclick = event;
        btn.textContent = text;
        return btn;
    }

    var pageContent = document.getElementById("page_content");

    var section = document.createElement("section");
    section.id = "players";

    var sectionContainer = document.createElement("div");
    sectionContainer.className = "section_container";

    var sectionTitle = document.createElement("div");
    sectionTitle.className = "section_title";

    var header = document.createElement("h1");
    header.textContent = "Players";

    var subheader = document.createElement("h2");
    subheader.textContent = "Manage and browse through our entire player base.";

    sectionTitle.appendChild(header);
    sectionTitle.appendChild(subheader);

    var tableFilter = document.createElement("div");
    tableFilter.className = "table_filter";

    var searchContainer = document.createElement("div");
    searchContainer.id = "search_bar";

    var searchImg = document.createElement("img");
    searchImg.src = "images/icons/search.png";

    var input = document.createElement("input");
    input.id = "players_search";
    input.type = "text";
    input.addEventListener("keyup", function (event) {
        // Update filters when the Enter key is pressed up.
        if (event.keyCode === 13) {
            updatePlayersFilters();
        }
    });

    searchContainer.appendChild(searchImg);
    searchContainer.appendChild(input);

    var selector = document.createElement("select");
    selector.id = "players_timespan";
    selector.onchange = updatePlayersFilters;

    const options = ["All time", "This month", "This week", "Today"];

    for (var option in options) {
        var opt = document.createElement('option');
        opt.value = options[option];
        opt.innerHTML = options[option];
        selector.appendChild(opt);
    }

    var buttonsContainer = document.createElement("div");
    buttonsContainer.className = "table_actions";

    buttonsContainer.appendChild(createActionButton("players_add", buildAddPlayer, "Add"));
    buttonsContainer.appendChild(createActionButton("players_edit", buildEditPlayer, "Edit"));
    buttonsContainer.appendChild(createActionButton("players_ban", buildBanPlayer, "Ban"));
    buttonsContainer.appendChild(createActionButton("players_remove", buildRemovePlayer, "Remove"));

    tableFilter.appendChild(searchContainer);
    tableFilter.appendChild(selector);
    tableFilter.appendChild(buttonsContainer);

    sectionContainer.appendChild(sectionTitle);
    sectionContainer.appendChild(tableFilter);
    sectionContainer.appendChild(buildPlayersTable());

    section.appendChild(sectionContainer);
    pageContent.appendChild(section);

    togglePlayerActions(false);
    preparePlayerSelectionEvents();

    getCountries();
}

/**
 * Sets up the table row selection events.
 */
function preparePlayerSelectionEvents() {
    $("table tbody tr").click(function () {

        var row = $(this);

        if (row.hasClass("selected_table_row")) {
            row.removeClass('selected_table_row');
            togglePlayerActions(false);
        } else {
            row.addClass('selected_table_row');
            row.siblings().removeClass('selected_table_row');
            togglePlayerActions(true);
        }

        selectedPlayerId = row.find('td:first').html();
    });
}

/**
 * Toggles the specified buttons depending on the
 * value of selected.
 */
function togglePlayerActions(selected) {
    var toggle = function (id) {
        var btn = document.getElementById(id);
        btn.disabled = !selected;
        btn.className = selected ? "" : "disabled_button";
    }

    toggle("players_edit");
    toggle("players_ban");
    toggle("players_remove");
}