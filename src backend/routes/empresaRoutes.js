const express = require('express');

const {
    criarEmpresa,
    listarEmpresas,
    buscarEmpresa,
    atualizarEmpresa,
    excluirEmpresa
} = require('../controllers/empresaController');

const router = express.Router();

router.post('/', criarEmpresa);
router.get('/', listarEmpresas);
router.get('/:id', buscarEmpresa);
router.put('/:id', atualizarEmpresa);
router.delete('/:id', excluirEmpresa);

module.exports = router;