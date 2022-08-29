const express = require('express')
const { updateUser, deleteUser, getUser, getAllUsers, getStats } = require('../controllers/user')
const router = express.Router()
const {verifyToken, verifyTokenAuth, verifyTokenAdmin} = require('../middlewares/verifyToken')

router.put('/:id',verifyToken,updateUser)
router.delete('/:id',verifyTokenAuth,deleteUser)
router.get('/find/:id',verifyTokenAdmin,getUser)
router.get('/stats',verifyTokenAdmin,getStats)
router.get('/',verifyTokenAdmin,getAllUsers)


module.exports = router