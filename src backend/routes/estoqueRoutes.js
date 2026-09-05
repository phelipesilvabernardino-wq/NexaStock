const express = require('express');

const autenticar = require('../middlewares/authMiddleware');

const {
    criarEstoque,
    listarEstoques,
    buscarEstoque,
    atualizarEstoque,
    excluirEstoque
} = require('../controllers/estoqueController');

const router = express.Router();

router.post('/', autenticar, criarEstoque);
router.get('/', autenticar, listarEstoques);
router.get('/:id', autenticar, buscarEstoque);
router.put('/:id', autenticar, atualizarEstoque);
router.delete('/:id', autenticar, excluirEstoque);

module.exports = router;