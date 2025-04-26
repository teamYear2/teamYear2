const express = require('express');
const inventarioController = require('../controllers/inventarioController');
const router = express.Router();

// Crear producto
router.post('/', inventarioController.crearProducto);

// Obtener todos los productos (con filtros)
router.get('/', inventarioController.obtenerInventario);

// Obtener un producto por ID
router.get('/:id', inventarioController.obtenerProductoPorId);

// Actualizar producto por ID
router.put('/:id', inventarioController.actualizarProducto);

// Eliminar producto por ID
router.delete('/:id', inventarioController.eliminarProducto);

module.exports = router;
