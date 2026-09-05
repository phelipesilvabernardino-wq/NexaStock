const express = require('express');

const {
    loginEmpresa,
    loginUsuario
} = require('../controllers/loginUserController');

const router = express.Router();

router.post('/empresa', loginEmpresa);
router.post('/usuario', loginUsuario);

module.exports = router;