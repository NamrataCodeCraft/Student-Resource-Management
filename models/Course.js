const { DataTypes } = require('sequelize')
const sequelize = require('../config/database'); // ✅ Import the same sequelize instance

const Course = sequelize.define(
    'Course',
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
        price: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        university_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    },
    {
        tableName: 'courses',
        timestamps: true,
        // paranoid: true,
        freezeTableName: true,
        underscored: true
    }
);
Course.associate = (models) => {
    // Course.hasOne(models.Session, { foreignKey: 'user_id' });
    Course.belongsTo(models.University, { foreignKey: 'university_id' });
    Course.hasMany(models.Student, { foreignKey: 'user_id' });
};

module.exports = Course