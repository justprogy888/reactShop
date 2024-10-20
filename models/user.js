import { Schema,model } from "mongoose";
const userSchema = new Schema({
    login:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required: false,
        default: ""
    },
    name:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:false,
        default: 0
    },
    services:{
        type:Array,
        required:false,
        default:[]
    },
    token:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"user"
    }
})
const User = model("users",userSchema)
export default User