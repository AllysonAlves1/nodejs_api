const mysql = require("mysql");

async function execSQLQuery(sqlQry, res) {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "aly124578963",
    database: "nodedb",
  });

  connection.query(sqlQry, function (error, results, fields) {
    if (error) {
      res.json(error);
    } else {
      res.json(results);
    }
    connection.end();
    console.log("Executou!");
  });
}

exports.execSQLQuery = execSQLQuery;