const mongoose = require('mongoose');
const { Ingrediente } = require('../models/ingredienteModel');

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
        enum: ['Cocina Italiana', 'Cocina Mexicana', 'Cocina China', 'Cocina Japonesa', 'Cocina India', 'Cocina Mediterránea', 'Cocina Francesa','Cocina Española'], 
        required: true 
    },
    ingredientes: [
        {
            ingrediente: {  type: mongoose.Schema.Types.ObjectId,  ref: 'Ingrediente', required: true },
            cantidad: {   type: Number, required: true },
            unidad: {  type: String, enum: ['unidades', 'gramos', 'ml', 'tazas', 
                                             'cucharadas', 'kg','lt'], required: true }}
    ],
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
        enum: ['Verano', 'Invierno', 'Primavera', 'Otoño', 'Todo el año'], 
        required: false 
    },
    foto: { type: String, required: true }
}, { versionKey: false });

const Receta = mongoose.model('Receta', recetaSchema);

// Función para verificar la existencia de ingredientes
const verificarIngredientesExistentes = async (ingredientes) => {
    const ids = ingredientes.map(item => item.ingrediente);
    const ingredientesExistentes = await Ingrediente.find({ _id: { $in: ids } });
    return ingredientesExistentes.length === ids.length;
};

// CRUD
const getAll = async () => {
    return await Receta.find().populate({
        path: 'ingredientes.ingrediente',
        select: 'nombre '
    })
};



const getById = async (id) => {
    return await Receta.findById(id)
        .populate({
            path: 'ingredientes.ingrediente',
            select: 'nombre '
        });
};

const deleteById = async (id) => {
    return await Receta.findByIdAndDelete(id);
};

const updateById = async (id, recetaActualizada) => {
    const existen = await verificarIngredientesExistentes(recetaActualizada.ingredientes);
    if (!existen) {
        throw new Error('Uno o más ingredientes no existen en la base de datos');
    }
    return await Receta.findByIdAndUpdate(id, recetaActualizada, { new: true })
        .populate({
            path: 'ingredientes.ingrediente',
            select: 'nombre -_id'
        });
};

const add = async (nuevaReceta) => {
    // Verifica si ya existe una receta con el mismo nombre
    const recetaExistente = await Receta.findOne({ nombre: nuevaReceta.nombre });
    if (recetaExistente) {
        throw new Error(`La receta ${nuevaReceta.nombre} ya existe`);
    }

    const existen = await verificarIngredientesExistentes(nuevaReceta.ingredientes);
    if (!existen) {
        throw new Error('Uno o más ingredientes no existen en la base de datos');
    }

    const receta = new Receta(nuevaReceta);
    return await receta.save();
};


const buscarPorIngredientes = async (ingredientesId) => {
    return await Receta.find({
        'ingredientes.ingrediente': { $all: ingredientesId }  // Buscamos si los ingredientes están en el array
    })
    .populate({
        path: 'ingredientes.ingrediente',  // Especificamos que se debe poblar la referencia al ingrediente
        select: 'nombre'  // Solo seleccionamos el nombre del ingrediente
 });
};

const buscarPorTipoComida = async (tiposComida) => {
    return await Receta.find({
        tipoComida: { $in: tiposComida }  // Busca recetas que coincidan con cualquier tipo de comida en el array
    }).populate({
        path: 'ingredientes.ingrediente',
        select: 'nombre'
    });
};



// Exportar las funciones
module.exports = {
    getAll,
    getById,
    deleteById,
    updateById,
    add,
    buscarPorIngredientes,
    buscarPorTipoComida
};
