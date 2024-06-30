const db = require("../db/db.js");

const getAllClientes = (req, res) => {
    const sql = "SELECT * FROM cliente";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const getClienteById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM cliente WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const createCliente = (req, res) => {
    const { nombre, apellido, fecha_de_nacimiento, dni } = req.body;
    const sql = "INSERT INTO cliente (nombre, apellido, fecha_de_nacimiento, dni) VALUES (?, ?, ?, ?)";
    db.query(sql, [nombre, apellido, fecha_de_nacimiento, dni], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Cliente created', clienteId: results.insertId });
    });
};

const updateCliente = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, fecha_de_nacimiento, dni } = req.body;
    const sql = "UPDATE cliente SET nombre = ?, apellido = ?, fecha_de_nacimiento = ?, dni = ? WHERE id = ?";
    db.query(sql, [nombre, apellido, fecha_de_nacimiento, dni, id], (err, results) => {
        if (err) throw err;
        res.json({ message: "Cliente updated" });
    });
};

const deleteCliente = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM cliente WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json({ message: "Cliente deleted" });
    });
};

module.exports = {
    getAllClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};