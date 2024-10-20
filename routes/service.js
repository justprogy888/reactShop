import express from "express"
import { getItems,addItem,decreaseItem } from "../controllers/services.js"

const serviceRouter = express.Router()
serviceRouter.get("/items", getItems)
serviceRouter.post("/createnew", addItem)
serviceRouter.post("/decreaseitem", decreaseItem)
export default serviceRouter