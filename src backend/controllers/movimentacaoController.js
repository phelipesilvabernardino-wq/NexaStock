const Movimentacao = require('../models/Movimentacao');
const Estoque = require('../models/Estoque');
const Usuario = require('../models/Usuario');
const sequelize = require('../config/db');


// CREATE
async function criarMovimentacao(req, res) {
    const transaction = await sequelize.transaction();

    try {
        const {
            estoque_id,
            tipo,
            descricao,
            data,
            quantidade,
            usuario_id
        } = req.body;

        const empresa_id = req.usuario.empresa_id;

        if (!estoque_id || !tipo || !quantidade || !usuario_id) {
            await transaction.rollback();

            return res.status(400).json({
                erro: 'Preencha todos os campos obrigatórios'
            });
        }

        const quantidadeMovimentacao = Number(quantidade);

        if (quantidadeMovimentacao <= 0) {
            await transaction.rollback();

            return res.status(400).json({
                erro: 'A quantidade deve ser maior que zero'
            });
        }


        // VERIFICA SE O ESTOQUE PERTENCE À EMPRESA
        const estoque = await Estoque.findOne({
            where: {
                id: Number(estoque_id),
                empresa_id
            },
            transaction
        });

        if (!estoque) {
            await transaction.rollback();

            return res.status(404).json({
                erro: 'Produto não encontrado no estoque da empresa'
            });
        }


        // VERIFICA SE O USUÁRIO PERTENCE À EMPRESA
        const usuario = await Usuario.findOne({
            where: {
                id: Number(usuario_id),
                empresa_id
            },
            transaction
        });

        if (!usuario) {
            await transaction.rollback();

            return res.status(404).json({
                erro: 'Usuário não pertence à empresa'
            });
        }


        // VERIFICA O TIPO DA MOVIMENTAÇÃO
        if (tipo !== 'entrada' && tipo !== 'saida') {
            await transaction.rollback();

            return res.status(400).json({
                erro: 'Tipo de movimentação deve ser entrada ou saida'
            });
        }


        // ENTRADA
        if (tipo === 'entrada') {
            estoque.quantidade =
                Number(estoque.quantidade) +
                quantidadeMovimentacao;
        }


        // SAÍDA
        if (tipo === 'saida') {

            if (
                Number(estoque.quantidade) <
                quantidadeMovimentacao
            ) {
                await transaction.rollback();

                return res.status(400).json({
                    erro: 'Quantidade insuficiente em estoque',
                    estoque_atual: Number(estoque.quantidade),
                    quantidade_solicitada: quantidadeMovimentacao
                });
            }

            estoque.quantidade =
                Number(estoque.quantidade) -
                quantidadeMovimentacao;
        }


        // SALVA O NOVO ESTOQUE
        await estoque.save({
            transaction
        });


        // CRIA A MOVIMENTAÇÃO
        const movimentacao = await Movimentacao.create(
            {
                empresa_id,
                estoque_id: Number(estoque_id),
                tipo,
                descricao,
                data: data ? new Date(data) : new Date(),
                quantidade: quantidadeMovimentacao,
                usuario_id: Number(usuario_id)
            },
            {
                transaction
            }
        );


        // CONFIRMA TUDO
        await transaction.commit();


        res.status(201).json({
            mensagem: 'Movimentação realizada com sucesso',

            movimentacao,

            estoque: {
                id: estoque.id,
                produto: estoque.produto,
                quantidade: estoque.quantidade
            }
        });

    } catch (erro) {

        await transaction.rollback();

        console.error(
            'ERRO AO CADASTRAR MOVIMENTAÇÃO:',
            erro
        );

        res.status(500).json({
            erro: 'Erro ao cadastrar movimentação',
            detalhe: erro.message
        });
    }
}


// READ - todas
async function listarMovimentacoes(req, res) {
    try {
        const empresa_id = req.usuario.empresa_id;

        const movimentacoes = await Movimentacao.findAll({
            where: {
                empresa_id
            },
            order: [
                ['id', 'ASC']
            ]
        });

        res.json(movimentacoes);

    } catch (erro) {
        console.error(
            'ERRO AO LISTAR MOVIMENTAÇÕES:',
            erro
        );

        res.status(500).json({
            erro: 'Erro ao listar movimentações',
            detalhe: erro.message
        });
    }
}


// READ - uma
async function buscarMovimentacao(req, res) {
    try {
        const { id } = req.params;

        const empresa_id = req.usuario.empresa_id;

        const movimentacao = await Movimentacao.findOne({
            where: {
                id: Number(id),
                empresa_id
            }
        });

        if (!movimentacao) {
            return res.status(404).json({
                erro: 'Movimentação não encontrada'
            });
        }

        res.json(movimentacao);

    } catch (erro) {
        console.error(
            'ERRO AO BUSCAR MOVIMENTAÇÃO:',
            erro
        );

        res.status(500).json({
            erro: 'Erro ao buscar movimentação',
            detalhe: erro.message
        });
    }
}


// UPDATE
async function atualizarMovimentacao(req, res) {
    try {
        const { id } = req.params;

        const {
            estoque_id,
            tipo,
            descricao,
            data,
            quantidade,
            usuario_id
        } = req.body;

        const empresa_id = req.usuario.empresa_id;

        const movimentacao = await Movimentacao.findOne({
            where: {
                id: Number(id),
                empresa_id
            }
        });

        if (!movimentacao) {
            return res.status(404).json({
                erro: 'Movimentação não encontrada'
            });
        }

        const estoque = await Estoque.findOne({
            where: {
                id: Number(estoque_id),
                empresa_id
            }
        });

        if (!estoque) {
            return res.status(404).json({
                erro: 'Estoque não encontrado'
            });
        }

        const usuario = await Usuario.findOne({
            where: {
                id: Number(usuario_id),
                empresa_id
            }
        });

        if (!usuario) {
            return res.status(404).json({
                erro: 'Usuário não pertence à empresa'
            });
        }

        await movimentacao.update({
            estoque_id: Number(estoque_id),
            tipo,
            descricao,
            data: data ? new Date(data) : movimentacao.data,
            quantidade: Number(quantidade),
            usuario_id: Number(usuario_id)
        });

        res.json(movimentacao);

    } catch (erro) {
        console.error(
            'ERRO AO ATUALIZAR MOVIMENTAÇÃO:',
            erro
        );

        res.status(500).json({
            erro: 'Erro ao atualizar movimentação',
            detalhe: erro.message
        });
    }
}


// DELETE
async function excluirMovimentacao(req, res) {
    try {
        const { id } = req.params;

        const empresa_id = req.usuario.empresa_id;

        const movimentacao = await Movimentacao.findOne({
            where: {
                id: Number(id),
                empresa_id
            }
        });

        if (!movimentacao) {
            return res.status(404).json({
                erro: 'Movimentação não encontrada'
            });
        }

        await movimentacao.destroy();

        res.json({
            mensagem: 'Movimentação excluída com sucesso',
            movimentacao
        });

    } catch (erro) {
        console.error(
            'ERRO AO EXCLUIR MOVIMENTAÇÃO:',
            erro
        );

        res.status(500).json({
            erro: 'Erro ao excluir movimentação',
            detalhe: erro.message
        });
    }
}


module.exports = {
    criarMovimentacao,
    listarMovimentacoes,
    buscarMovimentacao,
    atualizarMovimentacao,
    excluirMovimentacao
};