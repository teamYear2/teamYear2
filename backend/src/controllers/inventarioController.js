const inventarioService = require('../services/inventarioService');

// Crear
const crearProducto = async (req, res) => {
    try {
        const { nombre_producto, descripcion, cantidad, categoria_id, usuario_id } = req.body;
        const producto = await inventarioService.crearProducto(nombre_producto, descripcion, cantidad, categoria_id, usuario_id);
        res.status(201).json(producto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener todos
const obtenerInventario = async (req, res) => {
    try {
        const { usuario_id, categoria_id } = req.query;
        const inventarios = await inventarioService.obtenerInventario(usuario_id, categoria_id);
        res.status(200).json(inventarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener uno por ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await inventarioService.obtenerProductoPorId(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const producto = await inventarioService.actualizarProducto(id, datosActualizados);
        res.status(200).json(producto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar
const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        await inventarioService.eliminarProducto(id);
        res.status(204).send();  // Sin contenido
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    crearProducto,
    obtenerInventario,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
};
