const ingredientesModel = require("../models/ingredienteModel");
const mongoose = require('mongoose');
const getTodos = async (req, res) => {    
    try {
        const ingredientes = await ingredientesModel.getTodos();
        res.json(ingredientes);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener los ingredientes' });
    }
}

const getById = async (req, res) => {
    const { id } = req.params;
    
   
    try {
        const ingrediente = await ingredientesModel.getById(id);

        if (ingrediente) {
            res.json(ingrediente);
        } else {
            res.status(404).json({ id, encontrado: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener el ingrediente' });
    }
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        await ingredientesModel.deleteById(id);
        res.status(200).json({ message: `Ingrediente con ID ${id} eliminado correctamente` });
    } catch (error) {
        res.status(404).json({ error: `Ingrediente con ID ${id} no encontrado` });
    }
};

const updateById = async (req, res) => {
    const { id } = req.params;

   
    try {
        const updatedIngrediente = await ingredientesModel.updateById(id, req.body);

        if (updatedIngrediente) {
            res.status(200).json({ message: `Ingrediente con ID ${id} actualizado correctamente`, updatedIngrediente });
        } else {
            res.status(404).json({ error: `Ingrediente con ID ${id} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al actualizar el ingrediente' });
    }
}

const add = async (req, res) => {
    try {
        const nuevoIngrediente = req.body; // Obtiene el ingrediente del cuerpo de la petición (req.body)
        const ingredientesActualizados = await ingredientesModel.add(nuevoIngrediente); // Llama a la función `add` de tu modelo
        res.status(201).json({
            message: 'Ingrediente agregado exitosamente',
            ingredientes: ingredientesActualizados // Retorna el array actualizado
        });
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error al agregar el ingrediente',
            error: error.message
        });
    }
}

// METODO ADD PARA AGREGAR MULTIPLES INGREDIENTES EN UNA SOLA PETICIÓN
/*const add = async (req, res) => {
    try {
        const nuevosIngredientes = req.body; // Obtiene el array de ingredientes del cuerpo de la petición
        const ingredientesActualizados = await Promise.all(
            nuevosIngredientes.map(async (nuevoIngrediente) => {
                return await ingredientesModel.add(nuevoIngrediente);
            })
        );
        
        res.status(201).json({
            message: 'Ingredientes agregados exitosamente',
            ingredientes: ingredientesActualizados // Retorna el array actualizado
        });
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error al agregar los ingredientes',
            error: error.message
        });
    }
}
*/

module.exports = {
    getTodos,
    getById,
    deleteById,
    updateById,
    add
}
