"use strict";
const mysql = require("mysql");
const options = require("./connectionOptions.json");

function getPlayers(request, response) {

    var connection = mysql.createConnection(options);
    var query = "SELECT * FROM players";

    connection.query(query, function (error, rows) {
        if (error) {
            response.sendStatus(500);
        } else {
            response.json({ "status": "OK", "data": rows });
        }
    });

    connection.end();
}
module.exports.getPlayers = getPlayers;

function getSessions(request, response) {

    var connection = mysql.createConnection(options);
    var query = "SELECT * FROM sessions";

    connection.query(query, function (error, rows) {
        if (error) {
            response.sendStatus(500);
        } else {
            response.json({ "status": "OK", "data": rows });
        }
    });

    connection.end();
}
module.exports.getSessions = getSessions;

function getStatistics(request, response) {

    var connection = mysql.createConnection(options);
    var query = "SELECT * FROM statistics";

    connection.query(query, function (error, rows) {
        if (error) {
            response.sendStatus(500);
        } else {
            response.json({ "status": "OK", "data": rows });
        }
    });

    connection.end();
}
module.exports.getStatistics = getStatistics;

function addPlayer(request, response) {

    var connection = mysql.createConnection(options);
    var query = "INSERT INTO players(x, y, z) VALUES(?,?,?)";
    var sql;

    var x = request.body.x;

    sql.mysql.format(query, [x, y, z]);

    connection.query(sql, function (error, rows) {
        if (error) {
            response.json({ "status": "Error executing query" });
        } else {
            response.send(rows);
        }
    });
}
module.exports.addPlayer = addPlayer;

function addSession(request, response) {

    var connection = mysql.createConnection(options);
    var query = "INSERT INTO sessions(x, y, z) VALUES(?,?,?)";
    var sql;

    var x = request.body.x;

    sql.mysql.format(query, [x, y, z]);

    connection.query(sql, function (error, rows) {
        if (error) {
            response.json({ "status": "Error executing query" });
        } else {
            response.send(rows);
        }
    });
}
module.exports.addSession = addSession;

function addStatistic(request, response) {

    var connection = mysql.createConnection(options);
    var query = "INSERT INTO statistics(x, y, z) VALUES(?,?,?)";
    var sql;

    var x = request.body.x;

    sql.mysql.format(query, [x, y, z]);

    connection.query(sql, function (error, rows) {
        if (error) {
            response.json({ "status": "Error executing query" });
        } else {
            response.send(rows);
        }
    });
}
module.exports.addStatistic = addStatistic;

function deletePlayer(request, response) {

    var connection = mysql.createConnection(options);
    var query = "DELETE FROM players WHERE id = ?";
    var sql;

    var id = request.body.id;

    sql.mysql.format(query, [id]);

    connection.query(sql, function (error, rows) {
        if (error) {
            response.json({ "status": "Error executing query" });
        } else {
            response.send(rows);
        }
    });
}
module.exports.deletePlayer = deletePlayer;

function deleteSession(request, response) {

    var connection = mysql.createConnection(options);
    var query = "DELETE FROM sessions WHERE id = ?";
    var sql;

    var id = request.body.id;

    sql.mysql.format(query, [id]);

    connection.query(sql, function (error, rows) {
        if (error) {
            response.json({ "status": "Error executing query" });
        } else {
            response.send(rows);
        }
    });
}
module.exports.deleteSession = deleteSession;

function deleteStatistic(request, response) {

    var connection = mysql.createConnection(options);
    var query = "DELETE FROM statistics WHERE id = ?";
    var sql;

    var id = request.body.id;

    sql.mysql.format(query, [id]);

    connection.query(sql, function (error, rows) {
        if (error) {
            response.json({ "status": "Error executing query" });
        } else {
            response.send(rows);
        }
    });
}
module.exports.deleteStatistic = deleteStatistic;