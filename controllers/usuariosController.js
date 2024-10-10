const Usuario = require('../models/usuarioModel');

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find(); // Obtener todos los usuarios
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los usuarios' });
    }
}

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener el usuario' });
    }
}

// Crear un nuevo usuario
const addUsuario = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario creado exitosamente', nuevoUsuario });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al crear el usuario' });
    }
}

module.exports = {
    getUsuarios,
    getUsuarioById,
    addUsuario
}
