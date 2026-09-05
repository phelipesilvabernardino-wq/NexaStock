const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Fornecedor = sequelize.define(
    'Fornecedor',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        empresa_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        nome: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        cnpj: {
            type: DataTypes.STRING(18),
            allowNull: false
        },

        contato: {
            type: DataTypes.STRING(50),
            allowNull: true
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: true
        },

        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: 'fornecedores',
        timestamps: false
    }
);

module.exports = Fornecedor;