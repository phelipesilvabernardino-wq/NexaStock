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

/**
 * @swagger
 * tags:
 *   name: Movimentacao
 *   description: Registro de entradas e saidas do estoque
 */

/**
 * @swagger
 * /movimentacao:
 *   post:
 *     summary: Registra uma nova movimentacao de estoque
 *     tags: [Movimentacao]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estoque_id
 *               - tipo
 *               - quantidade
 *               - usuario_id
 *             properties:
 *               estoque_id:
 *                 type: integer
 *                 example: 1
 *               tipo:
 *                 type: string
 *                 example: entrada
 *               descricao:
 *                 type: string
 *                 example: Reposicao de estoque
 *               data:
 *                 type: string
 *                 format: date-time
 *               quantidade:
 *                 type: integer
 *                 example: 10
 *               usuario_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Movimentacao registrada com sucesso
 *       401:
 *         description: Token ausente ou invalido
 */
router.post('/', autenticar, criarMovimentacao);

/**
 * @swagger
 * /movimentacao:
 *   get:
 *     summary: Lista as movimentacoes da empresa autenticada
 *     tags: [Movimentacao]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de movimentacoes
 *       401:
 *         description: Token ausente ou invalido
 */
router.get('/', autenticar, listarMovimentacoes);

/**
 * @swagger
 * /movimentacao/{id}:
 *   get:
 *     summary: Busca uma movimentacao pelo ID
 *     tags: [Movimentacao]
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
 *         description: Movimentacao encontrada
 *       404:
 *         description: Movimentacao nao encontrada
 */
router.get('/:id', autenticar, buscarMovimentacao);

/**
 * @swagger
 * /movimentacao/{id}:
 *   put:
 *     summary: Atualiza uma movimentacao
 *     tags: [Movimentacao]
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
 *               estoque_id:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date-time
 *               quantidade:
 *                 type: integer
 *               usuario_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Movimentacao atualizada com sucesso
 *       404:
 *         description: Movimentacao nao encontrada
 */
router.put('/:id', autenticar, atualizarMovimentacao);

/**
 * @swagger
 * /movimentacao/{id}:
 *   delete:
 *     summary: Exclui uma movimentacao
 *     tags: [Movimentacao]
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
 *         description: Movimentacao excluida com sucesso
 *       404:
 *         description: Movimentacao nao encontrada
 */
router.delete('/:id', autenticar, excluirMovimentacao);

module.exports = router;
