
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
const validateRole = (role) => ['admin', 'student', 'faculty'].includes(role);
const validateId = (id) => !isNaN(id) && id > 0;
const validateRollNo = (rollNo) => /^\d+$/.test(rollNo);
const validateName = (name) => /^[A-Za-z]{2,}$/.test(name);

const validateFields = (data) => {
    const { email, password, role = 'student', university_id, course_id, roll_no, first_name, last_name } = data;

    // Email Validation
    if (!email || !validateEmail(email)) {
        return 'Invalid email format';
    }

    // Password Validation
    if (!password || !validatePassword(password)) {
        return 'Password must be at least 8 characters long, containing at least one letter, one number, and one special character';
    }

    // Role Validation
    if (!role || !validateRole(role)) {
        return 'Invalid role';
    }

    // University ID Validation
    if (university_id && !validateId(university_id)) {
        return 'Invalid university ID';
    }

    // Course ID Validation
    if (course_id && !validateId(course_id)) {
        return 'Invalid course ID';
    }

    // Roll Number Validation
    if (roll_no && !validateRollNo(roll_no)) {
        return 'Roll number must be numeric';
    }

    // First Name Validation
    if (!first_name || !validateName(first_name)) {
        return 'First name must contain at least 2 alphabetic characters';
    }

    // Last Name Validation
    if (!last_name || !validateName(last_name)) {
        return 'Last name must contain at least 2 alphabetic characters';
    }

    return null; // All validations passed
};
module.exports = {
    validateEmail,
    validatePassword,
    validateRole,
    validateId,
    validateRollNo,
    validateName,
    validateFields
};
