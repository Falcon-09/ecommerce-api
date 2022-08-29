const orderModel = require('../models/order')


exports.createOrder = async(req,res) => {
    const newOrder = new orderModel(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(201).json(savedOrder)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.updateOrder = async(req,res) => {
    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {new: true}
        )
        res.status(201).json(updatedOrder)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.deleteOrder = async(req,res) => {

    try {
        await orderModel.findByIdAndDelete(req.params.id)
        res.status(201).json({message: "Order deleted successfully"})
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getOrder = async(req,res) => {

    try {
        const order = await userModel.find({userId: req.params.userId})
        res.status(200).json(order)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getAllOrders = async(req,res) => {
    
    try {
        const orders = await orderModel.find()
        res.status(200).json(orders)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getIncome = async(req,res) => {

    const date = new Date() 
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))

    try {
        const income = await orderModel.aggregate([
            {$match: {createdAt: {$gte: previousMonth}}},
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            }
        ])
        res.status(200).json(income)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}