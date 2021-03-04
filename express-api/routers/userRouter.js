const { body } = require('express-validator');
const {
  userController: {
    selectAllUsers,
    login,
    register,
    keepLogin,
    address,
    addNewAddress,
    deleteAddress,
    changeAddress,
  },
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

router.get('/address/:id', address);
router.post('/address/:id', addNewAddress);
router.delete('/address/:id', deleteAddress);
router.patch('/address/:id', changeAddress);

module.exports = router;
