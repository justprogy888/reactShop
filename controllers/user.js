import User from "../models/user.js";
import jwt from "jsonwebtoken"
async function registerUser(req,res) {
    try{
        if (!req.body) return res.status(404).json({status:false, message:"Nothing received"})
        let login = req.body.login
        let password = req.body.password 
        let name = req.body.name
        console.log(req)
        console.log(req.body)
        if (login == undefined || password == undefined || name == undefined){
            return res.status(404).json({status:false, message:"No required fields"})
        }
        let user = await User.findOne({login})
        if(user){
            return res.status(404).json({status:false,message:"User exists with this login"})
        }
        let token = jwt.sign({login:login,password:password,name:name}, "dwadawdwdw", {expiresIn: "7d"})
        let newUser = new User({
            login,
            password,
            name,
            token
        })
        await newUser.save()
        return res.status(201).json({status:true, message:"Created succesfully",token:token})
    }catch(error){
        console.log(error)
        return res.status(500).json({status:false, message:"Something's went wrong","error":error})
    }
    
}

async function login(req,res) {
    try{
        let login = req.body.login
        let password = req.body.password
        if(!login || !password) return res.status(404).json({status:false,message:"Some credentials aren't present"})
        let user = await User.findOne({login,password})
        if(!user) return res.status(404).json({status:true,message:"User not found."})
        let name = user.name
        let token = user.token
        console.log(token)
        return res.status(201).json({status:true, message:"Logined succesfully",token:token,name:name})
    }catch(error){
        console.log(error)
        return res.status(500).json({status:false, message:"Something's is wrong","error":error})
    }
}
async function verify(req,res) {
    try{
        let token = req.headers["authorization"]?.split(" ")[1]
        if(!token) return res.status(404).json({status:false,message:"No token."})
        jwt.verify(token,"dwadawdwdw", async (err)=>{
            if(err){
                return res.status(404).json({status:true,message:"User not verified."})
            }else{
                let user = await User.findOne({token})
                if(!user){
                    return res.status(500).json({status:true,message:"User not found"})
                }
                console.log(user.role)
                if (user.role == "admin"){
                    return res.status(200).json({status:true,message:"User verified.",role:user.role,name:user.name,key:process.env._API_KEY})
                }else{ 
                    return res.status(200).json({status:true,message:"User verified.",role:user.role,name:user.name})
                }
                
            }
        })   
    }catch(err){
        console.log(err)
        return res.status(500).json({status:false, message:"Something's is wrong","error":err})
    }
}
export {registerUser,login,verify}