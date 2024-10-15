const usuarioModel = require('../models/usuarioModel');

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.find(); // Obtener todos los usuarios
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los usuarios' });
    }
}

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await usuarioModel.getById(id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ error: 'usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener el usuario' });
    }
}



const addUsuario = async (req, res) => {
    try {
        const nuevoUsuario = req.body; 
        const usuariosActualizados = await usuarioModel.add(nuevoUsuario);
        res.status(201).json({
            message: 'usuarioModel agregado exitosamente',
            usuarios: usuariosActualizados // Retorna el array actualizado
        });
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error al agregar al usuario',
            error: error.message
        });
    }
}
module.exports = {
    getUsuarios,
    getUsuarioById,
    addUsuario
}
