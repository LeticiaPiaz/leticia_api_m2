// importações
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// criação do 'schema' para o produto
const productSchema = new Schema({
    nome: { type: String, required: true},
    tipo: {type: String},
    marca: {type: String, required: true},
    preco: { type: String, required: true},
    foto: {type: String},
    created: { type: Date, default: Date.now }
});

// productSchema.pre('save', async function (next) {
//     let product = this;
//     // testando se o campo de foto foi modificado
//     if (!product.isModified('foto'))
//         return next();
    
// });

module.exports = mongoose.model('Product', productSchema);