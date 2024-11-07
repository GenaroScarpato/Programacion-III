const recetasModel = require("../models/recetaModel");

const getAll = async (req, res) => {    
    try {
        const recetas = await recetasModel.getAll();
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
            res.status(404).json({ error: 'Receta no encontrada' });
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
    const { ingredientes } = req.body; // IDs de ingredientes recibidos en el cuerpo de la solicitud
    try {
        const recetas = await recetasModel.buscarPorIngredientes(ingredientes);

        if (recetas.length > 0) {
            res.json(recetas);
        } else {
            res.status(404).json({ message: 'No se encontraron recetas con los ingredientes especificados' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al buscar las recetas' });
    }
};

const buscarPorTipoComida = async (req, res) => {
    try {
        let tiposComida = req.query.tiposComida;

        // Verifica si tiposComida está definido
        if (!tiposComida) {
            return res.status(400).json({ error: 'El parámetro tiposComida es requerido' });
        }

        // Si tiposComida es un string, conviértelo a array (maneja un solo valor o varios separados por comas)
        if (typeof tiposComida === 'string') {
            tiposComida = tiposComida.includes(',')
                ? tiposComida.split(',') // Si tiene coma, lo convierte en array
                : [tiposComida]; // Si no, lo convierte en un array con un solo valor
        }

        console.log('Tipos de comida recibidos:', tiposComida); // Debug

        // Llama al modelo con el array de tiposComida
        const recetas = await recetasModel.buscarPorTipoComida(tiposComida);

        if (recetas.length > 0) {
            res.json(recetas);
        } else {
            res.status(404).json({ message: 'No se encontraron recetas para los tipos de comida especificados' });
        }
    } catch (error) {
        console.error('Error al buscar recetas por tipo de comida:', error);
        res.status(500).json({ error: 'Hubo un error al buscar las recetas', detalle: error.message });
    }
};




module.exports = {
    getAll,
    getById,
    deleteById,
    updateById,
    add,
    buscarRecetasPorIngredientes,
    buscarPorTipoComida

}
