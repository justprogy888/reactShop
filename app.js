import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import serviceRouter from "./routes/service.js"
import checkApiKey from "./middleware/apikey.js"
import "dotenv/config"
import userRouter from "./routes/user.js"
const app = express()
app.use(express.json())
app.use(cors())
app.use("/items",serviceRouter)
app.use("/users",userRouter)
async function main() {
    await mongoose.connect(process.env.MONGO_DB_URI)
}
main().then(()=> console.log("Connected to a db")).catch((err)=>console.log(err))
app.listen(5000,()=>{
    console.log("Hello world")
})
