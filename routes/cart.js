const express = require('express')
const { createCart, updateCart, deleteCart, getCart, getAllCarts } = require('../controllers/cart')
const { verifyToken, verifyTokenAuth, verifyTokenAdmin } = require('../middlewares/verifyToken')
const router = express.Router()

router.post('/',verifyTokenAuth,createCart)
router.put('/:id',verifyTokenAuth,updateCart)
router.delete('/:id',verifyTokenAuth,deleteCart)
router.get('/find/:userId',verifyTokenAuth,getCart)
router.get('/',verifyTokenAdmin,getAllCarts)

module.exports = router