import express from "express"
import {verifyToken} from "../utils/VerifyUser.js"
import { createPost, getPosts, deletePost } from "../controllers/PostController.js"
const router = express.Router()


router.post("/create", verifyToken, createPost)
router.get("/getposts", getPosts)
router.delete("/deletepost/:postId/:userId",verifyToken, deletePost)


export default router