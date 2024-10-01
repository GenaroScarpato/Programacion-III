const arrayDeIngredientes = require('../data/ingredientesFake')

const getTodos = () => {
    return arrayDeIngredientes;
}

const getById = (id) => {
    return arrayDeIngredientes.find( ing => ing._id === id );
}

const deleteById = (id) => {
   const index = arrayDeIngredientes.findIndex(ing => ing._id === id);
   arrayDeIngredientes.splice(index,1)
   return arrayDeIngredientes;
// TODO...
}
const updateById = (id) => {
    // TODO...
}
const add = (ingrediente) => {
    // TODO...
}

module.exports = {
    getTodos,
    getById,
    deleteById,
    updateById,
    add
}