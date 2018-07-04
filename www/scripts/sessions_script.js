var selectedSessionId;

/**
 * Creates the add session form.
 */
function addSession() {
}

/**
 * Creates the edit session form.
 */
function editSession() {
}

/**
 * Stub method, this should call backend methods to
 * delete a game session and also remove that session
 * from the sessions table.
 */
function removeSession() {
}

/**
 * Updates the filters with the value of the 
 * filter selector and input. Then calls for a table update.
 */
function updateSessionsFilters() {
    var search = document.getElementById("sessions_search");
    var selector = document.getElementById("sessions_timespan");

    var filters = new Object();
    filters.search = search.value;
    filters.timespan = selector.value;

    updateSessionsTable(filters);
}

/**
 * Updates the table, deleting the outdated one, recreating
 * a new and updated table, using the filters given by parameter.
 */
function updateSessionsTable(filters) {
    var parent = document.getElementById("sessions").children[0];
    parent.removeChild(document.getElementById("sessions_table"));
    parent.appendChild(buildSessionsTable(filters));
}

/**
 * Fetches and builds a data table with given filters.
 */
function buildSessionsTable(filters) {

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
            date: "27/03/2018 16:32",
            username: "tiagofsantos",
            leve: 1,
            character: "Scout",
            time: "02:50"
        },
        {
            id: 0,
            date: "27/03/2018 18:09",
            username: "Ruben",
            leve: 3,
            character: "Sargent",
            time: "03:18"
        }
    ];

    var table = document.createElement("table");
    table.id = "sessions_table";
    table.cellSpacing = "0";

    var columns = ["Id", "Date", "Username", "Level", "Character", "Time"];
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
            tableRow.appendChild(td);
        })
        tbody.appendChild(tableRow);
    })

    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

/**
 * Builds the entire sessions page with its title, subtitle, table filters,
 * table actions and data table.
 */
function buildSessions() {

    var createActionButton = function (id, event, text) {
        var btn = document.createElement("button");
        btn.id = id;
        btn.onclick = event;
        btn.textContent = text;
        return btn;
    }

    var pageContent = document.getElementById("page_content");

    var section = document.createElement("section");
    section.id = "sessions";

    var sectionContainer = document.createElement("div");
    sectionContainer.className = "section_container";

    var sectionTitle = document.createElement("div");
    sectionTitle.className = "section_title";

    var header = document.createElement("h1");
    header.textContent = "Sessions";

    var subheader = document.createElement("h2");
    subheader.textContent = "Manage and browse through all of our game sessions.";

    sectionTitle.appendChild(header);
    sectionTitle.appendChild(subheader);

    var tableFilter = document.createElement("div");
    tableFilter.className = "table_filter";

    var searchContainer = document.createElement("div");
    searchContainer.id = "search_bar";

    var searchImg = document.createElement("img");
    searchImg.src = "images/icons/search.png";

    var input = document.createElement("input");
    input.id = "sessions_search";
    input.type = "text";
    input.addEventListener("keyup", function (event) {
        // Update filters when the Enter key is pressed up.
        if (event.keyCode === 13) {
            updateSessionsFilters();
        }
    });

    searchContainer.appendChild(searchImg);
    searchContainer.appendChild(input);

    var selector = document.createElement("select");
    selector.id = "sessions_timespan";
    selector.onchange = updateSessionsFilters;

    const options = ["All time", "This month", "This week", "Today"];

    for (var option in options) {
        var opt = document.createElement('option');
        opt.value = options[option];
        opt.innerHTML = options[option];
        selector.appendChild(opt);
    }

    var buttonsContainer = document.createElement("div");
    buttonsContainer.className = "table_actions";

    buttonsContainer.appendChild(createActionButton("sessions_add", addSession, "Add"));
    buttonsContainer.appendChild(createActionButton("sessions_edit", editSession, "Edit"));
    buttonsContainer.appendChild(createActionButton("sessions_remove", removeSession, "Remove"));

    tableFilter.appendChild(searchContainer);
    tableFilter.appendChild(selector);
    tableFilter.appendChild(buttonsContainer);

    sectionContainer.appendChild(sectionTitle);
    sectionContainer.appendChild(tableFilter);
    sectionContainer.appendChild(buildSessionsTable());

    section.appendChild(sectionContainer);
    pageContent.appendChild(section);

    toggleSessionActions(false);
    prepareSessionSelectionEvents();
}

/**
 * Sets up the table row selection events.
 */
function prepareSessionSelectionEvents() {
    $("table tbody tr").click(function () {

        var row = $(this);

        if (row.hasClass("selected_table_row")) {
            row.removeClass('selected_table_row');
            toggleSessionActions(false);
        } else {
            row.addClass('selected_table_row');
            row.siblings().removeClass('selected_table_row');
            toggleSessionActions(true);
        }

        selectedSessionId = row.find('td:first').html();
    });
}

/**
 * Toggles the specified buttons depending on the
 * value of selected.
 */
function toggleSessionActions(selected) {
    var toggle = function (id) {
        var btn = document.getElementById(id);
        btn.disabled = !selected;
        btn.className = selected ? "" : "disabled_button";
    }

    toggle("sessions_edit");
    toggle("sessions_remove");
}