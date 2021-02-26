const { body } = require('express-validator');
const {
  userController: { selectAllUsers, login, register, keepLogin },
} = require('../controllers');
const {
  jwt: { genValidate },
} = require('../handlers');
const { registerValidator } = require('../middleware');

const router = require('express').Router();

router.get('/', selectAllUsers);
router.post('/login', login);
router.post('/register', registerValidator, register);
router.post('/keep-login', genValidate, keepLogin);

// router.post('/login', async (req, res) => {
//   console.log(req.body);
//   return res.send(req.body);
// });

module.exports = router;
