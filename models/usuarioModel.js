const mongoose = require('mongoose');

// Definir el esquema de usuario
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    pass: { type: String, required: true },
    rol: { type: String, required: true }
}, {versionKey  : false});

// Crear el modelo 'Usuario' para la colección 'usuarios'
const Usuario = mongoose.model('Usuario', usuarioSchema);

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

module.exports = {
    Usuario,
    getByName,
    add,
    getById
};
