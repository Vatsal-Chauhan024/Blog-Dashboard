import express from "express"
import {verifyToken} from "../utils/VerifyUser.js"
import { createComment, getComments, likeComment} from "../controllers/CommentController.js";
const router = express.Router();


router.post("/create",verifyToken, createComment)
router.get("/getcomments/:postId", getComments)
router.put("/likeComment/:commentId", verifyToken, likeComment)

export default router;