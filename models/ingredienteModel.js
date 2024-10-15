const mongoose = require('mongoose');

const ingredienteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    foto: { type: String, required: true },
    color: { type: String, required: true }
}, {versionKey  : false});

const Ingrediente = mongoose.model('Ingrediente', ingredienteSchema);

const getTodos = async () => {
    return await Ingrediente.find();
}

const getById = async (id) => {
    return await Ingrediente.findById(id);
}

const deleteById = async (id) => {
    return await Ingrediente.findByIdAndDelete(id);
}

const updateById = async (id, ingredienteActualizado) => {
    return await Ingrediente.findByIdAndUpdate(id, ingredienteActualizado, { new: true });
}

const add = async (nuevoIngrediente) => {
    const ingrediente = new Ingrediente(nuevoIngrediente);
    return await ingrediente.save(); 
};


module.exports = {
    getTodos,
    getById,
    deleteById,
    updateById,
    add
}
