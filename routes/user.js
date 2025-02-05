const { Router } = require('express')
const router = Router()
const { createUser } = require('../controllers/User')
router.post('/user', createUser)
module.exports = router