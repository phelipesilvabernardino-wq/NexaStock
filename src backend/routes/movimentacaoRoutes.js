const express = require('express');

const autenticar = require('../middlewares/authMiddleware');

const {
    criarMovimentacao,
    listarMovimentacoes,
    buscarMovimentacao,
    atualizarMovimentacao,
    excluirMovimentacao
} = require('../controllers/movimentacaoController');

const router = express.Router();

router.post('/', autenticar, criarMovimentacao);
router.get('/', autenticar, listarMovimentacoes);
router.get('/:id', autenticar, buscarMovimentacao);
router.put('/:id', autenticar, atualizarMovimentacao);
router.delete('/:id', autenticar, excluirMovimentacao);

module.exports = router;