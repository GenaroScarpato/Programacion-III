const express = require('express')
const router = express.Router()
const {getTodos, getById, deleteById, updateById, add, buscarRecetasPorIngredientes} = require("../controllers/recetaController");
const { validarJwt, validarRol } = require('../middlewares/validation');

router.get('/', getTodos);
router.get('/all', getTodos);
router.get('/:id',[validarJwt], getById);
router.delete('/:id',[validarJwt,validarRol], deleteById);
router.put('/:id',[validarJwt,validarRol], updateById);
router.post('/',[validarJwt,validarRol], add);
router.post('/buscarPorIngredientes', buscarRecetasPorIngredientes);

module.exports = router;