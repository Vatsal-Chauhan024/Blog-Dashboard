import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database Connected Successfully")
}).catch((e) => {
    console.log("Error Connecting Database")
})
