// const express = require('express');
import express from 'express';
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: '1234567890',
  database: 'redesdedatos',
});

// Conectar a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Ruta para mostrar los usuarios registrados
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM users';

  // Ejecutar la consulta SQL
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).send('Error al obtener los usuarios');
    } else {
      res.render('usuarios', { usuarios: results });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
