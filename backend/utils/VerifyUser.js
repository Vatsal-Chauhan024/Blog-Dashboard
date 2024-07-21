import jwt from "jsonwebtoken"
import {ErrorHandler} from "./Error.js"


export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token){
        return next(ErrorHandler(401, "Token Not Found"))
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if(error){
            return next(ErrorHandler(401, "Unauthorized"))
        }
        req.user = user;
        next()
    })
}