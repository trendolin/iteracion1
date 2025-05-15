const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las novedades
router.get('/', (req, res) => {
    db.query('SELECT * FROM novedad', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener novedad por id_novedad
router.get('/:id_novedad', (req, res) => {
    const id_novedad = req.params.id_novedad;
    db.query('SELECT * FROM novedad WHERE id_novedad = ?', [id_novedad], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Novedad no encontrada' });
        res.json(results[0]);
    });
});

// Crear nueva novedad
router.post('/', (req, res) => {
    const { registro_id, tipo, descripcion, foto } = req.body;
    const data = { registro_id, tipo, descripcion, foto };
    db.query('INSERT INTO novedad SET ?', data, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Novedad creada', id_novedad: results.insertId });
    });
});

// Actualizar novedad por id_novedad
router.put('/:id_novedad', (req, res) => {
    const id_novedad = req.params.id_novedad;
    const { registro_id, tipo, descripcion, foto } = req.body;
    const data = { registro_id, tipo, descripcion, foto };
    db.query('UPDATE novedad SET ? WHERE id_novedad = ?', [data, id_novedad], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Novedad no encontrada' });
        res.json({ message: 'Novedad actualizada' });
    });
});

// Eliminar novedad por id_novedad
router.delete('/:id_novedad', (req, res) => {
    const id_novedad = req.params.id_novedad;
    db.query('DELETE FROM novedad WHERE id_novedad = ?', [id_novedad], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Novedad no encontrada' });
        res.json({ message: 'Novedad eliminada' });
    });
});

module.exports = router;
