const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // ✅ Import the same sequelize instance

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true  // ✅ Uncommented to enforce unique emails
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        tableName: 'users',  // ✅ Changed to plural convention
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        underscored: true
    }
);

module.exports = User;
