const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const e = require("express");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL datu-baserako konexioa sortu
const db = mysql.createConnection({
  host: "35.180.192.215", // MySQL zerbitzariaren helbidea
  user: "adminElorbase", // MySQL erabiltzailea
  password: "jemsoftware1234", // MySQL pasahitza
  database: "elorbase", // Datu-basearen izena
  port: '3306' , // Portua
});

db.connect((err) => {
  if (err) {
    console.error("Errorea datu-basera konektatzean:", err);
    return;
  }
  console.log("Datu-basera konektatuta");
});

app.post("/login", (req, res) => {
  const { email } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.send({ success: true, user: results[0] });
    } else {
      res.send({ success: false });
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

app.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = "SELECT * FROM users u WHERE u.id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.send(results[0]);
    } else {
      res.send({ message: "User not found" });
    }
  });
});

app.get("/user-types", (req, res) => {
  const query = "SELECT * FROM tipos";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/user-update/:userId", (req, res) => {
  const userId = req.params.userId;
  const {
    nombre,
    apellidos,
    email,
    telefono1,
    username,
    dni,
    role,
    direccion,
  } = req.body;
  const query =
    "UPDATE users SET nombre = ?, apellidos = ?, email = ?, telefono1 = ?, username = ?, dni = ?, tipo_id = ?, direccion = ? WHERE id = ?";
  db.query(
    query,
    [
      nombre,
      apellidos,
      email,
      telefono1,
      username,
      dni,
      role,
      direccion,
      userId,
    ],
    (err, results) => {
      if (err) throw err;
      res.send({ success: true });
    }
  );
});

app.post("/user-add/", (req, res) => {
  const {
    nombre,
    apellidos,
    email,
    telefono1,
    username,
    password,
    dni,
    role,
    direccion,
  } = req.body;
  const query =
    "INSERT INTO users (nombre, apellidos, email, telefono1, username, password, dni, tipo_id, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      nombre,
      apellidos,
      email,
      telefono1,
      username,
      password,
      dni,
      role,
      direccion,
    ],
    (err, results) => {
      if (err) throw err;
      res.send({ success: true });
    }
  );
});

app.delete("/user-delete/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) throw err;
    res.send({ success: true });
  });
});

app.get("/timetable-ikasle/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = `
        SELECT 
    h.dia AS dia,
    h.hora AS hora,
    m.nombre AS modulo
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

app.get("/meetings-student/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = `select 
    r.id_reunion as id,
    r.estado as estado, 
    r.titulo as titulo, 
    r.asunto as asunto, 
    r.aula as aula, 
    r.fecha as fecha, 
    r.id_centro as id_centro,
    u.nombre as nombre_profesor,
    u.apellidos as apellidos_profesor
from reuniones r
join users u on r.profesor_id = u.id
where r.alumno_id = ? AND
DATE(r.fecha) >= CURRENT_DATE;`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      res.status(500).send("Errorea datu-basera konektatzean");
      return;
    }
    res.send(results);
  });
});

app.get("/meetings-teacher/:userId", (req, res) => {
  const userId = req.params.userId;
  const query = `select
    r.id_reunion as id, 
    r.estado as estado, 
    r.titulo as titulo, 
    r.asunto as asunto, 
    r.aula as aula, 
    r.fecha as fecha, 
    r.id_centro as id_centro,
    u.nombre as nombre_alumno,
    u.apellidos as apellidos_alumno
from reuniones r
join users u on r.alumno_id = u.id
where r.profesor_id = ? AND
DATE(r.fecha) >= CURRENT_DATE;`;
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      res.status(500).send("Errorea datu-basera konektatzean");
      return;
    }
    res.send(results);
  });
});

app.get("/meeting-teacher/:meetingId", (req, res) => {
  const meetingId = req.params.meetingId;
  const query = `select
    r.id_reunion as id, 
    r.estado as estado, 
    r.titulo as titulo, 
    r.asunto as asunto, 
    r.aula as aula, 
    r.fecha as fecha, 
    r.id_centro as id_centro,
    u.nombre as nombre_alumno,
    u.apellidos as apellidos_alumno
from reuniones r
join users u on r.alumno_id = u.id
where r.id_reunion = ?;`;
  db.query(query, [meetingId], (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      res.status(500).send("Errorea datu-basera konektatzean");
      return;
    }
    res.send(results[0]);
  });
});

app.get("/meeting-student/:meetingId", (req, res) => {
  const meetingId = req.params.meetingId;
  const query = `select 
    r.id_reunion as id,
    r.estado as estado, 
    r.titulo as titulo, 
    r.asunto as asunto, 
    r.aula as aula, 
    r.fecha as fecha, 
    r.id_centro as id_centro,
    u.nombre as nombre_profesor,
    u.apellidos as apellidos_profesor
from reuniones r
join users u on r.profesor_id = u.id
where r.id_reunion = ?;`;
  db.query(query, [meetingId], (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      res.status(500).send("Errorea datu-basera konektatzean");
      return;
    }
    res.send(results[0]);
  });
});

app.get("/meeting-god-admin/:meetingId", (req, res) => {
  const meetingId = req.params.meetingId;
  const query = `select 
    r.id_reunion as id,
    r.estado as estado, 
    r.titulo as titulo, 
    r.asunto as asunto, 
    r.aula as aula, 
    r.fecha as fecha, 
    r.id_centro as id_centro,
    up.nombre as nombre_profesor,
    up.apellidos as apellidos_profesor,
    ua.nombre as nombre_alumno,
    ua.nombre as apellidos_alumno
from reuniones r
join users up on r.profesor_id = up.id
join users ua on r.alumno_id = ua.id
where r.id_reunion = ?;`;
  db.query(query, [meetingId], (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      res.status(500).send("Errorea datu-basera konektatzean");
      return;
    }
    res.send(results[0]);
  });
});

app.get("/meetings-today/", (req, res) => {
  const query = `select 
    r.id_reunion as id,
    r.estado as estado, 
    r.titulo as titulo, 
    r.asunto as asunto, 
    r.aula as aula, 
    r.fecha as fecha, 
    r.id_centro as id_centro,
    up.nombre as nombre_profesor,
    up.apellidos as apellidos_profesor,
    ua.nombre as nombre_alumno,
    ua.nombre as apellidos_alumno
from reuniones r
join users up on r.profesor_id = up.id
join users ua on r.alumno_id = ua.id
WHERE DATE(r.fecha) = CURRENT_DATE;`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      res.status(500).send("Errorea datu-basera konektatzean");
      return;
    }
    res.send(results);
  });
});

app.get("/students", (req, res) => {
  const query = `select * from users where tipo_id = 4;`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      res.status(500).send("Errorea datu-basera konektatzean");
      return;
    }
    res.send(results);
  });
});

app.get("/teachers", (req, res) => {
  const query = `select * from users where tipo_id = 3;`;
  db.query(query, (err, results) => {
    if (err) {
      console.error("Errorea datu-basera konektatzean:", err);
      res.status(500).send("Errorea datu-basera konektatzean");
      return;
    }
    res.send(results);
  });
});

app.get("/god-admins", (req, res) => {
  const query = `select * from users where tipo_id = 1 OR tipo_id = 2;`;
  db.query(query, (err, results) => {
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
