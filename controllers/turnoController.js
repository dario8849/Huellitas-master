const db = require("../db/db.js");

const getAllTurnos = (req, res) => {
    const sql = `
        SELECT 
            turno.*, 
            mascota.nombre AS nombre_mascota, 
            titular.nombre AS nombre_titular
        FROM turno
        JOIN mascota ON turno.id_mascota = mascota.id
        JOIN titular ON turno.id_titular = titular.id
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const getTurnoById = (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT 
            turno.*, 
            mascota.nombre AS nombre_mascota, 
            titular.nombre AS nombre_titular
        FROM turno
        JOIN mascota ON turno.id_mascota = mascota.id
        JOIN titular ON turno.id_titular = titular.id
        WHERE turno.id = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
};

const createTurno = (req, res) => {
    const { fecha, hora, id_mascota, id_titular } = req.body;
    const sql = "INSERT INTO turno (fecha, hora, id_mascota, id_titular) VALUES (?, ?, ?, ?)";
    db.query(sql, [fecha, hora, id_mascota, id_titular], (err, results) => {
        if (err) throw err;
        const sqlSelect = `
            SELECT 
                turno.*, 
                mascota.nombre AS nombre_mascota, 
                titular.nombre AS nombre_titular
            FROM turno
            JOIN mascota ON turno.id_mascota = mascota.id
            JOIN titular ON turno.id_titular = titular.id
            WHERE turno.id = ?
        `;
        db.query(sqlSelect, [results.insertId], (err, results) => {
            if (err) throw err;
            res.json({ message: 'Turno created', turno: results[0] });
        });
    });
};

const updateTurno = (req, res) => {
    const { id } = req.params;
    const { fecha, hora, id_mascota, id_titular } = req.body;
    const sql = "UPDATE turno SET fecha = ?, hora = ?, id_mascota = ?, id_titular = ? WHERE id = ?";
    db.query(sql, [fecha, hora, id_mascota, id_titular, id], (err, results) => {
        if (err) throw err;
        const sqlSelect = `
            SELECT 
                turno.*, 
                mascota.nombre AS nombre_mascota, 
                titular.nombre AS nombre_titular
            FROM turno
            JOIN mascota ON turno.id_mascota = mascota.id
            JOIN titular ON turno.id_titular = titular.id
            WHERE turno.id = ?
        `;
        db.query(sqlSelect, [id], (err, results) => {
            if (err) throw err;
            res.json({ message: "Turno updated", turno: results[0] });
        });
    });
};

const deleteTurno = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM turno WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json({ message: "Turno deleted" });
    });
};

module.exports = {
    getAllTurnos,
    getTurnoById,
    createTurno,
    updateTurno,
    deleteTurno
};