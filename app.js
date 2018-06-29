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
app.get("/session", requestHandlers.getSessions);
app.get("/statistic", requestHandlers.getStatistics);

// POST
app.post("/player", requestHandlers.addPlayer);
app.post("/session", requestHandlers.addSession);
app.post("/statistic", requestHandlers.addStatistic);

// DELETE
app.delete("/player", requestHandlers.deletePlayer);
app.delete("/session", requestHandlers.deleteSession);
app.delete("/statistic", requestHandlers.deleteStatistic);

app.listen(8081, function () {
    console.log("Server running at http://localhost:8081");
});