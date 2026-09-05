const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
    try {

        console.log("========== AUTH ==========");
        console.log("URL:", req.originalUrl);
        console.log("METHOD:", req.method);
        console.log("AUTHORIZATION:", req.headers.authorization);

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                erro: 'Token não informado'
            });
        }

        const partes = authHeader.split(' ');

        if (partes.length !== 2 || partes[0] !== 'Bearer') {
            return res.status(401).json({
                erro: 'Token inválido'
            });
        }

        const token = partes[1];

        const dados = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = dados;

        console.log("USUÁRIO DO TOKEN:", dados);

        next();

    } catch (erro) {

        console.error(
            'ERRO NA AUTENTICAÇÃO:',
            erro
        );

        return res.status(401).json({
            erro: 'Token inválido ou expirado'
        });
    }
}

module.exports = autenticar;