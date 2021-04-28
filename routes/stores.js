// importações
const express = require('express');
const router = express.Router();
const Stores = require('../models/store');
const auth = require('../middlewares/auth');

// criando o endpoint para listar todo os lojas
router.get('/', async (req,res) => {//OK
    try {
        // criando um objeto para receber os lojas
        const stores = await Stores.find({});
        return res.send(stores);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na busca dos lojas!' });
    }
});

// criando o endpoint para salvar lojas
router.post('/create',  async (req,res) => {//OK
    const { nome, site, tipo, cidade, estado } = req.body;
    if (!nome || !site)
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados!'});
    try {
        // verificando se o site já está cadastrado
        if (await Stores.findOne({ site }))
            return res.send({ error: 'Site já cadastrado!'});
        // se o site ainda nao for cadastrado
        const store = await Stores.create(req.body);
    }catch (err) {
        return res.send({ error: `Erro ao gravar o lojas: ${err}`})
    }
});

// criando o endpoint para alterar loja
router.put('/update/:id', auth, async (req,res) => {//OK
    const { nome, site, tipo, cidade, estado } = req.body;
    if (!nome || !site)
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        // verificando se o site já está cadastrado
        if (await Stores.findOne({ site }))
        return res.send({ error: 'Site já cadastrado! '});
    
        // se o site ainda nao for cadastrado
        const user = await Stores.findByIdAndUpdate(req.params.id, req.body); // Faz um WHERE**
        // realizando uma nova busca após a alteração para obter o loja com as alterações
        const userChanged = await Stores.findById(req.params.id);
        // impedindo o retorno da senha
        userChanged.password = undefined;
        return res.status(201).send({ userChanged});
    }catch (err) {
        return res.send({ error: `Erro ao atualizar o loja: ${err}`})
    }     
});

module.exports = router;