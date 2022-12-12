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

// Users
app.get("/users", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery("SELECT * FROM users", res);
});

app.get("/users/login/:username/:password", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery(`SELECT * FROM users WHERE username='${req.params.username}' AND password='${req.params.password}'`, res);
});

app.post("/users/register", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery(
    "INSERT INTO users(username, email, password) VALUES ('" + req.body.username + "', '" + req.body.email + "', '" + req.body.password + "')",res);
});

// Produtos
app.get("/produtos", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery("SELECT * FROM produtos", res);
});

app.post("/produtos/register", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery(
    "INSERT INTO produtos(nome, capacidade, preco, img) VALUES ('" + req.body.nome + "', '" + req.body.capacidade + "', '" + req.body.preco + "' , '" + req.body.img + "')",res);
  });

app.put("/produtos/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery(`UPDATE produtos set nome='${req.body.nome}', capacidade='${req.body.capacidade}', preco='${req.body.preco}' WHERE id='${req.params.id}'`, res);
});

app.delete("/produtos/:id", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  return connect.execSQLQuery("DELETE FROM produtos WHERE id=" + req.params.id, res);
});

// Server Setup
const protocol = process.env.protocol || "http";
const ip = require('ip').address();
const port = process.env.PORT || 5000;
app.listen(port, console.log(
  `Server started on port ${port} or ${protocol}://${ip}:${port}`));