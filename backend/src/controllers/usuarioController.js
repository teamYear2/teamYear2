const usuarioService = require('../services/usuarioService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Crear usuario
const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, contraseña } = req.body;

        // Verificar que todos los campos estén presentes
        if (!nombre || !email || !contraseña) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const usuario = await usuarioService.crearUsuario(nombre, email, contraseña);
        res.status(201).json(usuario);  // 201 es el código de "creado"
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();
        res.status(200).json(usuarios);  // 200 es el código de "ok"
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
            return res.status(404).json({ error: 'Usuario no encontrado' });  // 404 para recurso no encontrado
        }

        res.status(200).json(usuario);  // 200 es el código de "ok"
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar un usuario
const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        // Validación de datos a actualizar
        if (Object.keys(datosActualizados).length === 0) {
            return res.status(400).json({ error: 'No se han proporcionado datos para actualizar' });
        }

        const usuario = await usuarioService.actualizarUsuario(id, datosActualizados);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });  // 404 para recurso no encontrado
        }

        res.status(200).json(usuario);  // 200 es el código de "ok"
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await usuarioService.eliminarUsuario(id);

        // Si el usuario no existe, ya se maneja en el service, así que no hace falta aquí.
        res.status(204).send();  // 204 es el código de "sin contenido", indicando que se eliminó exitosamente
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login de usuario
const loginUsuario = async (req, res) => {
    try {
        const { email, contraseña } = req.body;

        // Validación de campos obligatorios
        if (!email || !contraseña) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        // Buscar usuario por email
        const usuario = await usuarioService.obtenerUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Comparar la contraseña proporcionada con la contraseña en la base de datos
        const esContraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esContraseñaCorrecta) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Crear un JWT (token) con el id del usuario
        const token = jwt.sign({ id: usuario.id }, 'secreto_tu_clave_aqui', { expiresIn: '1h' });

        // Enviar el token como respuesta
        res.status(200).json({ token });

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
    loginUsuario
};
