const express = require('express')
const router = express.Router()
const {getAll, getById, deleteById, updateById, add, buscarRecetasPorIngredientes} = require("../controllers/recetaController");
const { validarJwt, validarRol } = require('../middlewares/validation');

router.get('/', getAll);
router.get('/all', getAll);
router.get('/:id',[validarJwt], getById);
router.delete('/:id',[validarJwt,validarRol], deleteById);
router.put('/:id',[validarJwt,validarRol], updateById);
router.post('/',[validarJwt,validarRol], add);
router.post('/buscarPorIngredientes', buscarRecetasPorIngredientes);

module.exports = router;