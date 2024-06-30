const db = require("../db/db.js");

const getAllPedidos = (req, res) => {
    const sql = `
        SELECT p.id, p.fecha, p.id_cliente, c.nombre AS nombre_cliente, p.id_producto, pr.nombre AS nombre_producto
        FROM pedido p
        JOIN cliente c ON p.id_cliente = c.id
        JOIN producto pr ON p.id_producto = pr.codigo
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const getPedidoById = (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT p.id, p.fecha, p.id_cliente, c.nombre AS nombre_cliente, p.id_producto, pr.nombre AS nombre_producto
        FROM pedido p
        JOIN cliente c ON p.id_cliente = c.id
        JOIN producto pr ON p.id_producto = pr.codigo
        WHERE p.id = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const createPedido = (req, res) => {
    const { fecha, id_cliente, id_producto } = req.body;
    const insertSql = "INSERT INTO pedido (fecha, id_cliente, id_producto) VALUES (?, ?, ?)";
    
    db.query(insertSql, [fecha, id_cliente, id_producto], (err, results) => {
        if (err) throw err;
        
        const newPedidoId = results.insertId;
        const selectSql = `
            SELECT p.id, p.fecha, p.id_cliente, c.nombre AS nombre_cliente, p.id_producto, pr.nombre AS nombre_producto
            FROM pedido p
            JOIN cliente c ON p.id_cliente = c.id
            JOIN producto pr ON p.id_producto = pr.codigo
            WHERE p.id = ?
        `;
        db.query(selectSql, [newPedidoId], (err, results) => {
            if (err) throw err;
            res.json(results[0]);
        });
    });
};

const updatePedido = (req, res) => {
    const { id } = req.params;
    const { fecha, id_cliente, id_producto } = req.body;
    const updateSql = "UPDATE pedido SET fecha = ?, id_cliente = ?, id_producto = ? WHERE id = ?";

    db.query(updateSql, [fecha, id_cliente, id_producto, id], (err, results) => {
        if (err) throw err;

        const selectSql = `
            SELECT p.id, p.fecha, p.id_cliente, c.nombre AS nombre_cliente, p.id_producto, pr.nombre AS nombre_producto
            FROM pedido p
            JOIN cliente c ON p.id_cliente = c.id
            JOIN producto pr ON p.id_producto = pr.codigo
            WHERE p.id = ?
        `;
        db.query(selectSql, [id], (err, results) => {
            if (err) throw err;
            res.json(results[0]);
        });
    });
};

const deletePedido = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM pedido WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json({ message: "Pedido deleted" });
    });
};

module.exports = {
    getAllPedidos,
    getPedidoById,
    createPedido,
    updatePedido,
    deletePedido
};