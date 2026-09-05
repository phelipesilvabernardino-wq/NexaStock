const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Estoque = sequelize.define(
    'Estoque',
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

        produto: {
            type: DataTypes.STRING,
            allowNull: false
        },

        categoria: {
            type: DataTypes.STRING,
            allowNull: false
        },

        quantidade: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        valor: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },

        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: 'estoque',
        timestamps: false
    }
);

module.exports = Estoque;