// importações
const express = require('express');
const router = express.Router();
const stores = require('../models/store');
const auth = require('../middlewares/auth');

// criando o endpoint para listar todo os lojas
router.get('/', async (req,res) => {
    try {
        // criando um objeto para receber os lojas
        const stores = await stores.find({});
        return res.send(stores);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na busca dos lojas!' });
    }
});

// criando o endpoint para salvar lojas
router.post('/create',  async (req,res) => {
    const { nome, site, tipo, cidade, estado } = req.body;
    if (!nome || !site)
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados!'});
    try {
        // verificando se o site já está cadastrado
        if (await Users.findOne({ site }))
            return res.send({ error: 'Site já cadastrado!'});
        // se o site ainda nao for cadastrado
        const store = await stores.create(req.body);
    }catch (err) {
        return res.send({ error: `Erro ao gravar o lojas: ${err}`})
    }
});

// criando o endpoint para alterar loja
router.put('/update/:id', auth, async (req,res) => {
    siteOld = site.Users.findOne(id);
    const { nome, site, tipo, cidade, estado } = req.body;
    if (!nome || !site)
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        // verificando se o site já está cadastrado
        if (await siteOld != site){
            if (await stores.findOne({ site }))
            return res.send({ error: 'Site já cadastrado! '});
        }
        // se o site ainda nao for cadastrado
        const user = await stores.findByIdAndUpdate(req.params.id, req.body); // Faz um WHERE**
        // realizando uma nova busca após a alteração para obter o loja com as alterações
        const userChanged = await stores.findById(req.params.id);
        // impedindo o retorno da senha
        userChanged.password = undefined;
        return res.status(201).send({ userChanged});
    }catch (err) {
        return res.send({ error: `Erro ao atualizar o loja: ${err}`})
    }     
});

module.exports = router;