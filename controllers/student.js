const Student = require("../models/Student");
const httpResponse = require("../utils/httpResponse");

exports.getStudent = async (req, res) => {
    try {
        const students = await Student.findAll({
            attributes: ['id', 'roll_no', 'created_at', 'updated_at'],
        });
        return httpResponse(res, 200, 'Students fetched successfully', students);
    } catch (error) {
        console.log(error);
        return httpResponse(res, 500, 'Internal Server Error');
    }
}

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findByPk(req.params.id);
        if (!student) {
            return httpResponse(res, 404, 'Student not found');
        }
        return httpResponse(res, 200, 'Student fetched successfully', student);
    } catch (error) {
        console.log(error);
        return httpResponse(res, 500, 'Internal Server Error');
    }
}