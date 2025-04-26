const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const router = express.Router();

// Crear categoría
router.post('/', categoriaController.crearCategoria);

// Obtener todas las categorías
router.get('/', categoriaController.obtenerCategorias);

// Obtener una categoría por ID
router.get('/:id', categoriaController.obtenerCategoriaPorId);

// Actualizar categoría
router.put('/:id', categoriaController.actualizarCategoria);

// Eliminar categoría
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;
