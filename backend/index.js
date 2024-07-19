import express from "express"
const app = express()
import "./db/connnect.js"
import cors from "cors"
import UserRoutes from "./routes/UserRoutes.js"
import AuthRoutes from "./routes/AuthRoute.js"

app.use(express.json())
app.use(cors())
app.use("/api/user", UserRoutes)
app.use("/api/auth", AuthRoutes)

app.listen(3000, () => {
    console.log(`Server is running on: 3000` )
})