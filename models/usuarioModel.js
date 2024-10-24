const mongoose = require('mongoose');

// Definir el esquema de usuario
const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
}, {versionKey  : false});

// Crear el modelo 'Usuario' para la colección 'usuarios'
const Usuario = mongoose.model('Usuario', usuarioSchema);

const getUsuarios = async () => {
    return await Usuario.find();
}
const getByName = async (username) => {
    return await Usuario.findOne({ username });  // Cambiar el argumento a un objeto
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
