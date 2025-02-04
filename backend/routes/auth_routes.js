
const {Router} = require('express');
const Auth = require('../controllers/auth_controller')
const router = Router();


const auth = new Auth();

router.post('/register', auth.register);
router.post('/login', auth.login);


module.exports = router;