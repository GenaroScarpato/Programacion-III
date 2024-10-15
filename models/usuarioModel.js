const mongoose = require('mongoose');

// Definir el esquema de usuario
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    pass: { type: String, required: true },
    rol: { type: String, required: true }
}, {versionKey  : false});

// Crear el modelo 'Usuario' para la colección 'usuarios'
const Usuario = mongoose.model('Usuario', usuarioSchema);

const getUsuarios = async () => {
    return await Usuario.find();
}
const getByName = async (username) => {
    return await Usuario.findOne({ nombre: username });  // Cambiar el argumento a un objeto
}
const getById = async (id) => {
    return await Usuario.findById(id);
}

const add = async (newUser) => {
    const user = new Usuario(newUser);
    return await user.save(); 
};

const deleteById = async (id) => {
    return await Usuario.findByIdAndDelete(id);
}
const updateById = async (id, ingredienteActualizado) => {
    return await Usuario.findByIdAndUpdate(id, ingredienteActualizado, { new: true });
}
module.exports = {
    Usuario,
    getUsuarios,
    getByName,
    add,
    getById,
    deleteById,
    updateById
};
