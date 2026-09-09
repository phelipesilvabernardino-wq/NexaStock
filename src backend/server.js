const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use('/empresa', empresaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/fornecedores', fornecedorRoutes);
app.use('/movimentacao', movimentacaoRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/login', loginRoutes);

sequelize.sync()
    .then(() => {
        console.log('PostgreSQL conectado e tabelas sincronizadas com Sequelize!');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao PostgreSQL:', error);
    });

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Documentacao Swagger disponivel em http://localhost:${PORT}/api-docs`);
});
