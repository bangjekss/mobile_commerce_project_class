const router = require('express').Router();
const {
  cartController: {
    addToCart,
    getCartByID,
    editQuantityCart,
    deleteCartById,
    emptyCartByUserID,
    changeIsCheckedCart,
  },
} = require('../controllers');

router.get('/:id', getCartByID);
router.post('/:id', addToCart);
router.patch('/:id', editQuantityCart);
router.patch('/change-checked/:id', changeIsCheckedCart);
router.delete('/:id', deleteCartById);
router.delete('/clear/:id', emptyCartByUserID);

module.exports = router;
