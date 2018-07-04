var selectedPlayerId;

/**
 * Updates the filters with the value of the 
 * filter selector and input. Then calls for a table update.
 */
function updatePlayersFilters() {
    var search = document.getElementById("players_search");
    var selector = document.getElementById("players_timespan");

    var filters = new Object();
    filters.search = search.value;
    filters.timespan = selector.value;

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

    buttonsContainer.appendChild(createActionButton("players_add", addPlayer, "Add"));
    buttonsContainer.appendChild(createActionButton("players_edit", editPlayer, "Edit"));
    buttonsContainer.appendChild(createActionButton("players_ban", banPlayer, "Ban"));
    buttonsContainer.appendChild(createActionButton("players_remove", removePlayer, "Remove"));

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

        selectedId = row.find('td:first').html();
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