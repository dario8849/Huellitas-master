const db = require("../db/db.js");

const getAllProductos = (req, res) => {
    const sql = "SELECT * FROM producto";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const getProductoById = (req, res) => {
    const { codigo } = req.params;
    const sql = "SELECT * FROM producto WHERE codigo = ?";
    db.query(sql, [codigo], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const createProducto = (req, res) => {
    const { nombre, precio, cantidad } = req.body;
    const sql = "INSERT INTO producto (nombre, precio, cantidad) VALUES (?, ?, ?)";
    db.query(sql, [nombre, precio, cantidad], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Producto created', productoId: results.insertId });
    });
};

const updateProducto = (req, res) => {
    const { codigo } = req.params;
    const { nombre, precio, cantidad } = req.body;
    const sql = "UPDATE producto SET nombre = ?, precio = ?, cantidad = ? WHERE codigo = ?";
    db.query(sql, [nombre, precio, cantidad, codigo], (err, results) => {
        if (err) throw err;
        res.json({ message: "Producto updated" });
    });
};

const deleteProducto = (req, res) => {
    const { codigo } = req.params;
    const sql = "DELETE FROM producto WHERE codigo = ?";
    db.query(sql, [codigo], (err, results) => {
        if (err) throw err;
        res.json({ message: "Producto deleted" });
    });
};

module.exports = {
    getAllProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};