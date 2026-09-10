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

/**
 * @swagger
 * tags:
 *   name: Fornecedor
 *   description: Cadastro e gerenciamento de fornecedores
 */

/**
 * @swagger
 * /fornecedores:
 *   post:
 *     summary: Cadastra um novo fornecedor
 *     tags: [Fornecedor]
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
 *               - cnpj
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Fornecedor XYZ
 *               cnpj:
 *                 type: string
 *                 example: "12345678000199"
 *               contato:
 *                 type: string
 *                 example: "(11) 99999-0000"
 *               email:
 *                 type: string
 *                 example: contato@fornecedorxyz.com
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Fornecedor cadastrado com sucesso
 *       401:
 *         description: Token ausente ou invalido
 */
router.post('/', autenticar, criarFornecedor);

/**
 * @swagger
 * /fornecedores:
 *   get:
 *     summary: Lista os fornecedores da empresa autenticada
 *     tags: [Fornecedor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fornecedores
 *       401:
 *         description: Token ausente ou invalido
 */
router.get('/', autenticar, listarFornecedores);

/**
 * @swagger
 * /fornecedores/{id}:
 *   get:
 *     summary: Busca um fornecedor pelo ID
 *     tags: [Fornecedor]
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
 *         description: Fornecedor encontrado
 *       404:
 *         description: Fornecedor nao encontrado
 */
router.get('/:id', autenticar, buscarFornecedor);

/**
 * @swagger
 * /fornecedores/{id}:
 *   put:
 *     summary: Atualiza um fornecedor
 *     tags: [Fornecedor]
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
 *               cnpj:
 *                 type: string
 *               contato:
 *                 type: string
 *               email:
 *                 type: string
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Fornecedor atualizado com sucesso
 *       404:
 *         description: Fornecedor nao encontrado
 */
router.put('/:id', autenticar, atualizarFornecedor);

/**
 * @swagger
 * /fornecedores/{id}:
 *   delete:
 *     summary: Exclui um fornecedor
 *     tags: [Fornecedor]
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
 *         description: Fornecedor excluido com sucesso
 *       404:
 *         description: Fornecedor nao encontrado
 */
router.delete('/:id', autenticar, excluirFornecedor);

module.exports = router;
