/**
 * Autora: Alexandra Martínez
 * Evidencia: GA4-220501096-AA1-EV01
 */

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('./database');

// Configuración
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// RUTAS (ANTES DE LISTEN)
app.use('/api/empleados', require('./routes/empleado.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/productos', require('./routes/producto.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

// Ruta principal opcional
app.get('/', (req, res) => {
  res.json({ status: 'API REST funcionando' });
});

// Iniciar servidor
app.listen(app.get('port'), () => {
  console.log('server activo en el puerto', app.get('port'));
});