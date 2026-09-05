const Estoque = require('../models/Estoque');


// CREATE
async function criarEstoque(req, res) {
    try {
        const {
            produto,
            categoria,
            quantidade,
            valor,
            status
        } = req.body;

        // Empresa vem do JWT
        const empresa_id = req.usuario.empresa_id;

        const estoque = await Estoque.create({
            empresa_id,
            produto,
            categoria,
            quantidade: Number(quantidade),
            valor,
            status: status ?? true
        });

        res.status(201).json(estoque);

    } catch (erro) {
        console.error('ERRO AO CADASTRAR ESTOQUE:', erro);

        res.status(500).json({
            erro: 'Erro ao cadastrar produto no estoque',
            detalhe: erro.message
        });
    }
}


// READ - todos
async function listarEstoques(req, res) {
    try {
        // Empresa vem do JWT
        const empresa_id = req.usuario.empresa_id;

        const estoques = await Estoque.findAll({
            where: {
                empresa_id
            },
            order: [
                ['id', 'ASC']
            ]
        });

        res.json(estoques);

    } catch (erro) {
        console.error('ERRO AO LISTAR ESTOQUE:', erro);

        res.status(500).json({
            erro: 'Erro ao listar estoque',
            detalhe: erro.message
        });
    }
}


// READ - um
async function buscarEstoque(req, res) {
    try {
        const { id } = req.params;

        // Empresa vem do JWT
        const empresa_id = req.usuario.empresa_id;

        const estoque = await Estoque.findOne({
            where: {
                id: Number(id),
                empresa_id
            }
        });

        if (!estoque) {
            return res.status(404).json({
                erro: 'Produto não encontrado no estoque'
            });
        }

        res.json(estoque);

    } catch (erro) {
        console.error('ERRO AO BUSCAR ESTOQUE:', erro);

        res.status(500).json({
            erro: 'Erro ao buscar produto',
            detalhe: erro.message
        });
    }
}


// UPDATE
async function atualizarEstoque(req, res) {
    try {
        const { id } = req.params;

        const {
            produto,
            categoria,
            quantidade,
            valor,
            status
        } = req.body;

        // Empresa vem do JWT
        const empresa_id = req.usuario.empresa_id;

        const estoque = await Estoque.findOne({
            where: {
                id: Number(id),
                empresa_id
            }
        });

        if (!estoque) {
            return res.status(404).json({
                erro: 'Produto não encontrado no estoque'
            });
        }

        await estoque.update({
            produto,
            categoria,
            quantidade: Number(quantidade),
            valor,
            status
        });

        res.json(estoque);

    } catch (erro) {
        console.error('ERRO AO ATUALIZAR ESTOQUE:', erro);

        res.status(500).json({
            erro: 'Erro ao atualizar estoque',
            detalhe: erro.message
        });
    }
}


// DELETE
async function excluirEstoque(req, res) {
    try {
        const { id } = req.params;

        // Empresa vem do JWT
        const empresa_id = req.usuario.empresa_id;

        const estoque = await Estoque.findOne({
            where: {
                id: Number(id),
                empresa_id
            }
        });

        if (!estoque) {
            return res.status(404).json({
                erro: 'Produto não encontrado no estoque'
            });
        }

        await estoque.destroy();

        res.json({
            mensagem: 'Produto removido do estoque com sucesso',
            estoque
        });

    } catch (erro) {
        console.error('ERRO AO EXCLUIR ESTOQUE:', erro);

        res.status(500).json({
            erro: 'Erro ao excluir produto do estoque',
            detalhe: erro.message
        });
    }
}


module.exports = {
    criarEstoque,
    listarEstoques,
    buscarEstoque,
    atualizarEstoque,
    excluirEstoque
};