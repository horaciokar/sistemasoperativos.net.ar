// Importar el paquete 'mysql'
const mysql = require('mysql');

// Configurar la conexión a la base de datos (modifica los valores según tu configuración)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: '1234567890',
  database: 'cuestionario'
});

// Establecer la conexión a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conexión establecida correctamente');
});

// Crear una función para guardar los resultados del cuestionario
function guardarResultados(answers) {
  // Calcular la puntuación
  let score = 0;

  if (answers.q1 === 'a') {
    score++;
  }
  if (answers.q2 === 'a') {
    score++;
  }
  if (answers.q3 === 'b') {
    score++;
  }
  if (answers.q4 === 'b') {
    score++;
  }

  // Crear la consulta SQL para insertar los resultados en la base de datos
  const sql = `INSERT INTO results (name, score) VALUES (?, ?)`;

  // Ejecutar la consulta SQL
  connection.query(sql, [answers.name, score], (error, result) => {
    if (error) {
      console.error('Error al guardar los resultados:', error);
      return;
    }

    console.log('Resultados guardados correctamente');
  });
}

// Ejemplo de uso
const answers = {
  name: 'John Doe',
  q1: 'a',
  q2: 'b',
  q3: 'c',
  q4: 'd'
};

guardarResultados(answers);

// Cerrar la conexión a la base de datos al finalizar
process.on('exit', () => {
  connection.end();
});
