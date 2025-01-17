import express from "express"
import { updateUser, deleteUser, signout, getUsers, getUser } from "../controllers/UserController.js"
import { verifyToken } from "../utils/VerifyUser.js"
const router = express.Router()



router.put("/update/:userId",verifyToken, updateUser)
router.delete("/delete/:userId", verifyToken, deleteUser)
router.post("/signout", signout)
router.get("/getusers", verifyToken, getUsers)
router.get("/:userId", getUser)

export default router