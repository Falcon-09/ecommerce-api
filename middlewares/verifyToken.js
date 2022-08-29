const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token

    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_KEY, (err,user) =>{
            if(err) res.status(403).json({message: "Token not valid"})
            req.user = user
            next()
        })
    }else{
        return res.status(401).json({message: "Not authorized"})
    }
}

const verifyTokenAuth = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json({message: "Not authorized"})
        }
    })
}

const verifyTokenAdmin = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(403).json({message: "Not authorized"})
        }
    })
}

module.exports = {verifyToken,verifyTokenAuth,verifyTokenAdmin}