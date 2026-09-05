const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define(
    'Usuario',
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
        

        senha: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        tableName: 'usuarios',
        timestamps: false
    }
);

module.exports = Usuario;