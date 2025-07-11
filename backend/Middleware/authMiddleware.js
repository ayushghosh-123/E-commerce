import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

// middleware to protect route

const protect = async(req, res, next) => {
    let token;

    if (req.header.authorization && req.header.authorization.startWith("Bearer")){
        
    try{
        token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decode.user.id).select("-password")
        next()
    }catch(error){
        console.error("Token verify successfully")
        resizeBy.status(401).json({message: "Not authorized, token failed"})
    }
    }
    else{
        res.status(401).json({message: "Not authorizd , not token provided"})
    }
}

export default protect