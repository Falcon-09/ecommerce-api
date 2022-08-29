const express = require('express')
const { createOrder, updateOrder, deleteOrder, getOrder, getAllOrders, getIncome } = require('../controllers/order')
const { verifyTokenAuth, verifyTokenAdmin } = require('../middlewares/verifyToken')
const router = express.Router()

router.post('/',verifyTokenAuth,createOrder)
router.put('/:id',verifyTokenAdmin,updateOrder)
router.delete('/:id',verifyTokenAdmin,deleteOrder)
router.get('/find/:id',verifyTokenAuth,getOrder)
router.get('/income',verifyTokenAdmin,getIncome)
router.get('/',verifyTokenAdmin,getAllOrders)

module.exports = router