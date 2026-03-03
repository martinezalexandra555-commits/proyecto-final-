const express = require('express');
const router = express.Router();

const authController = require('../controlls/auth.controller');

//  Ruta para registrar usuario
router.post('/registrar', authController.registrar);

//  Ruta para login
router.post('/login', authController.login);

module.exports = router;
