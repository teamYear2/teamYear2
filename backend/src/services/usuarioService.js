const Usuario = require('../models/usuario');

// Crear usuario
const crearUsuario = async (nombre, email, contraseña) => {
    try {
        const usuario = await Usuario.create({ nombre, email, contraseña });
        return usuario;
    } catch (err) {
        throw new Error('Error al crear el usuario: ' + err.message);
    }
};

// Obtener todos los usuarios
const obtenerUsuarios = async () => {
    try {
        const usuarios = await Usuario.findAll();
        return usuarios;
    } catch (err) {
        throw new Error('Error al obtener los usuarios: ' + err.message);
    }
};

// Obtener un usuario por ID
const obtenerUsuarioPorId = async (id) => {
    try {
        const usuario = await Usuario.findByPk(id);
        return usuario;
    } catch (err) {
        throw new Error('Error al obtener el usuario: ' + err.message);
    }
};

// Actualizar un usuario
const actualizarUsuario = async (id, datosActualizados) => {
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        await usuario.update(datosActualizados);
        return usuario;
    } catch (err) {
        throw new Error('Error al actualizar el usuario: ' + err.message);
    }
};

// Eliminar un usuario
const eliminarUsuario = async (id) => {
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        await usuario.destroy();
        return;
    } catch (err) {
        throw new Error('Error al eliminar el usuario: ' + err.message);
    }
};

module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario,
};
