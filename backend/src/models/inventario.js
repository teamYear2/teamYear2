const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Inventario extends Model { }

Inventario.init({
    nombre_producto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {
    sequelize,
    modelName: 'Inventario',
    tableName: 'inventario',
    timestamps: false
});

module.exports = Inventario;
