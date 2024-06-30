const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tiendayturno"
});

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to the database", err);
        return;
    }
    console.log("Connected to the database");

    //Agregado
    //Para el caso de que no exista la DB desde un inicio,
    //pues en ese entonces se la crea inicialmente
    connection.query('CREATE DATABASE IF NOT EXISTS tiendayturno', (err, results) => {
        if (err) {
            console.error('Error al Crear la base de datos: ', err);
            return;
        }
        console.log('Batabase ensured!');
        
    });    

});

module.exports = connection;