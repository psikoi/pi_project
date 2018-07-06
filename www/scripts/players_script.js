var selectedPlayerId;

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

    //TODO TROCAR POR ARRAY DE PAISES NA BD
    form.appendChild(buildSelector("player_country", ["Portugal", "France"]));
    form.appendChild(buildBasicSubmit("Add"));
}

/**
 * Builds the edit player form.
 */
function buildEditPlayer() {

    //fazer request de get player usando o id que tá na variavel selectedPlayerId
    //TODO TROCAR POR PLAYER REAL
    var player = {
        id: 1,
        rank: 8310,
        username: "baziiK",
        birthdate: "1996-06-30", //ano, mês, dia
        country: "France",
        status: "N/A"
    }

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

    //TODO TROCAR POR ARRAY DE PAISES NA BD
    var country = buildSelector("player_country", ["Portugal", "France"]);
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

    if (nameExists) { //TROCAR POR VERIFICAÇÃO REAL
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

    if (!isYearsOlder(new Date(birthDate), 12)) {
        alert("You must be 12 years old or older to register.");
        return;
    }

    //enviar pedido aqui

    if (requestOk) { //trocar pela variavel que diz se o pedido foi bem sucedido
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

    if (nameExists) { //TROCAR POR VERIFICAÇÃO REAL
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

    //enviar pedido aqui

    if (requestOk) { //trocar pela variavel que diz se o pedido foi bem sucedido
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

    //enviar pedido aqui

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
    //enviar pedido aqui

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

/**
 * Fetches and builds a data table with given filters.
 */
function buildPlayersTable(filters) {

    if (filters != null) {
        //TODO enviar pedido com os filters tipo:
        // timespan: "All time"
        // search: "tiago"
        console.log(JSON.stringify(filters));
    }

    //TODO TROCAR POR DATA REAL
    var data = [
        {
            id: 0,
            rank: 567,
            username: "tiagofsantos",
            age: 19,
            country: "PT",
            status: "Banned"
        },
        {
            id: 1,
            rank: 8310,
            username: "baziiK",
            age: 20,
            country: "PT",
            status: "N/A"
        }
    ];

    var table = document.createElement("table");
    table.id = "players_table";
    table.cellSpacing = "0";

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
    data.forEach(function (row) {
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