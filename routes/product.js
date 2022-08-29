const express = require('express')
const { createProduct, updateProduct, deleteProduct, getAllProducts, getProduct } = require('../controllers/product')
const { verifyTokenAdmin, verifyTokenAuth } = require('../middlewares/verifyToken')
const router = express.Router()


router.post('/',verifyTokenAdmin,createProduct)
router.put('/:id',verifyTokenAdmin,updateProduct)
router.delete('/:id',verifyTokenAdmin,deleteProduct)
router.get('/find/:id',verifyTokenAuth,getProduct)
router.get('/',verifyTokenAdmin,getAllProducts)


module.exports = router