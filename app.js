// Requiring module
const express = require("express");
const mysql = require("mysql2");
const connect = require("./conexao.js");

// Creating express object
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handing GET request
app.get("/", (req, res) => {
  res.send("A aplicação está funcionando!");
  res.end();
});

app.get("/clientes", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery("SELECT * FROM clientes", res);
});

app.get("/clientes/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery("SELECT * FROM clientes WHERE id=" + req.params.id, res);
});

// Handing PUT request
app.put("/clientes/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery("UPDATE clientes set nome='" + req.body.nome + "'WHERE id=" + req.params.id, res);
});

// Handing POST request
app.post("/clientes/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery(
    "INSERT INTO clientes(nome) VALUES ('" + req.body.nome + "')",res);
});

// Handing DELETE request
app.delete("/clientes/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery("DELETE FROM clientes WHERE id=" + req.params.id, res);
});

// Port Number
const PORT = process.env.PORT || 3000;

// Server Setup
app.listen(PORT, console.log(
  `Server started on port ${PORT}`));