const mongoose = require('mongoose');

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
    dieta: { 
        type: String, 
        enum: ['Vegetariana', 'Vegana', 'Sin gluten', 'Baja en carbohidratos', 'Keto', 'Paleo', 'Sin lactosa'], 
        required: false 
    },
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
    ocasionEspecial: { 
        type: String, 
        enum: ['Cumpleaños', 'Navidad', 'Año Nuevo', 'Pascuas', 'Día de San Valentín', 'Fiesta de compromiso'], 
        required: false 
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
    foto: { type: String, required: true }, // Para almacenar la URL de la foto de la receta
}, { versionKey: false });

const Receta = mongoose.model('Receta', recetaSchema);

// Funciones para manejar las recetas

const getTodas = async () => {
    return await Receta.find();
}

const getById = async (id) => {
    return await Receta.findById(id);
}

const deleteById = async (id) => {
    return await Receta.findByIdAndDelete(id);
}

const updateById = async (id, recetaActualizada) => {
    return await Receta.findByIdAndUpdate(id, recetaActualizada, { new: true });
}

const add = async (nuevaReceta) => {
    const receta = new Receta(nuevaReceta);
    return await receta.save();
};

// Exportar las funciones
module.exports = {
    getTodas,
    getById,
    deleteById,
    updateById,
    add
}
