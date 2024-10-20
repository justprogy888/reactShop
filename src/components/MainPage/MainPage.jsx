import React from "react";
import { useEffect,useState } from "react";
import Item from "../Item/Item";
import "./MainPage.scss"
import { Link } from "react-router-dom";
const MainPage = ()=>{
    const [items,setItems] = useState([])
    const [userRegistered,setUserRegistered] = useState(false)
    const [userName,setUserName] = useState(false)
    async function getItems() {
        let resp = await fetch("http://localhost:5000/items/items")
        let json = await resp.json()
        setItems(json.items)
        console.log(json.items)
    }
    async function getUser() {
        let token = localStorage.getItem("token")
        if(token){
            let resp = await fetch("http://localhost:5000/users/getStatus",{
                method:"GET",
                headers:{
                    "authorization": "Bearer " + token
                }
            })
            if(resp.ok){
                let json = await resp.json()
                setUserName(json["name"])
                setUserRegistered(true)
            }
        }
        
    }
    useEffect(()=>{
        getItems()
        getUser()
    },[])
    return(
        <div className="main-cont">
            <div className="cont-header">
                <p className="title">Our items</p>
                <div className="account">
                    <p className={userRegistered ? "user-name" : "hidden"}>{userName}</p>
                    <div className="account-actions">
                        <Link style={{ textDecoration: 'none' }} to={"/register"}><button className={!userRegistered ? "register-btn" : "hidden"}>Register</button></Link> 
                        <Link style={{ textDecoration: 'none' }} to={"/login"}><button className="login-btn">Login</button></Link>
                    </div>
                </div>
            </div>
            
            <div className="items-cont">
            {
                items ? items.map(el=>{
                    return(
                        <Item title={el.title} descr={el.descr} price={el.price} amount={el.itemCount} link={el.imgLink} idName={el.idName} setItems={setItems}/>
                    );
                }) : <p>No items</p>
            }
            </div>
        </div>
    );
}
export default MainPage