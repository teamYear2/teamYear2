const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

// Crear usuario
router.post('/', usuarioController.crearUsuario);

// Ruta de login
router.post('/login', usuarioController.loginUsuario);

// Obtener todos los usuarios
router.get('/', usuarioController.obtenerUsuarios);

// Obtener usuario por ID
router.get('/:id', usuarioController.obtenerUsuarioPorId);

// Actualizar usuario
router.put('/:id', usuarioController.actualizarUsuario);

// Eliminar usuario
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;
