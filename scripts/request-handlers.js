import { stat } from "fs";

"use strict";
const mysql = require("mysql");
const options = require("./connectionOptions.json");

/* Endpoint - GET */

function getCountries(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, name, short_name FROM country";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.json({ "Message": "OK", "Countries": rows });
        }
    });
}
module.exports.getCountries = getCountries;


function getUserType(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, user_type FROM userType";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.json({ "Message": "OK", "UserType": rows });
        }
    });
}
module.exports.getUserType = getUserType;


function getUsers(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, username, password, birth_date, country_id, profile_pic_url, user_type_id FROM user";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.json({ "Message": "OK", "Users": rows });
        }
    });
}
module.exports.getUsers = getUsers;


function getPlayers(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, username, password, birth_date, country_id, registration_date, user_type_id FROM player";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.json({ "Message": "OK", "Players": rows });
        }
    });
}
module.exports.getPlayers = getPlayers;


function getLevels(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, name FROM level";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.json({ "Message": "OK", "Levels": rows });
        }
    });
}
module.exports.getLevels = getLevels;


function getCharacters(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, name, endurance, strength, speed FROM character";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.json({ "Message": "OK", "Characters": rows });
        }
    });
}
module.exports.getCharacters = getCharacters;


function getSessions(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, start_date, player_id, level_id, character_id FROM gameSession";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.json({ "Message": "OK", "Sessions": rows });
        }
    });
}
module.exports.getSessions = getSessions;


function getStatisticType(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, name, description FROM statisticType";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.json({ "Message": "OK", "StatisticTypes": rows });
        }
    });
}
module.exports.getStatisticType = getStatisticType;


function getStatistics(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, value, registration_date, statistic_type_id, game_session_id FROM statistic";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.json({ "Message": "OK", "Statistics": rows });
        }
    });
}
module.exports.getStatistics = getStatistics;


/* Endpoint - POST / PUT */

function addUpdateCountry(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;
    var name = req.body.name;
    var shortName = req.body.shortName;

    var sql;

    if (req.method === "POST")
        sql = mysql.format("INSERT INTO country (name, short_name) VALUES (?, ?);", [name, shortName]);
    else
        sql = mysql.format("UPDATE country SET name = ?, short_name = ? WHERE id = ?", [name, shortName, id]);

    connection.query(sql, function(err, rows){
        if(err)
            res.json({"Message": "Erro"});
        else
            res.send(rows);
    })
}
module.exports.addUpdateCountry = addUpdateCountry;


function addUpdateUserType(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;
    var userType = req.body.userType;

    var sql;

    if (req.method === "POST")
        sql = mysql.format("INSERT INTO userType (user_type) VALUES (?);", [userType]);
    else
        sql = mysql.format("UPDATE userType SET user_type = ? WHERE id = ?", [userType, id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateUserType = addUpdateUserType;


function addUpdateUser(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var birthDate = req.body.birthDate;
    var countryId = req.body.countryId;
    var profilePicUrl = req.body.profilePicUrl;
    var userTypeId = req.body.userTypeId;

    var sql;

    if (req.method === "POST")
        sql = mysql.format("INSERT INTO user (username, password, birth_date, country_id, profile_pic_url, user_type_id) VALUES (?,?,?,?,?,?);",
                            [username, password, birthDate, countryId, profilePicUrl, userTypeId]);
    else
        sql = mysql.format("UPDATE user SET username = ?, password = ?, birth_date = ?, country_id = ?, profile_pic_url = ?, user_type_id = ? WHERE id = ?", 
                            [username, password, birthDate, countryId, profilePicUrl, userTypeId, id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateUser = addUpdateUser;


function addUpdatePlayer(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;
    var username = req.body.username;
    var password = req.body.password;
    var birthDate = req.body.birthDate;
    var countryId = req.body.countryId;
    var registrationDate = req.body.registrationDate;
    var userTypeId = req.body.userTypeId;

    var sql;

    if (req.method === "POST")
        sql = mysql.format("INSERT INTO player (username, password, birth_date, country_id, registration_date, user_type_id) VALUES (?,?,?,?,?,?);",
                        [username, password, birthDate, countryId, registrationDate, userTypeId]);
    else
        sql = mysql.format("UPDATE player SET username = ?, password = ?, birth_date = ?, country_id = ?, registration_date = ?, user_type_id = ? WHERE id = ?", 
                            [username, password, birthDate, countryId, registrationDate, userTypeId, id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdatePlayer = addUpdatePlayer;


function addUpdateLevel(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;
    var name = req.body.name;

    var sql;

    if (req.method === "POST")
        sql = mysql.format("INSERT INTO level (name) VALUES (?);", [name]);
    else
        sql = mysql.format("UPDATE level SET name = ? WHERE id = ?",  [name, id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateLevel = addUpdateLevel;


function addUpdateCharacter(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;
    var name = req.body.name;
    var endurance = req.body.endurance;
    var strength = req.body.strength;
    var speed = req.body.speed;

    var sql;

    if (req.method === "POST")
        sql = mysql.format("INSERT INTO character (name, endurance, strength, speed) VALUES (?,?,?,?);", [name, endurance, strength, speed]);
    else
        sql = mysql.format("UPDATE character SET name = ?, endurance = ?, strength = ?, speed = ? WHERE id = ?",  [name, endurance, strength, speed, id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateCharacter = addUpdateCharacter;


function addUpdateSession(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;
    var startDate = req.body.startDate;
    var playerId = req.body.playerId;
    var levelId = req.body.levelId;
    var characterId = req.body.characterId;

    var sql;

    if (req.method === "POST")
        sql = mysql.format("INSERT INTO gameSession (start_date, player_id, level_id, character_id) VALUES (?,?,?,?);", [startDate, playerId, levelId, characterId]);
    else
        sql = mysql.format("UPDATE gameSession SET start_date = ?, player_id = ?, level_id = ?, character_id = ? WHERE id = ?",  [startDate, playerId, levelId, characterId, id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateSession = addUpdateSession;


function addUpdateStatisticType(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;
    var name = req.body.name;
    var description = req.body.description;

    var sql;

    if (req.method === "POST")
        sql = mysql.format("INSERT INTO statisticType (name, description) VALUES (?,?);", [name, description]);
    else
        sql = mysql.format("UPDATE statisticType SET name = ?, description = ? WHERE id = ?",  [name, description, id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateStatisticType = addUpdateStatisticType;


function addUpdateStatistic(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;
    var value = req.body.value;
    var registrationDate = req.body.registrationDate;
    var statisticTypeId = req.body.statisticTypeId;
    var gameSessionId = req.body.gameSessionId;

    var sql;

    if (req.method === "POST")
        sql = mysql.format("INSERT INTO statistic (value, registration_date, statistic_type_id, game_session_id) VALUES (?,?,?,?);", 
                        [value, registrationDate, statisticTypeId, gameSessionId]);
    else
        sql = mysql.format("UPDATE statistic SET value = ?, registration_date = ?, statistic_type_id = ?, game_session_id = ? WHERE id = ?", 
                         [value, registrationDate, statisticTypeId, gameSessionId, id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateStatistic = addUpdateStatistic;


/* Endpoint - DELETE */

function deleteCountry(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM country WHERE id = ?", [id]);

    connection.query(sql, function(err, rows){
        if(err)
            res.json({"Message": "Erro"});
        else
            res.send(rows);
    })
}
module.exports.deleteCountry = deleteCountry;

function deleteUserType(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM userType WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteUserType = deleteUserType;


function deleteUser(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM user WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteUser = deleteUser;


function deletePlayer(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM player WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deletePlayer = deletePlayer;


function deleteLevel(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM level WHERE id = ?",  [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteLevel = deleteLevel;


function deleteCharacter(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM character WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteCharacter = deleteCharacter;


function deleteSession(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM gameSession WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteSession = deleteSession;


function deleteStatisticType(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM statisticType WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteStatisticType = deleteStatisticType;


function deleteStatistic(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;
    var sql;

    sql = mysql.format("DELETE FROM statistic WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Erro" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteStatistic = deleteStatistic;