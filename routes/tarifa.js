const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todas las tarifas
router.get('/', (req, res) => {
    db.query('SELECT * FROM tarifa', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener tarifa por id_tarifa
router.get('/:id_tarifa', (req, res) => {
    const id_tarifa = req.params.id_tarifa;
    db.query('SELECT * FROM tarifa WHERE id_tarifa = ?', [id_tarifa], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Tarifa no encontrada' });
        res.json(results[0]);
    });
});

// Crear nueva tarifa
router.post('/', (req, res) => {
    const { tipo_vehiculo, primera_hora, hora_adicional, tarifa_nocturna, tarifa_festivo } = req.body;
    const data = { tipo_vehiculo, primera_hora, hora_adicional, tarifa_nocturna, tarifa_festivo };
    db.query('INSERT INTO tarifa SET ?', data, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Tarifa creada', id_tarifa: results.insertId });
    });
});

// Actualizar tarifa por id_tarifa
router.put('/:id_tarifa', (req, res) => {
    const id_tarifa = req.params.id_tarifa;
    const { tipo_vehiculo, primera_hora, hora_adicional, tarifa_nocturna, tarifa_festivo } = req.body;
    const data = { tipo_vehiculo, primera_hora, hora_adicional, tarifa_nocturna, tarifa_festivo };
    db.query('UPDATE tarifa SET ? WHERE id_tarifa = ?', [data, id_tarifa], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Tarifa no encontrada' });
        res.json({ message: 'Tarifa actualizada' });
    });
});

// Eliminar tarifa por id_tarifa
router.delete('/:id_tarifa', (req, res) => {
    const id_tarifa = req.params.id_tarifa;
    db.query('DELETE FROM tarifa WHERE id_tarifa = ?', [id_tarifa], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Tarifa no encontrada' });
        res.json({ message: 'Tarifa eliminada' });
    });
});

module.exports = router;
