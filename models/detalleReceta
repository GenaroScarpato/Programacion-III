const mongoose = require('mongoose');

// Definición del esquema de DetalleReceta
const detalleRecetaSchema = new mongoose.Schema({
    receta: {   type: mongoose.Schema.Types.ObjectId, ref: 'Receta', required: true },
    ingrediente: { type: mongoose.Schema.Types.ObjectId,  ref: 'Ingrediente',  required: true    },
    cantidad: {  type: Number,  required: true   }
}, { versionKey: false });

// Modelo de DetalleReceta
const DetalleReceta = mongoose.model('DetalleReceta', detalleRecetaSchema);

module.exports = DetalleReceta;
