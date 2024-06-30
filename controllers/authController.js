//importa el módulo jsonwebtoken para manejar JWT
const jwt = require('jsonwebtoken');
//importa el módulo bcryptjs para cifrar contraseñas
const bcrypt = require('bcryptjs');
//importa el modelo de usuarios(array de usuarios)
const users = require('../models/userModel.js');
//Importa la configuración (clave secreta y duración del token)
const config = require('../config/config.js');


//Función para registrat un nuevo usuario
exports.register = (req, res) => {
    //Extrae el nombre de usuario y la constraseña del cuerpo de la solicitud
    const { username, password } = req.body;
    //Cifra la constraseña usando bcrypt
    const hashedPassword = bcrypt.hashSync(password, 8);

    //Crea un nuevo objeto de usuario con un ID único
    const newUser = {
        id: users.length + 1 , 
        username,
        password: hashedPassword
    };
    // Agrega al nuevo usuario al array de usuarios
    users.push(newUser);

    //Genera un token JWT para el nuevo ususrio
    const token = jwt.sign(
        { id: newUser.id },
        config.secretKey,
        { expiresIn: config.tokenExpiresIn }
    );
    //Envía el token como respuesta al cliente
    res.status(201).send(
        {
            auth: true,
            token
        }
    );
};

//Función para iniciar sesión de un usuario
exports.loguin = (req, res) => {
    //Extrae el nombre de usuario y la constraseña del cuerpo de la solicitud
    const { username, password } = req.body;
    //Busca Busca el ususarioe n el array de ususarios por nombre de usuario
    const user = users.find(u => u.username === username);
    //Si el uisuario no se encuentra devuelve un error 404
    if(!user) return res.status(404).send('User not found.');
    //Compara la contraseña proporcionada con la constraseña cifrada almacenada.
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    //si la contraseña no es válida, devuelve un error 401
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    //Genera un token JWT usando el Id del usuario
    const token = jwt.sign(
        { id: user.id },
        config.secretKey,
        { expiresIn: config.tokenExpiresIn }
    );
    //Envía el token JWT al cliente con el estado 200 (OK)
    res.status(200).send({ auth: true, token });
};