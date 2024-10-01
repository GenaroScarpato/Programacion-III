const { Console } = require("console");
const ingredientesModel = require("../models/ingredientesFake");

const getTodos = (req, res) => {    
    res.json( ingredientesModel.getTodos() );
}

const getById = (req, res) => {
    let {id} = req.params;
    const idEntero = parseInt(id);

    const ingrediente = ingredientesModel.getById(idEntero);

    //res.send(`El id es ${id}`)
    if (ingrediente) {
        res.json(ingrediente);
    } else {
        res.status(404).json({
            id,
            encontrado: false
        });
    }
}

const deleteById = (req, res) => {
    let { id } = req.params;
    const idEntero = parseInt(id);

    // Verifica si el ID es un número válido
    if (isNaN(idEntero)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    // Intenta eliminar el ingrediente por ID
    const deleted = ingredientesModel.deleteById(idEntero);
    

    if (deleted) {
        return res.status(200).json({ message: `Ingrediente con ID ${idEntero} eliminado correctamente` });
    } else {
        return res.status(404).json({ error: `Ingrediente con ID ${idEntero} no encontrado` });
    }
};


const updateById = (req, res) => {
    // TODO...
}
const add = (req, res) => {
    // TODO...
}

module.exports = {
    getTodos,
    getById,
    deleteById,
    updateById,
    add
}