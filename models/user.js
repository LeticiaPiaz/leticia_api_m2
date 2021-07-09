// importações
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// criação do 'schema' para o usuário
const userSchema = new Schema({
    name: { type: String, required: true},
    userName: { type: String, required: true, unique: true},
    email: { type: String, required: true},
    phone: { type: String, required: true},
    password: { type: String, required: true, select: false},
    created: { type: Date, default: Date.now }
});

// criando uma nova função para preparar os campos
userSchema.pre('save', async function (next) {
    let user = this;
    // testando se o campo de password foi modificado
    if (!user.isModified('password'))
        return next();
    // criando o hash para o campo password
    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

module.exports = mongoose.model('User', userSchema);