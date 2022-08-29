const cartModel = require('../models/cart')


exports.createCart = async(req,res) => {
    const newCart = new cartModel(req.body)

    try {
        const savedCart = await newCart.save()
        res.status(201).json(savedCart)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.updateCart = async(req,res) => {
    try {
        const updatedCart = await cartModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {new: true}
        )
        res.status(201).json(updatedCart)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.deleteCart = async(req,res) => {

    try {
        await CartModel.findByIdAndDelete(req.params.id)
        res.status(201).json({message: "Cart deleted successfully"})
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getCart = async(req,res) => {

    try {
        const cart = await userModel.findOne({userId: req.params.userId})
        res.status(200).json(cart)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getAllCarts = async(req,res) => {
    
    try {
        const carts = await cartModel.find()
        res.status(200).json(carts)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}