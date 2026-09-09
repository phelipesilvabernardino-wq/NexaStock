const express = require('express');
const cors = require('cors');

const sequelize = require('./config/db');

const empresaRoutes = require('./routes/empresaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const fornecedorRoutes = require('./routes/fornecedoresRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const loginRoutes = require('./routes/loginuserRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/empresa', empresaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/fornecedores', fornecedorRoutes);
app.use('/movimentacao', movimentacaoRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/login', loginRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('PostgreSQL conectado com Sequelize!');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao PostgreSQL:', error);
    });

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});