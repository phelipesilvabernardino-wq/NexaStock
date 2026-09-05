const Fornecedor = require('../models/Fornecedor');


// CREATE
async function criarFornecedor(req, res) {
    try {
        const {
            nome,
            cnpj,
            contato,
            email,
            status
        } = req.body;

        // A empresa vem do JWT
        const empresa_id = req.usuario.empresa_id;

        if (!nome) {
            return res.status(400).json({
                erro: 'Nome do fornecedor é obrigatório'
            });
        }

        const fornecedor = await Fornecedor.create({
            empresa_id,
            nome,
            cnpj,
            contato,
            email,
            status: status ?? true
        });

        res.status(201).json(fornecedor);

    } catch (erro) {
        console.error('ERRO AO CADASTRAR FORNECEDOR:', erro);

        res.status(500).json({
            erro: 'Erro ao cadastrar fornecedor',
            detalhe: erro.message
        });
    }
}


// READ - todos os fornecedores da empresa
async function listarFornecedores(req, res) {
    try {
        const empresa_id = req.usuario.empresa_id;

        const fornecedores = await Fornecedor.findAll({
            where: {
                empresa_id
            },
            order: [
                ['id', 'ASC']
            ]
        });

        res.json(fornecedores);

    } catch (erro) {
        console.error('ERRO AO LISTAR FORNECEDORES:', erro);

        res.status(500).json({
            erro: 'Erro ao listar fornecedores',
            detalhe: erro.message
        });
    }
}


// READ - um fornecedor da empresa
async function buscarFornecedor(req, res) {
    try {
        const { id } = req.params;

        const empresa_id = req.usuario.empresa_id;

        const fornecedor = await Fornecedor.findOne({
            where: {
                id: Number(id),
                empresa_id
            }
        });

        if (!fornecedor) {
            return res.status(404).json({
                erro: 'Fornecedor não encontrado'
            });
        }

        res.json(fornecedor);

    } catch (erro) {
        console.error('ERRO AO BUSCAR FORNECEDOR:', erro);

        res.status(500).json({
            erro: 'Erro ao buscar fornecedor',
            detalhe: erro.message
        });
    }
}


// UPDATE
async function atualizarFornecedor(req, res) {
    try {
        const { id } = req.params;

        const {
            nome,
            cnpj,
            contato,
            email,
            status
        } = req.body;

        const empresa_id = req.usuario.empresa_id;

        if (!nome) {
            return res.status(400).json({
                erro: 'Nome do fornecedor é obrigatório'
            });
        }

        const fornecedor = await Fornecedor.findOne({
            where: {
                id: Number(id),
                empresa_id
            }
        });

        if (!fornecedor) {
            return res.status(404).json({
                erro: 'Fornecedor não encontrado'
            });
        }

        await fornecedor.update({
            nome,
            cnpj,
            contato,
            email,
            status
        });

        res.json(fornecedor);

    } catch (erro) {
        console.error('ERRO AO ATUALIZAR FORNECEDOR:', erro);

        res.status(500).json({
            erro: 'Erro ao atualizar fornecedor',
            detalhe: erro.message
        });
    }
}


// DELETE
async function excluirFornecedor(req, res) {
    try {
        const { id } = req.params;

        const empresa_id = req.usuario.empresa_id;

        const fornecedor = await Fornecedor.findOne({
            where: {
                id: Number(id),
                empresa_id
            }
        });

        if (!fornecedor) {
            return res.status(404).json({
                erro: 'Fornecedor não encontrado'
            });
        }

        await fornecedor.destroy();

        res.json({
            mensagem: 'Fornecedor excluído com sucesso',
            fornecedor
        });

    } catch (erro) {
        console.error('ERRO AO EXCLUIR FORNECEDOR:', erro);

        res.status(500).json({
            erro: 'Erro ao excluir fornecedor',
            detalhe: erro.message
        });
    }
}


module.exports = {
    criarFornecedor,
    listarFornecedores,
    buscarFornecedor,
    atualizarFornecedor,
    excluirFornecedor
};