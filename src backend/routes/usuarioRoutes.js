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

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Cadastro e gerenciamento de usuarios de uma empresa
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuario (requer autenticacao da empresa)
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: usuarioteste
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuario criado com sucesso
 *       401:
 *         description: Token ausente ou invalido
 */
router.post('/', autenticar, criarUsuario);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista os usuarios da empresa autenticada
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: Token ausente ou invalido
 */
router.get('/', autenticar, listarUsuarios);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um usuario pelo ID
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario nao encontrado
 */
router.get('/:id', autenticar, buscarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuario
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario atualizado com sucesso
 *       404:
 *         description: Usuario nao encontrado
 */
router.put('/:id', autenticar, atualizarUsuario);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Exclui um usuario
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario excluido com sucesso
 *       404:
 *         description: Usuario nao encontrado
 */
router.delete('/:id', autenticar, excluirUsuario);

module.exports = router;
