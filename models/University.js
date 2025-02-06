const { DataTypes } = require('sequelize')
const sequelize = require('../config/database');
const University = sequelize.define(
    'University',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pincode: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'universities',
        timestamps: true,
        // paranoid: true,
        freezeTableName: true,
        underscored: true
    }
);
University.associate = (models) => {
    University.hasOne(models.Course, { foreignKey: 'university_id' });
    University.hasMany(models.Student, { foreignKey: 'university_id' });
};
module.exports = University