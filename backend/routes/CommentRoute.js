import express from "express"
import {verifyToken} from "../utils/VerifyUser.js"
import { createComment, getComments} from "../controllers/CommentController.js";
const router = express.Router();


router.post("/create",verifyToken, createComment)
router.get("/getcomments/:postId", getComments)

export default router;