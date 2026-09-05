const Usuario = require('../models/Usuario');


// CREATE
async function criarUsuario(req, res) {
    try {
        const { nome, senha } = req.body;

        // A empresa vem do token JWT
        const empresa_id = req.usuario.empresa_id;

        if (!nome || !senha) {
            return res.status(400).json({
                erro: 'Nome e senha são obrigatórios'
            });
        }

        const usuario = await Usuario.create({
            empresa_id,
            nome,
            senha
        });

        res.status(201).json({
            id: usuario.id,
            empresa_id: usuario.empresa_id,
            nome: usuario.nome
        });

    } catch (erro) {
        console.error('ERRO AO CADASTRAR USUARIO:', erro);

        res.status(500).json({
            erro: 'Erro ao cadastrar usuário',
            detalhe: erro.message
        });
    }
}


// READ - todos os usuários da empresa
async function listarUsuarios(req, res) {
    try {
        const empresa_id = req.usuario.empresa_id;

        const usuarios = await Usuario.findAll({
            where: {
                empresa_id
            },
            attributes: [
                'id',
                'empresa_id',
                'nome'
            ],
            order: [
                ['id', 'ASC']
            ]
        });

        res.json(usuarios);

    } catch (erro) {
        console.error('ERRO AO LISTAR USUARIOS:', erro);

        res.status(500).json({
            erro: 'Erro ao listar usuários',
            detalhe: erro.message
        });
    }
}


// READ - um usuário da empresa
async function buscarUsuario(req, res) {
    try {
        const { id } = req.params;

        const empresa_id = req.usuario.empresa_id;

        const usuario = await Usuario.findOne({
            where: {
                id: Number(id),
                empresa_id
            },
            attributes: [
                'id',
                'empresa_id',
                'nome'
            ]
        });

        if (!usuario) {
            return res.status(404).json({
                erro: 'Usuário não encontrado'
            });
        }

        res.json(usuario);

    } catch (erro) {
        console.error('ERRO AO BUSCAR USUARIO:', erro);

        res.status(500).json({
            erro: 'Erro ao buscar usuário',
            detalhe: erro.message
        });
    }
}


// UPDATE
async function atualizarUsuario(req, res) {
    try {
        const { id } = req.params;

        const { nome, senha } = req.body;

        const empresa_id = req.usuario.empresa_id;

        if (!nome || !senha) {
            return res.status(400).json({
                erro: 'Nome e senha são obrigatórios'
            });
        }

        const usuario = await Usuario.findOne({
            where: {
                id: Number(id),
                empresa_id
            }
        });

        if (!usuario) {
            return res.status(404).json({
                erro: 'Usuário não encontrado'
            });
        }

        await usuario.update({
            nome,
            senha
        });

        res.json({
            id: usuario.id,
            empresa_id: usuario.empresa_id,
            nome: usuario.nome
        });

    } catch (erro) {
        console.error('ERRO AO ATUALIZAR USUARIO:', erro);

        res.status(500).json({
            erro: 'Erro ao atualizar usuário',
            detalhe: erro.message
        });
    }
}


// DELETE
async function excluirUsuario(req, res) {
    try {
        const { id } = req.params;

        const empresa_id = req.usuario.empresa_id;

        const usuario = await Usuario.findOne({
            where: {
                id: Number(id),
                empresa_id
            }
        });

        if (!usuario) {
            return res.status(404).json({
                erro: 'Usuário não encontrado'
            });
        }

        await usuario.destroy();

        res.json({
            mensagem: 'Usuário excluído com sucesso',
            usuario: {
                id: usuario.id,
                empresa_id: usuario.empresa_id,
                nome: usuario.nome
            }
        });

    } catch (erro) {
        console.error('ERRO AO EXCLUIR USUARIO:', erro);

        res.status(500).json({
            erro: 'Erro ao excluir usuário',
            detalhe: erro.message
        });
    }
}


module.exports = {
    criarUsuario,
    listarUsuarios,
    buscarUsuario,
    atualizarUsuario,
    excluirUsuario
};