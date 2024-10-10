const express = require('express');
const { getUsuarios, getUsuarioById, addUsuario } = require('../controllers/usuariosController'); // Ajusta la ruta si es necesario

const router = express.Router();

router.get('/', getUsuarios); // Obtener todos los usuarios
router.get('/:id', getUsuarioById); // Obtener un usuario por ID
router.post('/', addUsuario); // Crear un nuevo usuario

module.exports = router;
