const recetasModel = require("../models/recetaModel");

const getTodos = async (req, res) => {    
    try {
        const recetas = await recetasModel.getTodos();
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener las recetas' });
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
   
    try {
        const receta = await recetasModel.getById(id);

        if (receta) {
            res.json(receta);
        } else {
            res.status(404).json({ id, encontrado: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener la receta' });
    }
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        await recetasModel.deleteById(id);
        res.status(200).json({ message: `Receta con ID ${id} eliminada correctamente` });
    } catch (error) {
        res.status(404).json({ error: `Receta con ID ${id} no encontrada` });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;
   
    try {
        const updatedReceta = await recetasModel.updateById(id, req.body);

        if (updatedReceta) {
            res.status(200).json({ message: `Receta con ID ${id} actualizada correctamente`, updatedReceta });
        } else {
            res.status(404).json({ error: `Receta con ID ${id} no encontrada` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al actualizar la receta' });
    }
}

const add = async (req, res) => {
    try {
        const nuevaReceta = req.body; // Obtiene la receta del cuerpo de la petición (req.body)
        const recetaAgregada = await recetasModel.add(nuevaReceta); // Llama a la función `add` de tu modelo
        res.status(201).json({
            message: 'Receta agregada exitosamente',
            receta: recetaAgregada // Retorna la receta agregada
        });
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error al agregar la receta',
            error: error.message
        });
    }
}

const buscarRecetasPorIngredientes = async (req, res) => {
    const { ingredientes } = req.body; // Recibimos los IDs de los ingredientes en el cuerpo de la solicitud
    
    try {
        const recetas = await recetasModel.find({
            ingredientes: { $all: ingredientes } // Usamos $all para buscar recetas que contengan todos los ingredientes especificados
        }).populate('ingredientes'); // Populamos los ingredientes para ver los detalles

        if (recetas.length > 0) {
            res.json(recetas);
        } else {
            res.status(404).json({ message: 'No se encontraron recetas con los ingredientes especificados' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al buscar las recetas' });
    }
};


module.exports = {
    getTodos,
    getById,
    deleteById,
    updateById,
    add,
    buscarRecetasPorIngredientes
}
