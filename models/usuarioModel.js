const mongoose = require('mongoose');

// Definir el esquema de usuario
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    pass: { type: String, required: true },
    rol: { type: String, required: true }
});

// Crear el modelo 'Usuario' para la colección 'usuarios'
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
