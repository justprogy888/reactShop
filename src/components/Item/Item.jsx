import React from "react";
import "./Item.scss"
const Item = ({title,descr,price,amount,link,idName,setItems})=>{
    async function getItems() {
        let resp = await fetch("http://localhost:5000/items/items")
        let json = await resp.json()
        setItems(json.items)
        console.log(json.items)
    }
    async function onItemInCart() {
        let resp = await fetch("http://localhost:5000/items/decreaseitem",{
            method:"POST",
            headers:{
                "Content-Type": "Application/JSON"
            },
            body:JSON.stringify({
                idName:idName
            })
        })
        if(resp.ok){
            console.log("Ok!")
            getItems()
        }
    }
    return(
        <div className="item">
            <div className="img-cont">
                <img className="inner-image" src={link}>
                </img>
            </div>
            <div className="text-cont">
                <p className="title">{title}</p>
                <p className="descr">{descr}</p>
                <div className="price-amount-cont">
                    <p className="price">Price: {price}</p>
                    <button className="buy" onClick={()=>{onItemInCart()}}>Buy</button>
                    <p className="amount">In stock: {amount}</p>
                </div>
            </div>
        </div>
            
    );
}
export default Item