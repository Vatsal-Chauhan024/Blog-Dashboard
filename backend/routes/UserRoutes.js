import express from "express"
import { updateUser, deleteUser, signout } from "../controllers/UserController.js"
import { verifyToken } from "../utils/VerifyUser.js"
const router = express.Router()



router.put("/update/:userId",verifyToken, updateUser)
router.delete("/delete/:userId", verifyToken, deleteUser)
router.post("/signout", signout)

export default router