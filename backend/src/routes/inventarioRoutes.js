const express = require('express');
const inventarioController = require('../controllers/inventarioController');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');
// Crear producto
router.post('/', verificarToken, inventarioController.crearProducto);

// Obtener todos los productos (con filtros)
router.get('/', verificarToken, inventarioController.obtenerInventario);

// Obtener un producto por ID
router.get('/:id', verificarToken, inventarioController.obtenerProductoPorId);

// Actualizar producto por ID
router.put('/:id', verificarToken,  inventarioController.actualizarProducto);

// Eliminar producto por ID
router.delete('/:id', verificarToken,  inventarioController.eliminarProducto);

module.exports = router;
