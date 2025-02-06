const jwt = require('jsonwebtoken');
const User = require("../models/User");
const Student = require("../models/Student");
const sequelize = require('../config/database');
const httpResponse = require("../utils/httpResponse");
const { validateFields } = require('../utils/validation');



exports.signup = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { email, password, role, university_id, course_id, roll_no, first_name, last_name } = req.body;
        const validationError = validateFields(req.body);
        if (validationError) {
            return httpResponse(res, 400, validationError);
        }

        if (!role) role = "student";
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return httpResponse(res, 400, 'Email already exists');
        }
        const user = await User.create({ email, password, role, first_name, last_name }, { transaction: t });
        
        const studentData = { user_id: user.id };
        if (university_id) studentData.university_id = university_id;
        if (course_id) studentData.course_id = course_id;
        if (roll_no) studentData.roll_no = roll_no;
        
        if (role === "student") {
            const student = await Student.create(studentData, { transaction: t });
        };

        await t.commit();
        return httpResponse(res, 200, 'User created successfully');
    } catch (error) {
        await t.rollback();
        console.error('Error creating user:', error);
        return httpResponse(res, 500, 'Internal Server Error');
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return httpResponse(res, 401, 'Invalid email or password');
        if (user.password !== password) return httpResponse(res, 401, 'Invalid email or password');
        const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET);
        user.refresh_token = token;
        await user.save();
        return httpResponse(res, 200, 'Login successful', { token });
    } catch (error) {
        console.error('Error logging in:', error);
        return httpResponse(res, 500, 'Internal Server Error');
    }
}

