var selectedStatisticId;

/**
 * Builds the add statistic form.
 */
function buildAddStatistic() {
    var pane = buildBaseForm("Add a new game statistic", "javascript: addStatistic()");
    var form = pane.children[0];

    var types = ["Time", "Items Picked"]; //TODO TROCAR PELA LISTA REAL DE STATISTIC TYPES

    form.appendChild(buildBasicInput("statistic_sessionId", "Game Session Id"));
    form.appendChild(buildSelector("statistic_type", types));
    form.appendChild(buildBasicInput("statistic_value", "Value"));
    form.appendChild(buildBasicSubmit("Add"));
}

/**
 * Builds the edit statistic form.
 */
function buildEditStatistic() {

    //fazer request de get statistic usando o id que tá na variavel selectedStatisticId
    //TODO TROCAR POR STATISTIC REAL
    var statistic = {
        id: 2,
        gameSessionId: 1,
        type: "Items Picked",
        value: "03:18"
    };

    var pane = buildBaseForm("Edit a game statistic", "javascript: editStatistic()");
    var form = pane.children[0];

    var types = ["Time", "Items Picked"]; //TODO TROCAR PELA LISTA REAL DE STATISTIC TYPES

    var sessionId = buildBasicInput("statistic_sessionId", "Game Session Id");
    var type = buildSelector("statistic_type", types);
    var value = buildBasicInput("statistic_value", "Value");

    sessionId.value = statistic.gameSessionId;
    type.value = statistic.type;
    value.value = statistic.value;

    form.appendChild(sessionId);
    form.appendChild(type);
    form.appendChild(value);

    form.appendChild(buildBasicSubmit("Edit"));
}

/**
 * Builds the remove statistic dialog.
 */
function buildRemoveStatistic() {
    if (confirm("Are you sure? This statistic will be permanently removed.")) {
        removeStatistic();
    }
}

/**
 * Adds a new game statistic.
 * This method verifies the user inputs and makes a add statistic
 * request to the server.
 */
function addStatistic() {

    var sessionId = document.getElementById("statistic_sessionId").value;
    var type = document.getElementById("statistic_type").value;
    var value = document.getElementById("statistic_value").value;

    if (sessionId.length == 0 || !isInt(sessionId)) {
        alert("That session id is not valid");
        return;
    }

    if (!sessionExists) { //TROCAR POR VERIFICAÇÃO REAL
        alert("That session does not exist.");
        return;
    }

    if (value.length == 0) {
        alert("That value is not valid");
        return;
    }

    //enviar pedido aqui

    if (requestOk) { //trocar pela variavel que diz se o pedido foi bem sucedido
        alert("Statistic added");
        closeForm();
        updateStatisticsTable();
    } else {
        alert("Statistic failed to add")
    }
}

/**
 * Edits a game statistic.
 * This method verifies the user inputs and makes a edit statistic
 * request to the server.
 */
function editStatistic() {

    var sessionId = document.getElementById("statistic_sessionId").value;
    var type = document.getElementById("statistic_type").value;
    var value = document.getElementById("statistic_value").value;

    if (sessionId.length == 0 || !isInt(sessionId)) {
        alert("That session id is not valid");
        return;
    }

    if (!sessionExists) { //TROCAR POR VERIFICAÇÃO REAL
        alert("That session does not exist.");
        return;
    }

    if (value.length == 0) {
        alert("That value is not valid");
        return;
    }

    //enviar pedido aqui

    if (requestOk) { //trocar pela variavel que diz se o pedido foi bem sucedido
        alert("Statistic edited");
        closeForm();
        updateStatisticsTable();
    } else {
        alert("Statistic failed to edit")
    }
}

/**
 * Makes a server request to remove a statistic.
 */
function removeStatistic() {

    //enviar pedido aqui

    if (requestOk) { //trocar pela variavel que diz se o pedido foi bem sucedido
        alert("Statistic removed");
        updateSessionsTable();
    } else {
        alert("Statistic failed to remove")
    }
}

/**
 * Updates the filters with the value of the 
 * filter selector and input. Then calls for a table update.
 */
function updateStatisticsFilters() {
    var search = document.getElementById("statistics_search");
    var selector = document.getElementById("statistics_timespan");

    var filters = new Object();
    filters.timespan = selector.value;

    if (search.value.length > 0)
        filters.search = search.value;

    updateStatisticsTable(filters);
}

/**
 * Updates the table, deleting the outdated one, recreating
 * a new and updated table, using the filters given by parameter.
 */
function updateStatisticsTable(filters) {
    var parent = document.getElementById("statistics").children[0];
    parent.removeChild(document.getElementById("statistics_table"));
    parent.appendChild(buildStatisticsTable(filters));

    selectedStatisticId = -1;
    prepareStatisticsSelectionEvents();
}

/**
 * Fetches and builds a data table with given filters.
 */
function buildStatisticsTable(filters) {

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
            gameSessionId: 5,
            type: "Time",
            value: "02:50"
        },
        {
            id: 2,
            gameSessionId: 1,
            type: "Time",
            value: "03:18"
        },
    ];

    var table = document.createElement("table");
    table.id = "statistics_table";
    table.cellSpacing = "0";

    var columns = ["Id", "Game Session Id", "Type", "Value"];
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
 * Builds the entire statistics page with its title, subtitle, table filters,
 * table actions and data table.
 */
function buildStatistics() {

    var createActionButton = function (id, event, text) {
        var btn = document.createElement("button");
        btn.id = id;
        btn.onclick = event;
        btn.textContent = text;
        return btn;
    }

    var pageContent = document.getElementById("page_content");

    var section = document.createElement("section");
    section.id = "statistics";

    var sectionContainer = document.createElement("div");
    sectionContainer.className = "section_container";

    var sectionTitle = document.createElement("div");
    sectionTitle.className = "section_title";

    var header = document.createElement("h1");
    header.textContent = "Statistics";

    var subheader = document.createElement("h2");
    subheader.textContent = "Manage and browse through all of the game's statistics.";

    sectionTitle.appendChild(header);
    sectionTitle.appendChild(subheader);

    var tableFilter = document.createElement("div");
    tableFilter.className = "table_filter";

    var searchContainer = document.createElement("div");
    searchContainer.id = "search_bar";

    var searchImg = document.createElement("img");
    searchImg.src = "images/icons/search.png";

    var input = document.createElement("input");
    input.id = "statistics_search";
    input.type = "text";
    input.addEventListener("keyup", function (event) {
        // Update filters when the Enter key is pressed up.
        if (event.keyCode === 13) {
            updateStatisticsFilters();
        }
    });

    searchContainer.appendChild(searchImg);
    searchContainer.appendChild(input);

    var selector = document.createElement("select");
    selector.id = "statistics_timespan";
    selector.onchange = updateStatisticsFilters;

    const options = ["All time", "This month", "This week", "Today"];

    for (var option in options) {
        var opt = document.createElement('option');
        opt.value = options[option];
        opt.innerHTML = options[option];
        selector.appendChild(opt);
    }

    var buttonsContainer = document.createElement("div");
    buttonsContainer.className = "table_actions";

    buttonsContainer.appendChild(createActionButton("statistics_add", buildAddStatistic, "Add"));
    buttonsContainer.appendChild(createActionButton("statistics_edit", buildEditStatistic, "Edit"));
    buttonsContainer.appendChild(createActionButton("statistics_remove", buildRemoveStatistic, "Remove"));

    tableFilter.appendChild(searchContainer);
    tableFilter.appendChild(selector);
    tableFilter.appendChild(buttonsContainer);

    sectionContainer.appendChild(sectionTitle);
    sectionContainer.appendChild(tableFilter);
    sectionContainer.appendChild(buildStatisticsTable());

    section.appendChild(sectionContainer);
    pageContent.appendChild(section);

    toggleStatisticsActions(false);
    prepareStatisticsSelectionEvents();
}

/**
 * Sets up the table row selection events.
 */
function prepareStatisticsSelectionEvents() {
    $("table tbody tr").click(function () {

        var row = $(this);

        if (row.hasClass("selected_table_row")) {
            row.removeClass('selected_table_row');
            toggleStatisticsActions(false);
        } else {
            row.addClass('selected_table_row');
            row.siblings().removeClass('selected_table_row');
            toggleStatisticsActions(true);
        }

        selectedStatisticsId = row.find('td:first').html();
    });
}

/**
 * Toggles the specified buttons depending on the
 * value of selected.
 */
function toggleStatisticsActions(selected) {
    var toggle = function (id) {
        var btn = document.getElementById(id);
        btn.disabled = !selected;
        btn.className = selected ? "" : "disabled_button";
    }

    toggle("statistics_edit");
    toggle("statistics_remove");
}