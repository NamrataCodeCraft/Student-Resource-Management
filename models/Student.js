const { DataTypes } = require('sequelize')
const sequelize = require('../config/database'); 
const Student = sequelize.define(
    'Student',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        university_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        roll_no: {
            type: DataTypes.INTEGER,
            allowNull: true

        }
    },
    {
        tableName: 'students',
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        underscored: true
    }
);
Student.associate = (models) => {
    Student.hasOne(models.University, { foreignKey: 'student_id' });
    Student.hasOne(models.Course, { foreignKey: 'student_id' });
}
module.exports = Student