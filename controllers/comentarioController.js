const comentariosModel = require("../models/comentarioModel"); // Cambiado para usar comentariosModel

const add = async (req, res) => {
    try {
        const { recetaId, texto } = req.body; // Obtiene la recetaId y el texto del cuerpo de la petición
        const usuarioId = req.usuario.id; // Asumiendo que tienes el ID del usuario en el token
        
        const nuevoComentario = await comentariosModel.add(usuarioId, recetaId, texto); // Usando add
        res.status(201).json({
            message: 'Comentario agregado exitosamente',
            comentario: nuevoComentario // Retorna el nuevo comentario
        });
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error al agregar el comentario',
            error: error.message
        });
    }
}
const getTodos = async (req, res) => {
    try {
        const comentarios = await comentariosModel.getTodos();
        res.json(comentarios);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los comentarios' });
    }
}

const getById = async (req, res) => {
    const { id } = req.params;

    try {
        const comentario = await comentariosModel.getById(id);

        if (comentario) {
            res.json(comentario);
        } else {
            res.status(404).json({ id, encontrado: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener el comentario' });
    }
}


const getByReceta = async (req, res) => {
    const { id : recetaId } = req.params;
         
    try {
        const comentarios = await comentariosModel.getByReceta(recetaId); // Usando getByReceta

        if (comentarios.length > 0) {
            res.json(comentarios);
        } else {
            res.status(404).json({ mensaje: 'No se encontraron comentarios para esta receta' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los comentarios' });
    }
}

const getByUser = async (req, res) => {
    const usuarioId = req.usuario.id; // Cambiado para usar el ID del usuario del token

    try {
        const comentarios = await comentariosModel.getByUser(usuarioId); // Usando getByUser

        if (comentarios.length > 0) {
            res.json(comentarios);
        } else {
            res.status(404).json({ mensaje: 'No se encontraron comentarios para este usuario' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los comentarios del usuario' });
    }
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await comentariosModel.deleteById(id); // Cambiado a deleteById
        if (resultado) {
            res.status(200).json({ message: `Comentario con ID ${id} eliminado correctamente` });
        } else {
            res.status(404).json({ error: `Comentario con ID ${id} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al eliminar el comentario' });
    }
}

module.exports = {
    add,
    getTodos,
    getById,
    getByReceta,
    getByUser,
    deleteById
}
