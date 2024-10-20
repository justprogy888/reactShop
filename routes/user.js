import express from "express"
import { registerUser,login,verify } from "../controllers/user.js"

const userRouter = express.Router()
userRouter.post("/register", registerUser)
userRouter.post("/login", login)
userRouter.get("/getStatus", verify)
export default userRouter