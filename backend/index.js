const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/config/database');
const cors = require('cors');

// Importar las rutas
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');
const inventarioRoutes = require('./src/routes/inventarioRoutes');

// Inicializar la app de Express
const app = express();
// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// Usar las rutas
app.use('/usuarios', usuarioRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/inventario', inventarioRoutes);

// Conectar a la base de datos y arrancar el servidor
sequelize.sync({ force: false })  // Cambia a `force: true` solo para la primera vez
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor corriendo en el puerto 3000');
            console.log('http://localhost:3000/inventario');
            console.log('http://localhost:3000/usuarios');
            console.log('http://localhost:3000/categorias');
        });
    })
    .catch((err) => {
        console.error('Error al conectar con la base de datos:', err);
    });
