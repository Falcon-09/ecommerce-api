const productModel = require('../models/products')


exports.createProduct = async(req,res) => {
    const newProduct = new productModel(req.body)

    try {
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.updateProduct = async(req,res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {new: true}
        )
        res.status(201).json(updatedProduct)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.deleteProduct = async(req,res) => {

    try {
        await productModel.findByIdAndDelete(req.params.id)
        res.status(201).json({message: "Product deleted successfully"})
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getProduct = async(req,res) => {

    try {
        const product = await userModel.findById(req.params.id)
        res.status(200).json(product)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}

exports.getAllProducts = async(req,res) => {
    const qNew = req.query.new
    const qCategory = req.query.category 
    try {
        let products;
        if(qNew){
            products = await productModel.find().sort({createdAt: -1}).limit(5)
        }else if(qCategory){
            products = await productModel.find({categories: {$in: [qCategory]}})
        }else{
            products = await productModel.find()
        }

        res.status(200).json(products)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
}