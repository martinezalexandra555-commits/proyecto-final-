/**
 * Vamos a crear rutas del servidor
 * creamos un módulo por eso utilizamos express
 * vamos a utilizar como nuestra rest api para 
 * enviar y recibir datos en formato json
 */
const express = require('express');
const router = express.Router();
const empleadoCtrl = require('../controlls/empleado.controller');

router.get('/', empleadoCtrl.getEmpleados);
router.post('/', empleadoCtrl.createEmpleados);
router.get('/:id', empleadoCtrl.getUnicoEmpleado);
router.put('/:id', empleadoCtrl.editarEmpleado);
router.delete('/:id', empleadoCtrl.eliminarEmpleado);

module.exports = router; 
