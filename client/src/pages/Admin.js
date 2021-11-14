import React, {useState,useRef} from 'react';
import '../main.css'

const Admin = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const loginRef=useRef(null)
    const passwordRef=useRef(null)
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const submit = (e) => {
        e.preventDefault()
       /* if (loginRef.current.value.length>1){
            setColor('#01384D')
        }
        else {
            setColor(color)
        }*/
    }


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
                        <button type="submit">Kirish</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Admin;
