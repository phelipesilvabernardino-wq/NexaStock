const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Movimentacao = sequelize.define(
    'Movimentacao',
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

        estoque_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        tipo: {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        descricao: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        data: {
            type: DataTypes.DATE,
            allowNull: true
        },

        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'movimentacao',
        timestamps: false
    }
);

module.exports = Movimentacao;