const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las celdas
router.get('/', (req, res) => {
    db.query('SELECT * FROM celda', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener celda por id_celda
router.get('/:id_celda', (req, res) => {
    const id_celda = req.params.id_celda;
    db.query('SELECT * FROM celda WHERE id_celda = ?', [id_celda], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Celda no encontrada' });
        res.json(results[0]);
    });
});

// Crear nueva celda
router.post('/', (req, res) => {
    const { tipo, estado, ubicacion } = req.body;
    const data = { tipo, estado, ubicacion };
    db.query('INSERT INTO celda SET ?', data, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Celda creada', id_celda: results.insertId });
    });
});

// Actualizar celda por id_celda
router.put('/:id_celda', (req, res) => {
    const id_celda = req.params.id_celda;
    const { tipo, estado, ubicacion } = req.body;
    const data = { tipo, estado, ubicacion };
    db.query('UPDATE celda SET ? WHERE id_celda = ?', [data, id_celda], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Celda no encontrada' });
        res.json({ message: 'Celda actualizada' });
    });
});

// Eliminar celda por id_celda
router.delete('/:id_celda', (req, res) => {
    const id_celda = req.params.id_celda;
    db.query('DELETE FROM celda WHERE id_celda = ?', [id_celda], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Celda no encontrada' });
        res.json({ message: 'Celda eliminada' });
    });
});

module.exports = router;

