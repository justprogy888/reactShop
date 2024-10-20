import React from "react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.scss"
const AdminPage = ()=>{
    const [title,setTitle] = useState("")
    const [desc,setDescr] = useState("")
    const [amount,setAmount] = useState("")
    const [price,setPrice] = useState("")
    const [itemImage,setItemImage] = useState("")
    const [idName,setIdName] = useState("")
    const [isInputWrong,setIsInputWrong] = useState(false)
    const [api_key,setApiKey] = useState("")
    const [noKey,setNoKey] = useState(true)
    const nav = useNavigate()
    useEffect(()=>{
        if(api_key != null && api_key != undefined){
            setNoKey(true)
        }else{
            setNoKey(false)
        }
        confirmUser()
    },[])
    async function confirmUser() {
        let t = localStorage.getItem("token")
        if(t){
            let resp = await fetch("http://localhost:5000/users/getStatus",{
                method:"GET",
                headers:{
                    "authorization": "Bearer " + t
                }
            })
            let json = await resp.json()
            if(json["role"] != "admin"){
                nav("/")
            }
        }else{
            nav("/login")
        }
    }
    async function createItems() {
        let t = localStorage.getItem("token")
        if(t){
            let resp = await fetch("http://localhost:5000/users/getStatus",{
                method:"GET",
                headers:{
                    "authorization": "Bearer " + t
                }
            })
            let json = await resp.json()
            if(json["role"] == "admin"){
                setApiKey(json.key)
                if(title || desc || amount || price || itemImage || idName){
                    if(api_key != null && api_key != undefined){
                        setIsInputWrong(false)
                        let resp = await fetch("http://localhost:5000/items/createnew",{
                            method:"POST",
                            headers:{
                                "Content-Type": "Application/JSON",
                                "api-key":api_key
                            },
                            body:JSON.stringify({
                                title:title,
                                descr:desc,
                                price:price,
                                idName:idName,
                                itemCount:amount,
                                imgLink:itemImage
                            })
                        })
                        console.log(resp.status)
                        localStorage.setItem("api_key",api_key)
                    }else{
        
                    }
                }else{
                    setIsInputWrong(true)
                }
            }else{
                nav("/")
            }
        }else{
            nav("/login")
        }
    }
    return(
        <div className="admin-cont">
            
            <div className="values-cont">
                <p className="title"> 
                    Create new item
                </p>
                <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className={isInputWrong ? "title-inp wrong" : "title-inp"}></input>
                <textarea className={isInputWrong ? "descr wrong" : "descr"} value={desc} onChange={(e) => setDescr(e.target.value)}>
                </textarea>
                <div className="cont-price-amount">
                    <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className={isInputWrong ? "small-inp wrong" : "title-inp"}></input>
                    <input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className={isInputWrong ? "small-inp wrong" : "title-inp"}></input>
                </div>
                <input placeholder="Item image" value={itemImage} onChange={(e) => setItemImage(e.target.value)} className={isInputWrong ? "img-inp wrong" : "id-inp"}></input>
                <input placeholder="Id name" value={idName} onChange={(e) => setIdName(e.target.value)} className={isInputWrong ? "id-inp wrong" : "id-inp"}></input>
                <input placeholder="Api key" value={api_key} onChange={(e) => setApiKey(e.target.value)} className={!noKey ? "id-inp" : "hidden"}></input>
                <button className="submit-button" onClick={createItems}>Create</button>
            </div>
        </div>
    );
}
export default AdminPage