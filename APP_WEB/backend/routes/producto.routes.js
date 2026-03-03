const express = require('express');
const router = express.Router();

const productoCtrl = require('../controlls/producto.controller');

router.get('/', productoCtrl.getProductos);
router.post('/', productoCtrl.createProducto);
router.get('/:id', productoCtrl.getProducto);
router.put('/:id', productoCtrl.updateProducto);
router.delete('/:id', productoCtrl.deleteProducto);

module.exports = router;