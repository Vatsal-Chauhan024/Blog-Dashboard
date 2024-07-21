import express from "express"
const app = express()
import "./db/connnect.js"
import cors from "cors"
import UserRoutes from "./routes/UserRoutes.js"
import AuthRoutes from "./routes/AuthRoute.js"
import PostRoute from "./routes/PostRoute.js"
import cookieParser from "cookie-parser"

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api/post", PostRoute)
app.use("/api/user", UserRoutes)
app.use("/api/auth", AuthRoutes)

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