var selectedPlayerId;

/**
 * Holds the information of the players currently being shown 
 */
var currentPlayers = [];

/**
 * Holds the information of the names of the countries available in the database. 
 * Key: name, Value: id
 * 
 * example, after being populated:
 * { 1 : "Portugal", 2 : "Spain" }
 */
var countries = {}

/**
 * Gets the players from the database based on a filter, and populates the currentPlayers array with the result.
 */
function getPlayers(filter) {
    currentPlayers = []

    var endpoint = "/player";
    switch (filter.timespan) {
        case "This month": endpoint += "/month"; break;
        case "This week": endpoint += "/week"; break;
        case "Today": endpoint += "/today"; break;
    }

    getPlayersFilter(endpoint);

    var aux = [];

    if (filter.search) {
        currentPlayers.forEach(function (current) {
            if (current.username.toLowerCase().includes(filter.search.toLowerCase())) {
                aux.push(current);
                return;
            }
        });

        currentPlayers = aux;
    }
}

/**
 * Gets the players from the database given a certain endpoint.
 */
function getPlayersFilter(endpoint) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint, false);
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            JSON.parse(this.responseText).players.forEach(function (r) {
                currentPlayers.push(r);
            });
        }
    }
    xhr.send();
}

/**
 * Gets the number of the last rank in the player table.
 */
function getLastPlayerRank() {
    var ranks = [];

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/player", false);
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            JSON.parse(this.responseText).players.forEach(function (r) {
                ranks.push(r.rank);
            });
        }
    }
    xhr.send();

    var minimum = ranks[1];

    ranks.forEach(function (current) {
        if (minimum < current)
            minimum = current;
    });

    return minimum;
}

/**
 * Gets the countries from the database and populates the countries object with their id and name.
 */
function getCountries() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/countries", false);
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            JSON.parse(this.responseText).countries.forEach(function (r) {
                countries[r.name] = r.id;
            });
        }
    }
    xhr.send();
}

/**
 * Sends a request to the database to add a player, using the POST endpoint.
 * @param {string} username - Username of the player being added.
 * @param {string} password - Password of the player being added.
 * @param {string} birthDate - Birth date of the player being added.
 * @param {string} country - Country of the player being added.
 */
function sendAddPlayerRequest(username, password, birthDate, country) {
    var countryId = countries[country];
    var rank = getLastPlayerRank() + 1;

    var success = true;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/player", false);
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            if ("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        }
    }

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        "rank": rank, "username": username, "password": password, "birthDate": birthDate,
        "status": "Active", "countryId": countryId, "registrationDate": getCurrentDateString(),
        "userTypeId": 2
    }));

    return success;
}

/**
 * Sends a request to the database to edit a player, using the PUT endpoint.
 * @param {string} username - Username of the player being edited.
 * @param {string} password - Password of the player being edited.
 * @param {string} birthDate - Birth date of the player being edited.
 * @param {string} country - Country of the player being edited.
 */
function sendEditPlayerRequest(username, password, birthDate, country) {
    var countryId = countries[country];

    var success = true;

    var player = getPlayerById(selectedPlayerId);

    registrationDate = player.registration_date.split("T")[0];

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/player", false);
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            if ("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        }
    }

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        "id": selectedPlayerId, "rank": player.rank, "username": username, "password": password, "birthDate": birthDate,
        "status": player.status, "countryId": countryId, "registrationDate": registrationDate,
        "userTypeId": player.user_type_id
    }));

    return success;
}

/**
 * Sends a request to the database to ban a player.
 * To ban a player, the database will change the status field to "Banned".
 */
function sendChangePlayerStatusRequest() {
    var success = true;

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/player/ban", false);
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            if ("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        }
    }

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ "id": selectedPlayerId }));

    return success;
}

/**
 * Sends a request to the database to delete a player, using the DELETE endpoint.
 */
function deletePlayer() {
    var success = true;

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/player", false);
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            if ("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        }
    }

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ "id": selectedPlayerId }));

    return success;
}

/**
 * Checks if there is already a player with a certain username.
 * @param {string} username - Username being checked.
 */
function nameExists(username) {
    var confirmation = false;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/player", false);
    xhr.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            JSON.parse(this.responseText).players.forEach(function (r) {
                if (r.username.toUpperCase() === username.toUpperCase()) {
                    confirmation = true;
                    return;
                }
            });
        }
    }
    xhr.send();
    return confirmation;
}

/**
 * Returns a player object with a certain id.
 * @param {int} id - Id of the player being searched.
 */
function getPlayerById(id) {
    var player;

    currentPlayers.forEach(function (current) {
        if (current.id == id) {
            player = current;
        }
    });

    return player;
}

/**
 * Returns the current date in string format.
 * Example: 2018-07-02
 */
function getCurrentDateString() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    return yyyy + '-' + mm + '-' + dd;
}

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

    currentPlayers.forEach(function (current) {
        if (current.id == selectedPlayerId) {
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
    birthdate.value = player['birth_date'].substring(0, 10);

    form.appendChild(birthdate);

    var countryLabel = document.createElement("span");
    countryLabel.className = "form_label";
    countryLabel.textContent = "Country";
    form.appendChild(countryLabel);

    var country = buildSelector("player_country", Object.keys(countries));

    var countryId = player['country_id'];

    Object.keys(countries).forEach(function (c) {
        if (countries[c] == countryId) {
            country.value = c;
        }
    });

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
        changePlayerStatus();
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

function recalculateRankings() {

    var loadSessions = function (callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/session", false);
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                JSON.parse(this.responseText).sessions.forEach(function (r) {
                    sessions.push(r);
                });
                callback();
            }
        }
        xhr.send();
    }

    var loadStatistics = function (callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/statistic", false);
        xhr.onreadystatechange = function () {
            if (this.status === 200 && this.readyState === 4) {
                JSON.parse(this.responseText).statistics.forEach(function (r) {
                    statistics.push(r);
                });
            }
            callback();
        }
        xhr.send();
    }

    var convertToScore = function (levelId, statisticType, value) {

        switch (statisticType) {
            case 1:
                return Math.pow((1 / value) * 1000, levelId);
            case 2:
                return Math.pow(value, levelId);
            case 3:
                return Math.pow((1 / value) * 10, levelId);
        }

    }

    var addScore = function (playerId, score) {
        if (scoreBoard[playerId] == null)
            scoreBoard[playerId] = score;
        else
            scoreBoard[playerId] += score;
    }

    var sort = function () {
        var sortable = [];
        for (var obj in scoreBoard) {
            sortable.push([obj, scoreBoard[obj]]);
        }

        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });


        scoreBoard = [];
        for (var a in sortable) {
            scoreBoard.push([parseInt(sortable[a][0]), sortable[a][1]]);
        }
    }

    var updatePlayer = function (id, rank) {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "/player/rank", false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify({ "rank": rank, "id": id }));
    }

    var calculate = function () {

        sessions.forEach(function (s) {

            var id = s["id"];
            var playerId = s["player_id"];
            var levelId = s["level_id"];

            statistics.forEach(function (t) {

                var type = t['statistic_type_id'];
                var value = t['value'];

                if (t['game_session_id'] === id) {
                    addScore(playerId, convertToScore(levelId, type, value));
                }

            });
        });

        sort();

        for (var s in scoreBoard) {
            updatePlayer(scoreBoard[s][0], (parseInt(s) + 1));
        }
    }

    var scoreBoard = {};
    var sessions = [];
    var statistics = [];

    loadSessions(function () {
        loadStatistics(function () {
            calculate();
        });
    });
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
function changePlayerStatus() {

    var requestOk = sendChangePlayerStatusRequest();

    if (requestOk) {
        alert("Player status changed.");
        updatePlayersTable();
    } else {
        alert("Player failed to change status.")
    }
}

/**
 * Makes a server request to remove a player.
 */
function removePlayer() {
    var requestOk = deletePlayer();

    if (requestOk) {
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
    togglePlayerActions(false);
    preparePlayerSelectionEvents();
}

/**
 * Builds an array containing the information necessary to display on the table.
 * The currentPlayers array contains information that isn't necessary,
 * and information that isn't yet processed, for example, it contains information
 * about the player's birth date and not age.
 * This method will process the necessary information and return it.
 */
function buildPlayersTableData() {
    var data = [];

    currentPlayers.forEach(function (current) {
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

/**
 * Returns a country's name, based on the id received.
 * @param {int} id - Id of the country being searched. 
 */
function getCountryNameById(id) {
    var name;
    for (var key in countries) {
        if (countries.hasOwnProperty(key)) {
            if (countries[key] == id) {
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

    if (filters == null) {
        filters = {
            "timespan": "All time"
        };
    }


    getPlayers(filters);

    var table = document.createElement("table");
    table.id = "players_table";
    table.cellSpacing = "0";

    var tableData = buildPlayersTableData();

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
    input.placeholder = "Search player name";
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

    getCountries();

    sectionContainer.appendChild(buildPlayersTable());

    section.appendChild(sectionContainer);
    pageContent.appendChild(section);

    togglePlayerActions(false);
    preparePlayerSelectionEvents();


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