const jwt = require('jsonwebtoken');

const Empresa = require('../models/Empresa');
const Usuario = require('../models/Usuario');


// LOGIN DO USUÁRIO
async function loginUsuario(req, res) {
    try {
        const { empresa_id, nome, senha } = req.body;

        if (!empresa_id || !nome || !senha) {
            return res.status(400).json({
                erro: 'Preencha todos os campos'
            });
        }

        const usuario = await Usuario.findOne({
            where: {
                empresa_id: Number(empresa_id),
                nome: nome,
                senha: senha
            }
        });

        if (!usuario) {
            return res.status(401).json({
                erro: 'Empresa, usuário ou senha inválidos'
            });
        }

        const token = jwt.sign(
            {
                tipo: 'usuario',
                usuario_id: usuario.id,
                empresa_id: usuario.empresa_id,
                nome: usuario.nome
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '8h'
            }
        );

        res.json({
            mensagem: 'Login realizado com sucesso',

            token,

            usuario: {
                id: usuario.id,
                empresa_id: usuario.empresa_id,
                nome: usuario.nome
            }
        });

    } catch (erro) {
        console.error('ERRO NO LOGIN:', erro);

        res.status(500).json({
            erro: 'Erro ao realizar login',
            detalhe: erro.message
        });
    }
}


// LOGIN DA EMPRESA
async function loginEmpresa(req, res) {
    try {
        const { empresa_id, senha } = req.body;

        if (!empresa_id || !senha) {
            return res.status(400).json({
                erro: 'Preencha todos os campos'
            });
        }

        const empresa = await Empresa.findByPk(
            Number(empresa_id)
        );

        if (!empresa || empresa.senha !== senha) {
            return res.status(401).json({
                erro: 'Empresa ou senha inválidos'
            });
        }

        const token = jwt.sign(
            {
                tipo: 'empresa',
                empresa_id: empresa.empresa_id,
                nome: empresa.nome
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '8h'
            }
        );

        res.json({
            mensagem: 'Login realizado com sucesso',

            token,

            empresa: {
                empresa_id: empresa.empresa_id,
                nome: empresa.nome,
            }
        });

    } catch (erro) {
        console.error('ERRO NO LOGIN DA EMPRESA:', erro);

        res.status(500).json({
            erro: 'Erro ao realizar login',
            detalhe: erro.message
        });
    }
}


module.exports = {
    loginEmpresa,
    loginUsuario
};