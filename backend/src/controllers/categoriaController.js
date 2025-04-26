const categoriaService = require('../services/categoriaService');

// Crear categoría
const crearCategoria = async (req, res) => {
    try {
        const { nombre, usuario_id } = req.body;
        const categoria = await categoriaService.crearCategoria(nombre, usuario_id);
        res.status(201).json(categoria);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener todas las categorías (por usuario)
const obtenerCategorias = async (req, res) => {
    try {
        const { usuario_id } = req.query;
        const categorias = await categoriaService.obtenerCategorias(usuario_id);
        res.status(200).json(categorias);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener una categoría por ID
const obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await categoriaService.obtenerCategoriaPorId(id);
        if (!categoria) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.status(200).json(categoria);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar una categoría
const actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const categoria = await categoriaService.actualizarCategoria(id, datosActualizados);
        res.status(200).json(categoria);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar una categoría
const eliminarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        await categoriaService.eliminarCategoria(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria,
};
