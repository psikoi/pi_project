itemsPickedTypeId = -1;

function getItemsPickedTypeId(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/statisticType", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).statisticTypes.forEach(function(current){
                if(current.name === "items_picked"){
                    itemsPickedTypeId = current.id;
                }
            });
        }
    }
    xhr.send();
}

function getNumberTodayPlayers(){
    var number;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/player/today", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            number = JSON.parse(this.responseText).players.length;
        }
    }
    xhr.send();

    return number;
}

function getNumberWeekPlayers(){
    var number;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/player/week", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            number = JSON.parse(this.responseText).players.length;
        }
    }
    xhr.send();

    return number;
}

function getNumberMonthPlayers(){
    var number;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/player/month", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            number = JSON.parse(this.responseText).players.length;
        }
    }
    xhr.send();

    return number;
}

function getNumberAlltimePlayers(){
    var number;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/player", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            number = JSON.parse(this.responseText).players.length;
        }
    }
    xhr.send();

    return number;
}

function getNumberTodaySessions(){
    var number;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/session/today", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            number = JSON.parse(this.responseText).sessions.length;
        }
    }
    xhr.send();

    return number;
}

function getNumberWeekSessions(){
    var number;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/session/week", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            number = JSON.parse(this.responseText).sessions.length;
        }
    }
    xhr.send();

    return number;
}

function getNumberMonthSessions(){
    var number;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/session/month", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            number = JSON.parse(this.responseText).sessions.length;
        }
    }
    xhr.send();

    return number;
}

function getNumberAlltimeSessions(){
    var number;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/session", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            number = JSON.parse(this.responseText).sessions.length;
        }
    }
    xhr.send();

    return number;
}

function getNumberTodayItemsPicked(){
    if (itemsPickedTypeId == -1){
        getItemsPickedTypeId();
    }
    var number = 0;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/statistic/today", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).statistics.forEach(function(current){
                if(current.statistic_type_id == itemsPickedTypeId){
                    number += current.value;
                }
            });
        }
    }
    xhr.send();
    return number;
}

function getNumberWeekItemsPicked(){
    if (itemsPickedTypeId == -1){
        getItemsPickedTypeId();
    }

    var number = 0;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/statistic/week", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).statistics.forEach(function(current){
                if(current.statistic_type_id == itemsPickedTypeId){
                    number += current.value;
                }
            });
        }
    }
    xhr.send();

    return number;
}

function getNumberMonthItemsPicked(){
    if (itemsPickedTypeId == -1){
        getItemsPickedTypeId();
    }
    
    var number = 0;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/statistic/month", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).statistics.forEach(function(current){
                if(current.statistic_type_id == itemsPickedTypeId){
                    number += current.value;
                }
            });
        }
    }
    xhr.send();

    return number;
}

function getNumberAlltimeItemsPicked(){
    if (itemsPickedTypeId == -1){
        getItemsPickedTypeId();
    }

    var number = 0;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/statistic", false);
    xhr.onreadystatechange = function(){
        if(this.status === 200 && this.readyState === 4){
            JSON.parse(this.responseText).statistics.forEach(function(current){
                if(current.statistic_type_id == itemsPickedTypeId){
                    number += current.value;
                }
            });
        }
    }
    xhr.send();

    return number;
}

function calculatePercentage(part, total){
    part = part * 100;

    return (part / total).toFixed(2);
}

/**
 * Builds the entire overview page with its title, subtitle and multiple
 * statistic panels.
 */
function buildOverview() {

    var pageContent = document.getElementById("page_content");

    var section = document.createElement("section");
    section.id = "overview";

    var sectionContainer = document.createElement("div");
    sectionContainer.className = "section_container";

    var sectionTitle = document.createElement("div");
    sectionTitle.className = "section_title";

    var header = document.createElement("h1");
    header.textContent = "Overview";

    var subheader = document.createElement("h2");
    subheader.textContent = "A general view of the game’s performance and statistics.";

    sectionTitle.appendChild(header);
    sectionTitle.appendChild(subheader);

    sectionContainer.appendChild(sectionTitle);

    var allPlayers = getNumberAlltimePlayers();
    var allSessions = getNumberAlltimeSessions();
    var allStatistics = getNumberAlltimeItemsPicked();

    var players = getNumberTodayPlayers();
    var sessions = getNumberTodaySessions();
    var statistics = getNumberTodayItemsPicked();
    
    var playerGrowth = calculatePercentage(players, allPlayers);
    var sessionGroth = calculatePercentage(sessions, allSessions);
    var statisticsGrowth = calculatePercentage(statistics, allStatistics);

    var todayData = {
        "Player Growth": "+" + players + " (+" + playerGrowth + "%)",
        "Session Growth": "+" + sessions + " (+" + sessionGroth + "%)",
        "Items Picked Growth": "+" + statistics + " (+" + statisticsGrowth + "%)"
    }

    players = getNumberWeekPlayers();
    sessions = getNumberWeekSessions();
    statistics = getNumberWeekItemsPicked();

    playerGrowth = calculatePercentage(players, allPlayers);
    sessionGroth = calculatePercentage(sessions, allSessions);
    statisticsGrowth = calculatePercentage(statistics, allStatistics);

    var weekData = {
        "Player Growth": "+" + players + " (+" + playerGrowth + "%)",
        "Session Growth": "+" + sessions + " (+" + sessionGroth + "%)",
        "Items Picked Growth": "+" + statistics + " (+" + statisticsGrowth + "%)"
    }

    players = getNumberMonthPlayers();
    sessions = getNumberMonthSessions();
    statistics = getNumberMonthItemsPicked();

    playerGrowth = calculatePercentage(players, allPlayers);
    sessionGroth = calculatePercentage(sessions, allSessions);
    statisticsGrowth = calculatePercentage(statistics, allStatistics);

    var monthData = {
        "Player Growth": "+" + players + " (+" + playerGrowth + "%)",
        "Session Growth": "+" + sessions + " (+" + sessionGroth + "%)",
        "Items Picked Growth": "+" + statistics + " (+" + statisticsGrowth + "%)"
    }

    var allTimeData = {
        "Player Growth": "+" + allPlayers,
        "Session Growth": "+" + allSessions,
        "Items Picked Growth": "+" + allStatistics
    }

    sectionContainer.appendChild(buildOverviewStat("Today", "(Last 24 hours)", todayData, true));
    sectionContainer.appendChild(buildOverviewStat("Week", "(Last 7 days)", weekData, false));
    sectionContainer.appendChild(buildOverviewStat("Month", "(Last 30 days)", monthData, true));
    sectionContainer.appendChild(buildOverviewStat("All time", "", allTimeData, false));

    section.appendChild(sectionContainer);
    pageContent.appendChild(section);
}

/**
 * Builds a single overview statistic panel.
 * Ex: Today, Week, Month, All time.
 * 
 * This includes a title, a subtitle and multiple rows of information
 * that follow a key:value structure.
 * 
 * The data array should be in the form of
 * {
 *      "key": "value",
 *      "key": "value"
 * }
 */
function buildOverviewStat(titleText, subtitleText, data, left) {

    var container = document.createElement("div");
    container.className = "overview_info_container " + (left ? "left_info_container" : "right_info_container");

    var titleContainer = document.createElement("div");
    titleContainer.className = "overview_info_title";

    var title = document.createElement("span");
    title.className = "overview_info_title_text";
    title.textContent = titleText;

    var subtitle = document.createElement("span");
    subtitle.className = "overview_info_subtitle";
    subtitle.textContent = subtitleText;

    var entryContainer = document.createElement("div");
    entryContainer.className = "overview_info_entry_container";

    if (data != null) {
        Object.keys(data).forEach(function (key) {

            var entry = document.createElement("div");
            entry.className = "overview_info_entry";

            var entryTitle = document.createElement("span");
            entryTitle.textContent = key + ":";

            var valueStr = data[key];

            var value = document.createElement("span");
            value.textContent = " " + valueStr;
            value.className = "overview_info_entry_" + (valueStr.startsWith("+") ? "positive" : "negative");

            entry.appendChild(entryTitle);
            entry.appendChild(value);
            entryContainer.appendChild(entry);
        });
    }

    titleContainer.appendChild(title);
    titleContainer.appendChild(subtitle);

    container.appendChild(titleContainer);
    container.appendChild(entryContainer);
    return container;
}