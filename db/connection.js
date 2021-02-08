// DEPENDANCIES

const mysql = require("mysql");
const util = require("util");

// MySQL CONNECTION

const connection = mysql.createConnection({
  host: "localhost",

  // port
  port: 3306,

  // username
  user: "root",

  //  password
  password: "Qwertykristina1",
  database: "employees_db",
});

// CONNECTION

connection.connect(function (err) {
  if (err) throw err;

  // logs thread id upon startup
  console.log("connected as id " + connection.threadId);
});

connection.query = util.promisify(connection.query);

// EXPORT

module.exports = connection;