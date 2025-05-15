const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los registros
router.get('/', (req, res) => {
    db.query('SELECT * FROM registro', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener registro por id_registro
router.get('/:id_registro', (req, res) => {
    const id_registro = req.params.id_registro;
    db.query('SELECT * FROM registro WHERE id_registro = ?', [id_registro], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Registro no encontrado' });
        res.json(results[0]);
    });
});

// Crear nuevo registro
router.post('/', (req, res) => {
    const {
        placa,
        id_celda,
        entrada,
        salida,
        tiempo_estacionado,
        valor_pagado,
        estado_pago
    } = req.body;

    const data = {
        placa,
        id_celda,
        entrada,
        salida: salida || null,
        tiempo_estacionado: tiempo_estacionado || null,
        valor_pagado: valor_pagado || null,
        estado_pago: estado_pago || 'pendiente'
    };

    db.query('INSERT INTO registro SET ?', data, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Registro creado', id_registro: results.insertId });
    });
});

// Actualizar registro por id_registro
router.put('/:id_registro', (req, res) => {
    const id_registro = req.params.id_registro;
    const {
        placa,
        id_celda,
        entrada,
        salida,
        tiempo_estacionado,
        valor_pagado,
        estado_pago
    } = req.body;

    const data = {
        placa,
        id_celda,
        entrada,
        salida: salida || null,
        tiempo_estacionado: tiempo_estacionado || null,
        valor_pagado: valor_pagado || null,
        estado_pago: estado_pago || 'pendiente'
    };

    db.query('UPDATE registro SET ? WHERE id_registro = ?', [data, id_registro], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Registro no encontrado' });
        res.json({ message: 'Registro actualizado' });
    });
});

// Eliminar registro por id_registro
router.delete('/:id_registro', (req, res) => {
    const id_registro = req.params.id_registro;
    db.query('DELETE FROM registro WHERE id_registro = ?', [id_registro], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Registro no encontrado' });
        res.json({ message: 'Registro eliminado' });
    });
});

module.exports = router;
