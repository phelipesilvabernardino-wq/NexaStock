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

/**
 * @swagger
 * tags:
 *   name: Estoque
 *   description: Cadastro e gerenciamento de produtos em estoque
 */

/**
 * @swagger
 * /estoque:
 *   post:
 *     summary: Cadastra um novo produto no estoque
 *     tags: [Estoque]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - produto
 *               - categoria
 *               - quantidade
 *               - valor
 *             properties:
 *               produto:
 *                 type: string
 *                 example: Caneta azul
 *               categoria:
 *                 type: string
 *                 example: Material de escritorio
 *               quantidade:
 *                 type: integer
 *                 example: 50
 *               valor:
 *                 type: number
 *                 format: float
 *                 example: 2.50
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Produto cadastrado com sucesso
 *       401:
 *         description: Token ausente ou invalido
 */
router.post('/', autenticar, criarEstoque);

/**
 * @swagger
 * /estoque:
 *   get:
 *     summary: Lista os produtos em estoque da empresa autenticada
 *     tags: [Estoque]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *       401:
 *         description: Token ausente ou invalido
 */
router.get('/', autenticar, listarEstoques);

/**
 * @swagger
 * /estoque/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     tags: [Estoque]
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
 *         description: Produto encontrado
 *       404:
 *         description: Produto nao encontrado
 */
router.get('/:id', autenticar, buscarEstoque);

/**
 * @swagger
 * /estoque/{id}:
 *   put:
 *     summary: Atualiza um produto do estoque
 *     tags: [Estoque]
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
 *               produto:
 *                 type: string
 *               categoria:
 *                 type: string
 *               quantidade:
 *                 type: integer
 *               valor:
 *                 type: number
 *                 format: float
 *               status:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto nao encontrado
 */
router.put('/:id', autenticar, atualizarEstoque);

/**
 * @swagger
 * /estoque/{id}:
 *   delete:
 *     summary: Exclui um produto do estoque
 *     tags: [Estoque]
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
 *         description: Produto excluido com sucesso
 *       404:
 *         description: Produto nao encontrado
 */
router.delete('/:id', autenticar, excluirEstoque);

module.exports = router;
