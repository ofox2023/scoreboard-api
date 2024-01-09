const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "scoreboard.c4qv0bblsf7w.eu-north-1.rds.amazonaws.com",
    database: "scoreboard",
    password: "Scoreboard#2023",
    user: "scoreboard",
    // host: "localhost",
    // database: "scoreboard",
    // password: "",
    // user: "root",
});

module.exports = db;
