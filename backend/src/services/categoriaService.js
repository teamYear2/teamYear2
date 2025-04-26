const Categoria = require('../models/categoria');

// Crear categoría
const crearCategoria = async (nombre, usuario_id) => {
    try {
        const categoria = await Categoria.create({ nombre, usuario_id });
        return categoria;
    } catch (err) {
        throw new Error('Error al crear la categoría: ' + err.message);
    }
};

// Obtener todas las categorías
const obtenerCategorias = async (usuario_id) => {
    try {
        const categorias = await Categoria.findAll({
            where: { usuario_id }
        });
        return categorias;
    } catch (err) {
        throw new Error('Error al obtener las categorías: ' + err.message);
    }
};

// Obtener una categoría por ID
const obtenerCategoriaPorId = async (id) => {
    try {
        const categoria = await Categoria.findByPk(id);
        return categoria;
    } catch (err) {
        throw new Error('Error al obtener la categoría: ' + err.message);
    }
};

// Actualizar categoría
const actualizarCategoria = async (id, datosActualizados) => {
    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            throw new Error('Categoría no encontrada');
        }
        await categoria.update(datosActualizados);
        return categoria;
    } catch (err) {
        throw new Error('Error al actualizar la categoría: ' + err.message);
    }
};

// Eliminar categoría
const eliminarCategoria = async (id) => {
    try {
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
            throw new Error('Categoría no encontrada');
        }
        await categoria.destroy();
        return;
    } catch (err) {
        throw new Error('Error al eliminar la categoría: ' + err.message);
    }
};

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria,
};
