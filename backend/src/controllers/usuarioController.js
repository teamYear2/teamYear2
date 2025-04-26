const usuarioService = require('../services/usuarioService');

// Crear usuario
const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, contraseña } = req.body;
        const usuario = await usuarioService.crearUsuario(nombre, email, contraseña);
        res.status(201).json(usuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();
        res.status(200).json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.obtenerUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;
        const usuario = await usuarioService.actualizarUsuario(id, datosActualizados);
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await usuarioService.eliminarUsuario(id);
        res.status(204).send();  // Sin contenido
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario,
};
