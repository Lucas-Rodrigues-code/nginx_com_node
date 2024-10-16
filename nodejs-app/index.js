const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "password",
  database: "people_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;
  connection.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log('Table "people" is ready');
  });
});

app.get("/", (req, res) => {
  const name = `Name ${Math.floor(Math.random() * 100)}`;
  connection.query(`INSERT INTO people(name) VALUES('${name}')`, (err) => {
    if (err) throw err;
    connection.query("SELECT * FROM people", (err, results) => {
      if (err) throw err;
      res.send(
        `<h1>Full Cycle Rocks!</h1><ul>${results
          .map((row) => `<li>${row.name}</li>`)
          .join("")}</ul>`
      );
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
