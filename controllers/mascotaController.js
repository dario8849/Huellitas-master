const db = require("../db/db.js");

const getAllMascotas = (req, res) => {
    const sql = "SELECT * FROM mascota";
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const getMascotaById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM mascota WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

const createMascota = (req, res) => {
    const { nombre, especie, raza, id_titular } = req.body;
    const sql = "INSERT INTO mascota (nombre, especie, raza, id_titular) VALUES (?, ?, ?, ?)";
    db.query(sql, [nombre, especie, raza, id_titular], (err, results) => {
        if (err) throw err;
        res.json({ message: 'Mascota created', mascotaId: results.insertId });
    });
};

const updateMascota = (req, res) => {
    const { id } = req.params;
    const { nombre, especie, raza, id_titular } = req.body;
    const sql = "UPDATE mascota SET nombre = ?, especie = ?, raza = ?, id_titular = ? WHERE id = ?";
    db.query(sql, [nombre, especie, raza, id_titular, id], (err, results) => {
        if (err) throw err;
        res.json({ message: "Mascota updated" });
    });
};

const deleteMascota = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM mascota WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.json({ message: "Mascota deleted" });
    });
};

module.exports = {
    getAllMascotas,
    getMascotaById,
    createMascota,
    updateMascota,
    deleteMascota
};