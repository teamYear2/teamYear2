const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Categoria extends Model {}

Categoria.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categorias',
    timestamps: false
});

module.exports = Categoria;
