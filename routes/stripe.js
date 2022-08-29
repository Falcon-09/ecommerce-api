const express = require('express')
const { paymentHandler } = require('../controllers/stripe')
const router = express.Router()


router.post('/payment',paymentHandler)


module.exports = router