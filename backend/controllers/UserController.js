import {ErrorHandler} from "../utils/Error.js"
import  bcryptjs from "bcryptjs"
import User from "../models/userModels.js"

export const updateUser = async (req, res, next) => {
   if(req.user.id!== req.params.userId){
    return next(ErrorHandler(403, "Access Denied to Update the user."))
   }
   if(req.body.password) {
    if(req.body.password.length < 6){
        return next(ErrorHandler(400, "Password must be 6 characters"))
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10)
   }
    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(ErrorHandler(400, "Username must be between 7 and 20 characters"))
        }
    }  
    if(req.body.username.includes(" ")){
        return next(ErrorHandler(400, "Username cannot contain spaces"))
    }
    if(req.body.username !== req.body.username.toLowerCase()){
        return next(ErrorHandler(400, "Username must be lowecase"))
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
        return next(ErrorHandler(400 , "Username can only contains letters and numbers"))
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password
            },
        }, {new : true})

        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}


export const deleteUser = async (req, res, next) =>{
    if(req.user.id !== req.params.userId) {
        return next(ErrorHandler(403, "Access Denied to Delete this user"))
    }
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json("User Deleted Successfully.")        
    } catch (error) {
        next(error)
    }
}

export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json("User Signed Out Successfully")
    } catch (error) {
        next(error)
    }
}