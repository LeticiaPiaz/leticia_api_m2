// importações
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// criação do 'schema' para o produto
const storeSchema = new Schema({
    nome: { type: String, required: true},
    site: {type: String, required: true, unique: true},
    tipo: {type: String},
    cidade: { type: String},
    estado: { type: String},
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Store', storeSchema);