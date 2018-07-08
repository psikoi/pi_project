var selectedStatisticId;

// Holds the information of the statistics currently being shown 
var currentStatistics = [];

// Hold information about which users played which sessions. Key = session id, Value = username
var sessionPlayers = {};

var statisticTypes = {};

/******************************************************************** */

function getStatistics(filter){
    currentStatistics = []

    var endpoint = "/statistic";
    switch(filter.timespan){
        case "This month": endpoint += "/month"; break;
        case "This week": endpoint += "/week"; break;
        case "Today": endpoint += "/today"; break;
    }
    getStatisticsFilter(endpoint);
    
    var aux = [];

    if(filter.search){
        currentStatistics.forEach(function(current){
            if(sessionPlayers[current.game_session_id] === filter.search){
                aux.push(current);
                return;
            }
        });

        currentStatistics = aux;
    }
}

function getStatisticsFilter(endpoint){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", endpoint, false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).statistics.forEach(function(r){
                currentStatistics.push(r);
            });
        }
    }
    xhr.send();
}

function getSessionByPlayer(){
    var sessions = [];

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/session", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).sessions.forEach(function(r){
                sessions.push(r);
            });
        }
    }
    xhr.send();


    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/player", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).players.forEach(function(r){
                
                sessions.forEach(function(currSession){
                    if(currSession.player_id === r.id){
                        sessionPlayers[currSession.id] = r.username;
                    }
                });

            });
        }
    }
    xhr.send();
}

function getStatisticTypes(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/statisticType", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).statisticTypes.forEach(function(r){
                statisticTypes[r.id] = r.name;
            });
        }
    }
    xhr.send();
}

function sendAddStatisticRequest(sessionId, type, value){
    var success = true;

    var statisticTypeId = getStatisticTypeByFormattedName(type);
    var dateString = getCurrDateString();

    if(type == "Time"){
        value = getSecondsByTimeString(value);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/statistic", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            if("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        }
    }

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"value": value, "registrationDate": dateString, "statisticTypeId": statisticTypeId, "gameSessionId": sessionId}));
    return success;
}

function sendEditStatisticRequest(sessionId, type, value){
    var success = true;

    var statistic = getCurrentStatistic();

    if(type == "Time"){
        value = getSecondsByTimeString(value);
    }

    var registrationDate = statistic.registration_date.split("T")[0];
    var statisticTypeId = getStatisticTypeByFormattedName(type);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/statistic", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            if("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        }
    }

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"id": selectedStatisticId, "value": value, "registrationDate": registrationDate, "statisticTypeId": statisticTypeId, "gameSessionId": sessionId}));
    
    return success;
}

function sendDeleteStatisticRequest(){
    var success = true;
    
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/statistic", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            if("message" in JSON.parse(this.responseText) && JSON.parse(this.responseText).message === "error")
                success = false;
        }
    }
    
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"id": selectedStatisticId}));

    return success;
}

/*********************************************************************** */
function getCurrentStatistic(){
    var statistic;
    currentStatistics.forEach(function(current){
        if(current.id == selectedStatisticId){
            statistic = current;
        }
    });
    return statistic;
}

function getSecondsByTimeString(time){
    var minutes = parseInt(time.split(":")[0]);
    var seconds = parseInt(time.split(":")[1]);

    minutes = minutes * 60;
    return parseInt(seconds + minutes);
}

function getCurrDateString(){
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

function getStatisticTypeNames(){
	var aux = [];
    for (var key in statisticTypes) {
        if (statisticTypes.hasOwnProperty(key)) {
            aux.push(statisticTypes[key]);
        }
    }
    var final = [];

    aux.forEach(function(current){
        finalString = formatString(current)
        
        final.push(finalString);

    });
    return final;
}

function formatString(string){
    var strings = string.split("_");
    var finalString = "";
    var index = 1;

    strings.forEach(function(curr){
        finalString += curr.charAt(0).toUpperCase() + curr.slice(1);
        if(strings[index] != undefined){
            finalString += " ";
        }
        index++;
    });

    return finalString;
}

function getStatisticTypeByFormattedName(name){
    name = name.toLowerCase();
    name = name.split(' ').join('_');
    
    var id;
    for (var key in statisticTypes) {
        if (statisticTypes.hasOwnProperty(key)) {
            if(statisticTypes[key] == name){
                id = key;
            }
        }
    }
    return id;
}

function sessionExists(sessionId){
    if(sessionId in sessionPlayers){
        return true;
    }
    return false;
}

function secondsToString(time){
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    var minutesString = (minutes < 10) ? "0" + minutes : "" + minutes;
    var secondsString = (seconds < 10) ? "0" + seconds : "" + seconds;

    return minutesString + ":" + secondsString;
}

/**
 * Builds the add statistic form.
 */
function buildAddStatistic() {
    var pane = buildBaseForm("Add a new game statistic", "javascript: addStatistic()");
    var form = pane.children[0];

    var types = getStatisticTypeNames(); 

    form.appendChild(buildBasicInput("statistic_sessionId", "Game Session Id"));
    form.appendChild(buildSelector("statistic_type", types));
    form.appendChild(buildBasicInput("statistic_value", "Value"));
    form.appendChild(buildBasicSubmit("Add"));
}

/**
 * Builds the edit statistic form.
 */
function buildEditStatistic() {
    var statistic = getCurrentStatistic();

    var statisticType = statisticTypes[statistic.statistic_type_id];
    statisticType = formatString(statisticType);

    var statisticValue = statistic.value;

    if(statisticType == "Time")
         statisticValue = secondsToString(statistic.value);

    var pane = buildBaseForm("Edit a game statistic", "javascript: editStatistic()");
    var form = pane.children[0];

    var types = getStatisticTypeNames(); 

    var sessionId = buildBasicInput("statistic_sessionId", "Game Session Id");
    var type = buildSelector("statistic_type", types);
    var value = buildBasicInput("statistic_value", "Value");

    sessionId.value = statistic.game_session_id;
    type.value = statisticType;
    value.value = statisticValue;

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

    if (!sessionExists(sessionId)) { 
        alert("That session does not exist.");
        return;
    }

    if (value.length == 0) {
        alert("That value is not valid");
        return;
    }

    requestOk = sendAddStatisticRequest(sessionId, type, value);

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

    if (!sessionExists(sessionId)) { 
        alert("That session does not exist.");
        return;
    }

    if (value.length == 0) {
        alert("That value is not valid");
        return;
    }

    requestOk = sendEditStatisticRequest(sessionId, type, value);

    if (requestOk) { 
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

    requestOk = sendDeleteStatisticRequest();

    if (requestOk) { 
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

function buildStatisticsTableData(){
    var data = [];
    
    currentStatistics.forEach(function(current){
        var auxData = {};
        auxData["Id"] = current.id;
        auxData["GameSessionId"] = current.game_session_id;
        auxData["Type"] = formatString(statisticTypes[current.statistic_type_id]);

        if(auxData["Type"] == "Time"){
            var time = secondsToString(current.value);

            var value = current.value + " seconds (" + time + " minutes)";

            auxData["Value"] = value;
        }else{
            auxData["Value"] = current.value;
        }

        data.push(auxData);
    });
    return data;
}

/**
 * Fetches and builds a data table with given filters.
 */
function buildStatisticsTable(filters) {

    if (filters != null) {
        getStatistics(filters);
    }

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

    var data = buildStatisticsTableData();

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

    getSessionByPlayer();
    getStatisticTypes();
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

        selectedStatisticId = row.find('td:first').html();
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