
import {ErrorHandler} from "../utils/Error.js"
import Post from "../models/postModels.js"
export const createPost = async (req, res, next) => {


    if(!req.user.isAdmin){
        return next(ErrorHandler(403, "Unauthorised to create post"))
    }

        if(!req.body.title || !req.body.content){
            return next(ErrorHandler(400, "Fields are Empty"))
        }
        const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');

        const newPost = new Post({
            ...req.body, slug,
            userId: req.user.id
        })

        try {
            const savedPost = await newPost.save();


            res.status(200).json(savedPost)
        } catch (error) {
            next(error)
        }
}