import { Schema,model } from "mongoose";
const itemSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    descr:{
        type: String,
        required: true,
    },
    price:{
        type:String,
        required:true
    },
    idName:{
        type:String,
        required:true
    },
    itemCount:{
        type:Number,
        required:true
    },
    imgLink:{
        type:String,
        required:true
    }
})
const Items = model("srv",itemSchema)
export default Items