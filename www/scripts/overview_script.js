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

    //TODO REMOVE THESE PLACEHOLDER ARRAYS WITH ACTUAL REAL DATA
    var todayData = {
        "Player Growth": "+141 (+3.47%)",
        "Session Growth": "+831 (+2.89%)"
    }

    var weekData = {
        "Player Growth": "+923 (+12.19%)",
        "Session Growth": "+4,317 (+9.16%)"
    }

    var monthData = {
        "Player Growth": "+2.811 (+23.89%)",
        "Session Growth": "+18,327 (+19.31%)"
    }

    var allTimeData = {
        "Player Growth": "+11.516",
        "Session Growth": "+74.135"
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