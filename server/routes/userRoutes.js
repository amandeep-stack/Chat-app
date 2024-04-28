const { register, login, setAvatar, getAllUsers } = require('../controllers/userContollers');

const router = require('express').Router();

router.post('/register', register)
router.post('/login', login)
router.get('/allUsers/:id', getAllUsers)

module.exports = router;