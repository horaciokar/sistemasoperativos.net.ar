const mysql = require('mysql');

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: '1234567890',
  database: 'redesdedatos'
});

// Realizar la conexión
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Exportar la conexión
module.exports = connection;
