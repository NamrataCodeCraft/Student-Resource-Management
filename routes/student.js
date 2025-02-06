const router = require('express').Router();
const { getStudent, getStudentById } = require('../controllers/student');
const authantication = require('../middleware/authantication');
const adminAccess = require('../middleware/adminacces');

router.get('/students', authantication, adminAccess, getStudent);
router.get('/students/:id', authantication, getStudentById);


module.exports = router;
