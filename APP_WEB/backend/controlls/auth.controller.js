const User = require('../models/usuario');
const bcrypt = require('bcryptjs');

// 👉 Registrar usuario
exports.registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Validar campos
    if (!nombre || !email || !password) {
      return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ msg: 'El usuario ya existe' });

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el usuario
    const user = new User({ nombre, email, password: hashedPassword });
    await user.save();

    res.status(201).json({
      msg: 'Usuario registrado correctamente',
      usuario: {
        id: user._id,
        nombre: user.nombre,
        email: user.email
      }
    });
  } catch (error) {
    console.error('🔥 Error en registrar:', error);
    res.status(500).json({
      msg: 'Error en el servidor',
      error: error.message || error.toString()
    });
  }
};

// 👉 Login sin token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar datos
    if (!email || !password) {
      return res.status(400).json({ msg: 'Debe ingresar email y contraseña' });
    }

    // Buscar el usuario
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

    // Comparar contraseñas
    const esValido = await bcrypt.compare(password, user.password);
    if (!esValido) return res.status(401).json({ msg: 'Credenciales inválidas' });

    // ✅ Devolver datos del usuario (sin token)
    res.json({
      msg: 'Login exitoso',
      usuario: {
        id: user._id,
        nombre: user.nombre,
        email: user.email
      }
    });
  } catch (error) {
    console.error('🔥 Error en login:', error);
    res.status(500).json({
      msg: 'Error en el servidor',
      error: error.message || error.toString()
    });
  }
};