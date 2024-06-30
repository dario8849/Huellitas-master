const db = require("../db/db.js");

const getAllTitulares = (req, res) => {
    const sql = "SELECT * FROM titular";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const getTitularById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM titular WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const createTitular = (req, res) => {
    const { nombre, apellido, telefono } = req.body;
    const sql = "INSERT INTO titular (nombre, apellido, telefono) VALUES (?, ?, ?)";
    db.query(sql, [nombre, apellido, telefono], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Titular created', titularId: results.insertId });
    });
};

const updateTitular = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono } = req.body;
    const sql = "UPDATE titular SET nombre = ?, apellido = ?, telefono = ? WHERE id = ?";
    db.query(sql, [nombre, apellido, telefono, id], (err, results) => {
        if (err) throw err;
        res.json({ message: "Titular updated" });
    });
};

const deleteTitular = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM titular WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json({ message: "Titular deleted" });
    });
};

module.exports = {
    getAllTitulares,
    getTitularById,
    createTitular,
    updateTitular,
    deleteTitular
};