const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')


const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));


dotenv.config()


mongoose.connect(process.env.MONGO_DB)
.then(() => app.listen(process.env.PORT,() => console.log("Listening")))
.catch((error) => console.log(error));


app.use('/auth',authRoute)
app.use('/user',userRoute)
app.use('/products',productRoute)
app.use('/cart',cartRoute)
app.use('/orders',orderRoute)
