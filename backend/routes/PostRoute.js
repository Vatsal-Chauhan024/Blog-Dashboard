import express from "express"
import {verifyToken} from "../utils/VerifyUser.js"
import { createPost, getposts } from "../controllers/PostController.js"
const router = express.Router()


router.post("/create", verifyToken, createPost)
router.get("/getposts", getposts)


export default router