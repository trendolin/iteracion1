const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto por tu usuario de MySQL
    password: 'admin', // Cambia esto por tu contraseña de MySQL
    database: 'parqueadero' // Cambia esto por el nombre de tu base de datos
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Rutas
app.use('/api/usuario', require('./routes/usuario'));
app.use('/api/vehiculo', require('./routes/vehiculo'));
app.use('/api/celda', require('./routes/celda'));
app.use('/api/tarifa', require('./routes/tarifa'));
app.use('/api/registro', require('./routes/registro'));
app.use('/api/novedad', require('./routes/novedad'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:3306`);
});
