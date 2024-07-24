import express from "express"
const app = express()
import "./db/connnect.js"
import cors from "cors"
import UserRoutes from "./routes/UserRoutes.js"
import AuthRoutes from "./routes/AuthRoute.js"
import PostRoute from "./routes/PostRoute.js"
import CommentRoute from "./routes/CommentRoute.js"
import cookieParser from "cookie-parser"

import path from "path"
const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api/post", PostRoute)
app.use("/api/user", UserRoutes)
app.use("/api/auth", AuthRoutes)
app.use("/api/comment", CommentRoute)

app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || `Internal Server Error`;
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(3000, () => {
    console.log(`Server is running on: 3000` )
})