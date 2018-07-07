"use strict";
const express = require("express");
const requestHandlers = require("./scripts/request-handlers.js");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www"));

// GET
app.get("/player", requestHandlers.getPlayers);
app.get("/player/username/:username", requestHandlers.getPlayerName);
app.get("/player/today", requestHandlers.getPlayersToday);
app.get("/player/week", requestHandlers.getPlayersWeek);
app.get("/player/month", requestHandlers.getPlayersMonth);
app.get("/session", requestHandlers.getSessions);
app.get("/session/today", requestHandlers.getSessionsToday);
app.get("/session/week", requestHandlers.getSessionsWeek);
app.get("/session/month", requestHandlers.getSessionsMonth);
app.get("/statistic", requestHandlers.getStatistics);
app.get("/statistic/today", requestHandlers.getStatisticsToday);
app.get("/statistic/week", requestHandlers.getStatisticsWeek);
app.get("/statistic/month", requestHandlers.getStatisticsMonth);
app.get("/countries", requestHandlers.getCountries);
app.get("/level", requestHandlers.getLevels);
app.get("/character", requestHandlers.getCharacters);
app.get("/statisticType", requestHandlers.getStatisticType);
app.get("/configuration", requestHandlers.getConfigurations);
app.get("/configurationType", requestHandlers.getConfigurationTypes);

// POST
app.post("/player", requestHandlers.addUpdatePlayer);
app.post("/session", requestHandlers.addUpdateSession);
app.post("/statistic", requestHandlers.addUpdateStatistic);
app.post("/configuration", requestHandlers.addUpdateConfiguration);

// PUT
app.put("/player", requestHandlers.addUpdatePlayer);
app.put("/session", requestHandlers.addUpdateSession);
app.put("/statistic", requestHandlers.addUpdateStatistic);
app.put("/configuration", requestHandlers.addUpdateConfiguration);

// DELETE
app.delete("/player", requestHandlers.deletePlayer);
app.delete("/session", requestHandlers.deleteSession);
app.delete("/statistic", requestHandlers.deleteStatistic);
app.delete("/configuration", requestHandlers.deleteConfiguration);

app.listen(8081, function () {
    console.log("Server running at http://localhost:8081");
});