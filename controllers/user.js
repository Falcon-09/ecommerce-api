const userModel = require("../models/user");
const CryptoJs = require("crypto-js");
const dotenv = require("dotenv");
dotenv.config()

exports.updateUser = async(req,res) => {
    if(req.body.password){
        req.body.password = CryptoJs.AES.encrypt(
            req.body.password,
            process.env.CRYPTO_KEY
        ).toString()
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new: true})

        res.status(201).json(updatedUser)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.deleteUser = async(req,res) => {

    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(201).json({message: "User deleted successfully"})
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getUser = async(req,res) => {

    try {
        const user = await userModel.findById(req.params.id)
        const {password,...other} = user._doc
        res.status(200).json(other)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getAllUsers = async(req,res) => {
    const query = req.query.new 
    try {
        const users = query? await userModel.find().sort({_id: -1}).limit(5) : await userModel.find()
        res.status(200).json(users)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getStats = async(req,res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))

    try {
        const data = await userModel.aggregate([
            {$match : {createdAt: {$gte: lastYear}}},
            {
                $project:{
                    month: {$month: "$createdAt"},
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ])

        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}
