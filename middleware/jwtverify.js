import jwt from "jsonwebtoken"
import User from "../models/user.js";
const checkUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(403).json({ message: "Forbidden" })
        const decode = jwt.verify(token, "asdf1234")
        if (decode) {
        let user = await User.findById(decode._id)
        req.user = user
        next()
        } else {
        res.status(403).json({ message: "Forbidden" })
        }
    } catch (errог) {
        res.status(500).json({ message: error })
    }
}
export default checkUser