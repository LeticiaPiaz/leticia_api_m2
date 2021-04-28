// importações
const express = require('express');
const router = express.Router();
const products = require('../models/product');
const auth = require('../middlewares/auth');

// criando o endpoint para listar todo os produtos
router.get('/', async (req,res) => {
    try {
        // criando um objeto para receber os produtos
        const products = await products.find({});
        return res.send(products);
    }
    catch (err) {
        return res.status(500).send({ error: 'Erro na busca dos produtos!' });
    }
});

// criando o endpoint para salvar produtos
router.post('/create',  async (req,res) => {
    const { nome, tipo, marca, preco, foto } = req.body;
    if (!nome || !marca || !preco) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    if (preco >= 0)
        return res.send({ error: 'O preço não pode ser zero ou menor que 0!'})
    try {
        const product = await products.create(req.body);
    }catch (err) {
        return res.send({ error: `Erro ao gravar o produtos: ${err}`})
    }
});

// criando o endpoint para alterar produto
router.put('/update/:id', auth, async (req,res) => {
    const { nome, tipo, marca, preco, foto } = req.body;
    if (!nome || !marca || !preco) 
        return res.send({ error: 'Verifique se todos os campos obrigatórios foram informados! '});
    try {
        const user = await products.findByIdAndUpdate(req.params.id, req.body); // Faz um WHERE**
        // realizando uma nova busca após a alteração para obter o produto com as alterações
        const userChanged = await products.findById(req.params.id);
        return res.status(201).send({ userChanged});
    }catch (err) {
        return res.send({ error: `Erro ao atualizar o produto: ${err}`})
    }     
});

// criando o endpoint para apagar produto
router.delete('/delete/:id', auth, async (req,res) => {
    try {
        await products.findByIdAndDelete(req.params.id);
        return res.send({ error: 'Produto removido com sucesso!' });
    }
    catch (err) {
        return res.send({ error: `Erro ao remover o produto: ${err}` });
    }     
});

module.exports = router;