const express = require('express');

const {
    loginEmpresa,
    loginUsuario
} = require('../controllers/loginUserController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Login
 *   description: Autenticacao de empresas e usuarios
 */

/**
 * @swagger
 * /login/empresa:
 *   post:
 *     summary: Realiza login como empresa (administrador) e retorna um token JWT
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - empresa_id
 *               - senha
 *             properties:
 *               empresa_id:
 *                 type: integer
 *                 example: 1
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna o token JWT
 *       401:
 *         description: Empresa ou senha invalida
 */
router.post('/empresa', loginEmpresa);

/**
 * @swagger
 * /login/usuario:
 *   post:
 *     summary: Realiza login como usuario comum e retorna um token JWT
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - empresa_id
 *               - nome
 *               - senha
 *             properties:
 *               empresa_id:
 *                 type: integer
 *                 example: 1
 *               nome:
 *                 type: string
 *                 example: usuarioteste
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna o token JWT
 *       401:
 *         description: Empresa, usuario ou senha invalida
 */
router.post('/usuario', loginUsuario);

module.exports = router;
