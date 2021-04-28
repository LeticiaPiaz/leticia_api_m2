// importações
const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const config = require('../config/config');

/** FUNÇÕES AUXILIARES
 * criando a função para a criação do token do usuário
 */
 const createUserToken = (userId) => {
    return jwt.sign({ 
        id: userId }, 
        config.jwtPass,
        { expiresIn: config.jwtExpires });
};

// criando o endpoint para autenticar na API
router.post('/auth', (req,res) => {//OK
    const { login, senha } = req.body;
    if (!login || !senha) // testando se há dados
        return res.send({ error: 'Dados inválidos! '});
    Users.findOne({ login }, (err, data) => { // se tiver, verificando se existe o login 
        if (err)
            return res.send({ error: 'Erro ao buscar usuário!' });
        if (!data)
            return res.send({ error: 'Usuário não encontrado! '});
        // caso não ocorra nenhuma das situações acima comparar a senha informada com a senha salva
        bcrypt.compare(senha,data.senha, (err,same) => {
            // testando se as senhas não são iguais
            if (!same)
                return res.send({ error: 'Erro na autenticação!'});
            // se as senhas forem iguais
            // impedindo o retorno da senha
            data.senha = undefined;
            return res.send({ data, token: createUserToken(data.id) });
        });
    }).select('+senha');
});

// criando o endpoint para salvar usuário
router.post('/create',  async (req,res) => {//OK
    const { nome, sobrenome, nascimento, login, senha, dica_de_senha, cidade, estado } = req.body;
    if (!nome || !sobrenome || !nascimento || !login || !senha) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        // verificando se o login já está cadastrado
        if (await Users.findOne({ login }))
                return res.send({ error: 'Login já cadastrado! '});
        // se o usuário ainda nao for cadastrado
        const user = await Users.create(req.body);
        // impedindo o retorno da senha
        user.password = undefined;
        return res.status(201).send({ user, token: createUserToken(user.id) });
    }
    catch (err) {
        return res.send({ error: `Erro ao gravar o usuário: ${err}`})
    }
});

// criando o endpoint para alterar usuário
router.put('/update/:id', auth, async (req,res) => {
    // loginOld = await longin.Users.findOne(id);
    // loginOld = await login.Users.findById(req.params.id);
    // console.log(loginOld);
    const { nome, sobrenome, nascimento, login, senha, dica_de_senha, cidade, estado } = req.body;
    if (!nome || !sobrenome || !nascimento || !login || !senha) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        // verificando se há um novo login e se ouver verificando se já não está cadastrado
        // if (await loginOld != login){
            if (await Users.findOne({ login }))
                return res.send({ error: 'Login já cadastrado! '});
        // }
        // se o usuário não mudou o login ou ainda nao for cadastrado nenhum com aquele novo login
        const user = await Users.findByIdAndUpdate(req.params.id, req.body);
        // realizando uma nova busca após a alteração para obter o usuário com as alterações
        const userChanged = await Users.findById(req.params.id);
        userChanged.senha = undefined; // impedindo o retorno da senha
        return res.status(201).send({ userChanged});
    }
    catch (err) {
        return res.send({ error: `Erro ao atualizar o usuário: ${err}`})
    }     
});

// criando o endpoint para apagar usuário
router.delete('/delete/:id', auth, async (req,res) => {//OK
    try {
        await Users.findByIdAndDelete(req.params.id);
        return res.send({ error: 'Usuário removido com sucesso!' });
    }
    catch (err) {
        return res.send({ error: 'Erro ao remover usuário!' });
    }     
});

module.exports = router;