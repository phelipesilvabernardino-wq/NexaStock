const express = require('express');

const autenticar = require('../middlewares/authMiddleware');

const {
    criarFornecedor,
    listarFornecedores,
    buscarFornecedor,
    atualizarFornecedor,
    excluirFornecedor
} = require('../controllers/fornecedoresController');

const router = express.Router();

router.post('/', autenticar, criarFornecedor);
router.get('/', autenticar, listarFornecedores);
router.get('/:id', autenticar, buscarFornecedor);
router.put('/:id', autenticar, atualizarFornecedor);
router.delete('/:id', autenticar, excluirFornecedor);

module.exports = router;