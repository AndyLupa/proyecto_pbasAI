const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '192.168.3.148',
  user: 'root',
  password: '12345678',  
  database:"web"
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err.stack);
    return;
  }
  console.log('Conectado como id ' + connection.threadId);
});

module.exports = connection;
