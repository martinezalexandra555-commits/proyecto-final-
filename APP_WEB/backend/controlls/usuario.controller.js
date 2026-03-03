const Usuario = require('../models/usuario');
const usuarioCtrl = {};

// Listar todos
usuarioCtrl.getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
};

// Crear usuario
usuarioCtrl.createUsuario = async (req, res) => {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json({ status: 'Usuario creado' });
};

// Obtener por ID
usuarioCtrl.getUsuario = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
};

// Actualizar
usuarioCtrl.updateUsuario = async (req, res) => {
    const { id } = req.params;
    await Usuario.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.json({ status: 'Usuario actualizado' });
};

// Eliminar
usuarioCtrl.deleteUsuario = async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ status: 'Usuario eliminado' });
};

// Login simple
usuarioCtrl.login = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) return res.json({ message: "Usuario no existe" });
    if (usuario.password !== password) return res.json({ message: "Contraseña incorrecta" });

    res.json({ message: "Autenticado", usuario });
};

module.exports = usuarioCtrl;