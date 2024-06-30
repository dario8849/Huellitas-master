const express = require('express');
const authController = require('../controllers/authController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.loguin);

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).send(`Hello user ${req.userId}`);
});

module.exports = router;