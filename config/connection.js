const mysql = require('mysql');
const util = require('util');

let config;


if (process.env.JAWSDB_URL) {
  config = process.env.JAWSDB_URL;
} else {
  config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.SQL_PASS || 'password',
    database: 'schedule_db',
  };
}

function makeDb(config) {
  const connection = mysql.createConnection(config);
  return {
    query(sql, args) {
      return util.promisify(connection.query)
        .call(connection, sql, args);
    },
    close() {
      return util.promisify(connection.end).call(connection);
    },
  };
}

const db = makeDb(config);

module.exports = db;
