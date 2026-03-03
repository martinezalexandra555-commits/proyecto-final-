const Producto = require('../models/producto');
const productoCtrl = {};

productoCtrl.getProductos = async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
};

productoCtrl.createProducto = async (req, res) => {
    const producto = new Producto(req.body);
    await producto.save();
    res.json({ status: 'Producto creado' });
};

productoCtrl.getProducto = async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    res.json(producto);
};

productoCtrl.updateProducto = async (req, res) => {
    const { id } = req.params;
    await Producto.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.json({ status: 'Producto actualizado' });
};

productoCtrl.deleteProducto = async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ status: 'Producto eliminado' });
};

module.exports = productoCtrl;