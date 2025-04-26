const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

// Crear usuario
const crearUsuario = async (nombre, email, contraseña) => {
    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            throw new Error('El email ya está registrado');
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10); // Número de vueltas de encriptación
        const hash = await bcrypt.hash(contraseña, salt); // Hashea la contraseña

        // Crear el usuario
        const usuario = await Usuario.create({
            nombre,
            email,
            contraseña: hash, // Guarda el hash en lugar de la contraseña en texto
        });

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
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
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

        // Si la contraseña fue actualizada, debemos encriptarla nuevamente
        if (datosActualizados.contraseña) {
            const salt = await bcrypt.genSalt(10);
            datosActualizados.contraseña = await bcrypt.hash(datosActualizados.contraseña, salt);
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

// Obtener un usuario por email
const obtenerUsuarioPorEmail = async (email) => {
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        return usuario;
    } catch (err) {
        throw new Error('Error al obtener el usuario: ' + err.message);
    }
};


module.exports = {
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario,
    obtenerUsuarioPorEmail
};
