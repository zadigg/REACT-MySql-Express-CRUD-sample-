const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abelkibebenegash123",
  database: "employeesystem",
});

db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});

app.post("/create", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

//
app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;

  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM employees WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Success");
    }
  });
});

app.listen(3001, () => {
  console.log("The server is running on port 3001");
});
