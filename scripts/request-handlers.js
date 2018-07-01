import { stat } from "fs";

"use strict";
const mysql = require("mysql");
const options = require("./connectionOptions.json");

/* Endpoint - GET */

/**
 * Gets a list of countries from the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getCountries(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, name, short_name FROM country";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.json({ "Message": "OK", "Countries": rows });
        }
    });
}
module.exports.getCountries = getCountries;

/**
 * Gets a list of user types from the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getUserType(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, user_type FROM userType";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.json({ "Message": "OK", "UserType": rows });
        }
    });
}
module.exports.getUserType = getUserType;

/**
 * Gets a list of users from the database.
 * @param {*} req 
 * @param {*} res 
 */
function getUsers(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, username, password, birth_date, country_id, profile_pic_url, user_type_id FROM user";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.json({ "Message": "OK", "Users": rows });
        }
    });
}
module.exports.getUsers = getUsers;

/**
 * Gets a list of players from the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
function getPlayers(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, username, password, birth_date, country_id, registration_date, user_type_id FROM player";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.json({ "Message": "OK", "Players": rows });
        }
    });
}
module.exports.getPlayers = getPlayers;

/**
 * Gets a list of levels from the database.
 * @param {*} req 
 * @param {*} res 
 */
function getLevels(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, name FROM level";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.json({ "Message": "OK", "Levels": rows });
        }
    });
}
module.exports.getLevels = getLevels;

/**
 * Gets a list of characters from the database.
 * @param {*} req 
 * @param {*} res 
 */
function getCharacters(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, name, endurance, strength, speed FROM character";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.json({ "Message": "OK", "Characters": rows });
        }
    });
}
module.exports.getCharacters = getCharacters;

/**
 * Gets a list of sessions from the database.
 * @param {*} req 
 * @param {*} res 
 */
function getSessions(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, start_date, player_id, level_id, character_id FROM gameSession";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.json({ "Message": "OK", "Sessions": rows });
        }
    });
}
module.exports.getSessions = getSessions;

/**
 * Gets a list of statistic types from the database.
 * @param {*} req 
 * @param {*} res 
 */
function getStatisticType(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, name, description FROM statisticType";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.json({ "Message": "OK", "StatisticTypes": rows });
        }
    });
}
module.exports.getStatisticType = getStatisticType;

/**
 * Gets a list of statistics from the database.
 * @param {*} req 
 * @param {*} res 
 */
function getStatistics(req, res) {
    var connection = mysql.createConnection(options);
    var query = "SELECT id, value, registration_date, statistic_type_id, game_session_id FROM statistic";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.json({ "Message": "OK", "Statistics": rows });
        }
    });
}
module.exports.getStatistics = getStatistics;


/* Endpoint - POST / PUT */

/**
 * Adds or updates a country in the database, based on the request method ("POST" or "PUT").
 * @param {*} req 
 * @param {*} res 
 */
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
            res.json({"Message": "Error"});
        else
            res.send(rows);
    })
}
module.exports.addUpdateCountry = addUpdateCountry;

/**
 * Adds or updates a user type in the database, based on the request method ("POST" or "PUT").
 * @param {*} req 
 * @param {*} res 
 */
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
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateUserType = addUpdateUserType;

/**
 * Adds or updates a user in the database, based on the request method ("POST" or "PUT").
 * @param {*} req 
 * @param {*} res 
 */
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
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateUser = addUpdateUser;

/**
 * Adds or updates a player in the database, based on the request method ("POST" or "PUT").
 * @param {*} req 
 * @param {*} res 
 */
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
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdatePlayer = addUpdatePlayer;

/**
 * Adds or updates a level in the database, based on the request method ("POST" or "PUT").
 * @param {*} req 
 * @param {*} res 
 */
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
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateLevel = addUpdateLevel;

/**
 * Adds or updates a character in the database, based on the request method ("POST" or "PUT").
 * @param {*} req 
 * @param {*} res 
 */
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
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateCharacter = addUpdateCharacter;

/**
 * Adds or updates a session in the database, based on the request method ("POST" or "PUT").
 * @param {*} req 
 * @param {*} res 
 */
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
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateSession = addUpdateSession;

/**
 * Adds or updates a statistic type in the database, based on the request method ("POST" or "PUT").
 * @param {*} req 
 * @param {*} res 
 */
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
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateStatisticType = addUpdateStatisticType;

/**
 * Adds or updates a statistic in the database, based on the request method ("POST" or "PUT").
 * @param {*} req 
 * @param {*} res 
 */
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
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.addUpdateStatistic = addUpdateStatistic;


/* Endpoint - DELETE */

/**
 * Removes a certain country from the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deleteCountry(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM country WHERE id = ?", [id]);

    connection.query(sql, function(err, rows){
        if(err)
            res.json({"Message": "Error"});
        else
            res.send(rows);
    })
}
module.exports.deleteCountry = deleteCountry;

/**
 * Removes a certain user type from the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deleteUserType(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM userType WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteUserType = deleteUserType;

/**
 * Removes a certain user from the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deleteUser(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM user WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteUser = deleteUser;

/**
 * Removes a certain player from the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deletePlayer(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM player WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deletePlayer = deletePlayer;

/**
 * Removes a certain level from the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deleteLevel(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM level WHERE id = ?",  [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteLevel = deleteLevel;

/**
 * Removes a certain character from the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deleteCharacter(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM character WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteCharacter = deleteCharacter;

/**
 * Removes a certain session from the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deleteSession(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM gameSession WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteSession = deleteSession;

/**
 * Removes a certain statistic type from the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deleteStatisticType(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;

    var sql;

    sql = mysql.format("DELETE FROM statisticType WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteStatisticType = deleteStatisticType;

/**
 * Removes a certain statistic from the database.
 * 
 * @param {*} req 
 * @param {*} res 
 */
function deleteStatistic(req, res) {
    var connection = mysql.createConnection(options);

    var id = req.body.id;
    var sql;

    sql = mysql.format("DELETE FROM statistic WHERE id = ?", [id]);

    connection.query(sql, function (err, rows) {
        if (err) {
            res.json({ "Message": "Error" });
        } else {
            res.send(rows);
        }
    });
}
module.exports.deleteStatistic = deleteStatistic;