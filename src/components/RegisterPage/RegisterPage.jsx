import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.scss"
const RegisterPage = ()=>{
    const [login,setLogin] = useState("");
    const [pass,setPass] = useState("");
    const [name,setName] = useState("");
    const [message,setMessage] = useState("");
    const nav = useNavigate();
    async function submit() {
        let resp = await fetch("http://localhost:5000/users/register",{
            method:"POST",
            body:JSON.stringify({
                login:login,
                password:pass,
                name:name
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
        let json = await resp.json()
        if(resp.ok){
            localStorage.setItem("token",json.token);
            setMessage("Registered succesfully! You will be redirected shortly...")
            setTimeout(()=>{
                nav("/")
            },2000)
        }
        console.log(json)
    }
    return (
        <div className="main-login">
            <div className="central-container">
                <p className="login-title">Register</p>
                <input className="input-standart" value={name} onChange={e => setName(e.target.value)}></input>
                <input className="input-standart" value={login} onChange={e => setLogin(e.target.value)}></input>
                <input className="input-standart" value={pass} onChange={e => setPass(e.target.value)}></input>
                <button className="login" onClick={submit}>Register</button>
                <p className="message-text">{message}</p>
            </div>
        </div>
    );
}
export default RegisterPage