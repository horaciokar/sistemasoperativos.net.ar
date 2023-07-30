// Importar las librerías necesarias
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
require('dotenv').config();

// Crear la aplicación Express
const app = express();

// Configurar la sesión
app.use(
  session({
    secret: 'secreto_de_la_sesion',
    resave: false,
    saveUninitialized: false
  })
);

// Configurar el middleware para analizar el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Establecer la conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Página de inicio
app.get('/', (req, res) => {
  res.send('Bienvenido a la página de inicio');
});

// Página de inicio de sesión
app.get('/login', (req, res) => {
  res.send(`
    <h1>Iniciar sesión</h1>
    <form method="POST" action="/login">
      <input type="text" name="usuario" placeholder="Usuario" required><br>
      <input type="password" name="contrasena" placeholder="Contraseña" required><br>
      <button type="submit">Iniciar sesión</button>
    </form>
  `);
});

// Proceso de inicio de sesión
app.post('/login', (req, res) => {
  const { usuario, contrasena } = req.body;

  // Consultar el usuario en la base de datos
  connection.query(
    'SELECT * FROM usuarios WHERE usuario = ?',
    [usuario],
    (err, results) => {
      if (err) {
        console.error('Error al consultar el usuario:', err);
        res.send('Error al iniciar sesión');
        return;
      }

      if (results.length === 0) {
        res.send('Usuario no encontrado');
        return;
      }

      const usuarioEncontrado = results[0];

      // Comparar la contraseña ingresada con el hash almacenado
      bcrypt.compare(contrasena, usuarioEncontrado.contrasena, (err, isMatch) => {
        if (err) {
          console.error('Error al comparar las contraseñas:', err);
          res.send('Error al iniciar sesión');
          return;
        }

        if (isMatch) {
          // Iniciar sesión y redirigir a la página del cuestionario
          req.session.usuario = usuarioEncontrado;
          res.redirect('/cuestionario');
        } else {
          res.send('Contraseña incorrecta');
        }
      });
    }
  );
});

// Página del cuestionario (requiere inicio de sesión)
