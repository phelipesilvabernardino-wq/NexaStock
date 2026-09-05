const Empresa = require('../models/Empresa');


// CREATE
async function criarEmpresa(req, res) {
    try {
        const { nome, cnpj, senha } = req.body;

        const empresa = await Empresa.create({
            nome,
            cnpj,
            senha
        });

        res.status(201).json(empresa);

    } catch (erro) {
        console.error('ERRO AO CADASTRAR EMPRESA:', erro);

        res.status(500).json({
            erro: 'Erro ao cadastrar empresa',
            detalhe: erro.message
        });
    }
}


// READ - todos
async function listarEmpresas(req, res) {
    try {
        const empresas = await Empresa.findAll({
            order: [['empresa_id', 'ASC']]
        });

        res.json(empresas);

    } catch (erro) {
        console.error('ERRO AO LISTAR EMPRESAS:', erro);

        res.status(500).json({
            erro: 'Erro ao listar empresas',
            detalhe: erro.message
        });
    }
}


// READ - uma empresa
async function buscarEmpresa(req, res) {
    try {
        const { id } = req.params;

        const empresa = await Empresa.findByPk(Number(id));

        if (!empresa) {
            return res.status(404).json({
                erro: 'Empresa não encontrada'
            });
        }

        res.json(empresa);

    } catch (erro) {
        console.error('ERRO AO BUSCAR EMPRESA:', erro);

        res.status(500).json({
            erro: 'Erro ao buscar empresa',
            detalhe: erro.message
        });
    }
}


// UPDATE
async function atualizarEmpresa(req, res) {
    try {
        const { id } = req.params;
        const { nome, cnpj, senha } = req.body;

        const empresa = await Empresa.findByPk(Number(id));

        if (!empresa) {
            return res.status(404).json({
                erro: 'Empresa não encontrada'
            });
        }

        await empresa.update({
            nome,
            cnpj,
            senha
        });

        res.json(empresa);

    } catch (erro) {
        console.error('ERRO AO ATUALIZAR EMPRESA:', erro);

        res.status(500).json({
            erro: 'Erro ao atualizar empresa',
            detalhe: erro.message
        });
    }
}


// DELETE
async function excluirEmpresa(req, res) {
    try {
        const { id } = req.params;

        const empresa = await Empresa.findByPk(Number(id));

        if (!empresa) {
            return res.status(404).json({
                erro: 'Empresa não encontrada'
            });
        }

        await empresa.destroy();

        res.json({
            mensagem: 'Empresa excluída com sucesso',
            empresa
        });

    } catch (erro) {
        console.error('ERRO AO EXCLUIR EMPRESA:', erro);

        res.status(500).json({
            erro: 'Erro ao excluir empresa',
            detalhe: erro.message
        });
    }
}


module.exports = {
    criarEmpresa,
    listarEmpresas,
    buscarEmpresa,
    atualizarEmpresa,
    excluirEmpresa
};