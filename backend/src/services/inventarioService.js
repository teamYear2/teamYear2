const Inventario = require('../models/inventario');

// Crear producto
const crearProducto = async (nombre_producto, descripcion, cantidad, categoria_id, usuario_id) => {
    try {
        const producto = await Inventario.create({
            nombre_producto,
            descripcion,
            cantidad,
            categoria_id,
            usuario_id
        });
        return producto;
    } catch (err) {
        throw new Error('Error al crear el producto: ' + err.message);
    }
};

// Obtener inventario (por usuario, y opcional categoría)
const obtenerInventario = async (usuario_id, categoria_id) => {
    try {
        const inventarios = await Inventario.findAll({
            where: {
                usuario_id,
                ...(categoria_id && { categoria_id })  // Filtro opcional
            }
        });
        return inventarios;
    } catch (err) {
        throw new Error('Error al obtener inventarios: ' + err.message);
    }
};

// Obtener producto por ID
const obtenerProductoPorId = async (id) => {
    try {
        const producto = await Inventario.findByPk(id);
        return producto;
    } catch (err) {
        throw new Error('Error al obtener el producto: ' + err.message);
    }
};

// Actualizar producto
const actualizarProducto = async (id, datosActualizados) => {
    try {
        const producto = await Inventario.findByPk(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        await producto.update(datosActualizados);
        return producto;
    } catch (err) {
        throw new Error('Error al actualizar el producto: ' + err.message);
    }
};

// Eliminar producto
const eliminarProducto = async (id) => {
    try {
        const producto = await Inventario.findByPk(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
        await producto.destroy();
        return;
    } catch (err) {
        throw new Error('Error al eliminar el producto: ' + err.message);
    }
};

module.exports = {
    crearProducto,
    obtenerInventario,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
};
