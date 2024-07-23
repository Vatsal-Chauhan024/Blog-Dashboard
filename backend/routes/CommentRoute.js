import express from "express"
import {verifyToken} from "../utils/VerifyUser.js"
import { createComment } from "../controllers/CommentController.js";
const router = express.Router();


router.post("/create",verifyToken, createComment)

export default router;