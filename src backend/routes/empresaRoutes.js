const express = require('express');

const {
    criarEmpresa,
    listarEmpresas,
    buscarEmpresa,
    atualizarEmpresa,
    excluirEmpresa
} = require('../controllers/empresaController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Empresa
 *   description: Cadastro e gerenciamento de empresas
 */

/**
 * @swagger
 * /empresa:
 *   post:
 *     summary: Cria uma nova empresa
 *     tags: [Empresa]
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
 *                 example: Empresa Teste
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Empresa criada com sucesso
 *       400:
 *         description: Dados invalidos
 */
router.post('/', criarEmpresa);

/**
 * @swagger
 * /empresa:
 *   get:
 *     summary: Lista todas as empresas
 *     tags: [Empresa]
 *     responses:
 *       200:
 *         description: Lista de empresas
 */
router.get('/', listarEmpresas);

/**
 * @swagger
 * /empresa/{id}:
 *   get:
 *     summary: Busca uma empresa pelo ID
 *     tags: [Empresa]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empresa encontrada
 *       404:
 *         description: Empresa nao encontrada
 */
router.get('/:id', buscarEmpresa);

/**
 * @swagger
 * /empresa/{id}:
 *   put:
 *     summary: Atualiza uma empresa
 *     tags: [Empresa]
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
 *         description: Empresa atualizada com sucesso
 *       404:
 *         description: Empresa nao encontrada
 */
router.put('/:id', atualizarEmpresa);

/**
 * @swagger
 * /empresa/{id}:
 *   delete:
 *     summary: Exclui uma empresa
 *     tags: [Empresa]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empresa excluida com sucesso
 *       404:
 *         description: Empresa nao encontrada
 */
router.delete('/:id', excluirEmpresa);

module.exports = router;
