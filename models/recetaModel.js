const mongoose = require('mongoose');
const { Ingrediente } = require('../models/ingredienteModel'); // Ajusta esta ruta según tu estructura de carpetas
// Esquema de receta
const recetaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipoComida: { 
        type: String, 
        enum: ['Entradas', 'Platos principales', 'Postres', 'Aperitivos', 'Sopas', 'Ensaladas', 'Bebidas'], 
        required: true 
    },
    tipoCocina: { 
        type: String, 
        enum: ['Cocina Italiana', 'Cocina Mexicana', 'Cocina China', 'Cocina Japonesa', 'Cocina India', 'Cocina Mediterránea', 'Cocina Francesa'], 
        required: true 
    },
    ingredientes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingrediente', required: true }], // Referencia a ingredientes
    metodoCoccion: { 
        type: String, 
        enum: ['Al horno', 'A la parrilla', 'A la plancha', 'Frito', 'Hervido', 'Al vapor', 'Crudo'], 
        required: true 
    },
    tiempoPreparacion: { 
        type: String, 
        enum: ['Menos de 15 minutos', 'Entre 15 y 30 minutos', 'Entre 30 minutos y 1 hora', 'Más de 1 hora'], 
        required: true 
    },
    nivelDificultad: { 
        type: String, 
        enum: ['Fácil', 'Intermedio', 'Difícil'], 
        required: true 
    },
    ingredientePrincipal: { 
        type: String, 
        enum: ['Carne', 'Pollo', 'Pescado', 'Verduras', 'Frutas', 'Granos', 'Mariscos'], 
        required: true 
    },
    temporada: { 
        type: String, 
        enum: ['Verano', 'Invierno', 'Primavera', 'Otoño'], 
        required: false 
    },
    foto: { type: String, required: true }
}, { versionKey: false });

const Receta = mongoose.model('Receta', recetaSchema);

const verificarIngredientesExistentes = async (ingredientesIds) => {
    console.log("aca si")
        const ingredientes = await Ingrediente.find({ _id: { $in: ingredientesIds } });
        console.log("aca no")
    return ingredientes.length === ingredientesIds.length; // Retorna true si todos existen
};

// CRUD
const getAll = async () => {
    return await Receta.find();
}
const getById = async (id) => {
    return await Receta.findById(id);
}
const deleteById = async (id) => {
    return await Receta.findByIdAndDelete(id);
}
const updateById = async (id, recetaActualizada) => {
    // Verificar si todos los ingredientes existen
    const existen = await verificarIngredientesExistentes(recetaActualizada.ingredientes);
    if (!existen) {
        throw new Error('Uno o más ingredientes no existen en la base de datos');
    }

    return await Receta.findByIdAndUpdate(id, recetaActualizada, { new: true });
}
const add = async (nuevaReceta) => {
    // Verificar si todos los ingredientes existen
    const existen = await verificarIngredientesExistentes(nuevaReceta.ingredientes);
    if (!existen) {
        throw new Error('Uno o más ingredientes no existen en la base de datos');
    }
    const receta = new Receta(nuevaReceta);
    return await receta.save();
};

// Exportar las funciones
module.exports = {
    getAll,
    getById,
    deleteById,
    updateById,
    add
}
