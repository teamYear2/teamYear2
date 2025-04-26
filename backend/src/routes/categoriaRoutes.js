const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');

// Crear categoría
router.post('/', verificarToken, categoriaController.crearCategoria);

// Obtener todas las categorías
router.get('/', verificarToken, categoriaController.obtenerCategorias);

// Obtener una categoría por ID
router.get('/:id', verificarToken, categoriaController.obtenerCategoriaPorId);

// Actualizar categoría
router.put('/:id', verificarToken, categoriaController.actualizarCategoria);

// Eliminar categoría
router.delete('/:id', verificarToken, categoriaController.eliminarCategoria);

module.exports = router;
