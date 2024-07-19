import express from "express"
const app = express()
import "./db/connnect.js"


app.listen(3000, () => {
    console.log(`Server is running on: 3000` )
})