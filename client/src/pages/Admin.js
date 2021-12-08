import React, {useState,useRef} from 'react';
import '../main.css'
import axios from "axios";
import API from "../components/Api";
import {toast} from "react-toastify";


const Admin = () => {
   
    const [passwordShown, setPasswordShown] = useState(false);
    const loginRef=useRef(null)
    const passwordRef=useRef(null)
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const submit = (e) => {
        e.preventDefault()
        axios.post(API+"/api/auth/login",{
            username:loginRef.current.value,
            password:passwordRef.current.value,
        })
            .then((res)=>{
                
                
                localStorage.setItem('Mydata',res.data.token)
                
                window.location='/dashboard/orders/1'
                toast.success(res.data)
            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                    
                }
            });
    }

    if (localStorage.getItem('Mydata')){
        return window.location='/dashboard/orders/1'
    }else {
         return (
            <>
                <section className="login-page">
                    <div className="login">
                        <form onSubmit={submit} action="">
                            <h1>Kirish</h1>
                            <div className="user">
                                <img src="/assets/user.png" alt=""/>
                                <input
                                    placeholder="Login"
                                    type="text"
                                    ref={loginRef}
                                />
                            </div>
                            <div className="lock">
                                <img src="/assets/lock.png" alt=""/>
                                <input

                                    placeholder="Parol"
                                    type={passwordShown ? "text" : "password"}
                                    ref={passwordRef}
                                />
                                <img onClick={togglePassword} style={{width:"20px",height:"20px",cursor:"pointer"}} src="/assets/eye.png" alt=""/>
                            </div>

                            <button type="submit">
                                Kirish
                            </button>
                        </form>
                    </div>
                </section>
            </>
        );
    }


};

export default Admin;
