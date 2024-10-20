import { Model } from "mongoose";
import Items from "../models/service.js";
import checkApiKey from "../middleware/apikey.js"
async function getItems(req,res) {
    try{
        let its = await Items.find()
        if(its.length > 0) return res.status(200).json({status:true,items:its})
    }catch(error){
        console.log(error)
        return res.status(500).json({status:false, message:"Something's wrong","error":error})
    }
}

async function addItem(req,res) {
    try{
        let title = req.body.title
        let descr = req.body.descr
        let price = req.body.price
        let idName = req.body.idName
        let itemCount = req.body.itemCount
        let imgLink = req.body.imgLink
        if(!checkApiKey(req)){
            return res.status(403).json({status:false, message:"Forbidden"})
        }
        if(title || descr || price || idName || itemCount || imgLink) {
            let item = new Items({
                title:title,
                descr:descr,
                price:price,
                idName:idName,
                itemCount:itemCount,
                imgLink:imgLink
            })
            await item.save()
            return res.status(200).json({status:true, message:"New item created"})
        }else{
            return res.status(404).json({status:true, message:"Args missing"})
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({status:false, message:"Something's wrong","error":error})
    }
}
async function decreaseItem(req,res) {
    try{
        let idName = req.body.idName
        console.log(req.body)
        if(idName) {
            let it = await Items.findOne({idName:idName})
            console.log(it)
            await Items.findOneAndUpdate({idName:idName}, {itemCount: it.itemCount - 1}); 
            return res.status(200).json({status:true, message:"Item updated"})
        }else{
            return res.status(404).json({status:true, message:"Args missing"})
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({status:false, message:"Something's wrong","error":error})
    }
}
export {addItem,getItems,decreaseItem}