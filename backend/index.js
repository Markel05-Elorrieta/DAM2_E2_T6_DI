const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL datu-baserako konexioa sortu
const db = mysql.createConnection({
  host: "52.47.82.98", // MySQL zerbitzariaren helbidea
  user: "adminElorbase", // MySQL erabiltzailea
  password: "jemsoftware1234", // MySQL pasahitza
  database: "elorbase", // Datu-basearen izena
  //    port: '3306' , // Portua
});

db.connect((err) => {
  if (err) {
    console.error("Errorea datu-basera konektatzean:", err);
    return;
  }
  console.log("Datu-basera konektatuta");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.send({ success: true, user: results[0] });
    } else {
      res.send({ success: false, message: "Invalid credentials" });
    }
  });
});

app.get("/user-type/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = `
        select * from tipos t
        where id = (select tipo_id 
			from users
			where id = ?);
    `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      res.status(500).send("Errorea datu-basera konektatzean");
      return;
    }
    if (results.length > 0) {
      res.send({ userType: results[0].name_eus });
    } else {
      res.send({ message: "User not found" });
    }
  });
});

app.get("/timetable-ikasle/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = `
        SELECT 
    h.dia AS Dia,
    h.hora AS Hora,
    m.nombre AS Modulo
FROM 
    horarios h
JOIN 
    modulos m ON m.id = h.modulo_id
WHERE 
    m.nombre NOT IN ('Tutoria', 'Guardia') 
    AND h.modulo_id IN (
        SELECT 
            m.id 
        FROM 
            modulos m
        WHERE 
            m.ciclo_id = (
                SELECT 
                    ciclo_id 
                FROM 
                    matriculaciones mat
                WHERE 
                    alum_id = 3
            )
            AND m.curso = (
                SELECT 
                    curso 
                FROM 
                    matriculaciones mat
                WHERE 
                    alum_id = ?
            )
    )
GROUP BY 
    h.dia, h.hora, m.nombre
        ORDER BY 
            CASE 
                WHEN h.dia = 'L/A' THEN 1
                WHEN h.dia = 'M/A' THEN 2
                WHEN h.dia = 'X' THEN 3
                WHEN h.dia = 'J/O' THEN 4
                WHEN h.dia = 'V/O' THEN 5
                ELSE 6
            END,
            h.hora;
    `;
  db.query(query, [userId, userId], (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      res.status(500).send("Errorea datu-basera konektatzean");
      return;
    }
    res.send(results);
  });
});

app.get("/timetable-irakasle/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = `select h.dia,
       h.hora,
       m.nombre as modulo
from horarios as h
join modulos m on m.id = h.modulo_id
where profe_id = (select id from users as u
                  where u.id = ?);`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      res.status(500).send("Errorea datu-basera konektatzean");
      return;
    }
    res.send(results);
  });
});

app.get("/meetings/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = ` `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      res.status(500).send("Errorea datu-basera konektatzean");
      return;
    }
    res.send(results);
  });
});

// Zerbitzaria hasieratu
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Zerbitzaria http://localhost:${PORT}-n martxan dago`);
});
