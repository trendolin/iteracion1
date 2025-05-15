const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los vehículos
router.get('/', (req, res) => {
    db.query('SELECT * FROM vehiculo', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener vehículo por placa
router.get('/:placa', (req, res) => {
    const placa = req.params.placa;
    db.query('SELECT * FROM vehiculo WHERE placa = ?', [placa], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Vehículo no encontrado' });
        res.json(results[0]);
    });
});

// Crear nuevo vehículo
router.post('/', (req, res) => {
    const { placa, tipo, marca, modelo, color, foto_anpr, foto_completa, id_usuario } = req.body;
    const data = { placa, tipo, marca, modelo, color, foto_anpr, foto_completa, id_usuario };
    db.query('INSERT INTO vehiculo SET ?', data, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Vehículo creado', id: placa });
    });
});

// Actualizar vehículo por placa
router.put('/:placa', (req, res) => {
    const placa = req.params.placa;
    const { tipo, marca, modelo, color, foto_anpr, foto_completa, id_usuario } = req.body;
    const data = { tipo, marca, modelo, color, foto_anpr, foto_completa, id_usuario };
    db.query('UPDATE vehiculo SET ? WHERE placa = ?', [data, placa], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Vehículo no encontrado' });
        res.json({ message: 'Vehículo actualizado' });
    });
});

// Eliminar vehículo por placa
router.delete('/:placa', (req, res) => {
    const placa = req.params.placa;
    db.query('DELETE FROM vehiculo WHERE placa = ?', [placa], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Vehículo no encontrado' });
        res.json({ message: 'Vehículo eliminado' });
    });
});

module.exports = router;

