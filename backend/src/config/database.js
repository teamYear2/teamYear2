const { Sequelize } = require('sequelize');

// Conexión a MySQL con Sequelize
const sequelize = new Sequelize('tienda', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Puedes desactivar los logs si no los necesitas
});

module.exports = sequelize;
