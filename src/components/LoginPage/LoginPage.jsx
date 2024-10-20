
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss"
const LoginPage = ()=>{
    const [login,setLogin] = useState("");
    const [pass,setPass] = useState("");
    const [message,setMessage] = useState("");
    const nav = useNavigate();
    async function submit() {
        let resp = await fetch("http://localhost:5000/users/login",{
            method:"POST",
            body:JSON.stringify({
                login:login,
                password:pass
            }),
            headers:{
                "Accept":"*/*",
                "Content-Type":"application/json"
            }
        })
        let json = await resp.json()
        console.log(resp)
        if(resp.ok){
            localStorage.setItem("token",json.token);
            setMessage("Logined succesfully! You will be redirected shortly...")
            setTimeout(()=>{
                nav("/")
            },2000)
        }
    }
    return (
        <div className="main-login">
            <div className="central-container">
                <p className="login-title">Login</p>
                <input className="input-standart" value={login} onChange={e => setLogin(e.target.value)}></input>
                <input className="input-standart" value={pass} onChange={e => setPass(e.target.value)}></input>
                <button className="login" onClick={submit}>Login</button>
                <p className="message-text">{message}</p>
            </div>
        </div>
    );
}
export default LoginPage