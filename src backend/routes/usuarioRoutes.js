const express = require('express');

const autenticar = require('../middlewares/authMiddleware');

const {
    criarUsuario,
    listarUsuarios,
    buscarUsuario,
    atualizarUsuario,
    excluirUsuario
} = require('../controllers/usuarioController');

const router = express.Router();

router.post('/', autenticar, criarUsuario);
router.get('/', autenticar, listarUsuarios);
router.get('/:id', autenticar, buscarUsuario);
router.put('/:id', autenticar, atualizarUsuario);
router.delete('/:id', autenticar, excluirUsuario);

module.exports = router;