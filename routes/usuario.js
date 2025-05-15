const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de crear un archivo db.js para manejar la conexión

// Obtener todos los usuarios
router.get('/', (req, res) => {
    db.query('SELECT * FROM usuario', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
    const { nombre, doc_identidad, telefono, email, tipo_plan, fecha_inicio_plan } = req.body;
    db.query('INSERT INTO usuario SET ?', { nombre, doc_identidad, telefono, email, tipo_plan, fecha_inicio_plan }, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: results.insertId });
    });
});

// Agrega más rutas según sea necesario...

module.exports = router;
