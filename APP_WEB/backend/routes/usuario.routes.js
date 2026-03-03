const express = require('express');
const router = express.Router();

const usuarioCtrl = require('../controlls/usuario.controller');


router.get('/', usuarioCtrl.getUsuarios);
router.post('/', usuarioCtrl.createUsuario);
router.get('/:id', usuarioCtrl.getUsuario);
router.put('/:id', usuarioCtrl.updateUsuario);
router.delete('/:id', usuarioCtrl.deleteUsuario);


router.post('/login', usuarioCtrl.login);

module.exports = router;