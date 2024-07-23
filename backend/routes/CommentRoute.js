import express from "express"
import {verifyToken} from "../utils/VerifyUser.js"
import { createComment, getComments, likeComment, editComment, deleteComment} from "../controllers/CommentController.js";
const router = express.Router();


router.post("/create",verifyToken, createComment)
router.get("/getcomments/:postId", getComments)
router.put("/likeComment/:commentId", verifyToken, likeComment)
router.put("/editComment/:commentId", verifyToken, editComment)
router.delete("/deleteComment/:commentId", verifyToken, deleteComment)

export default router;