import React, {useState,useRef,useEffect} from 'react';
import './interest.css'
import axios from "axios";
import API from "./Api";
import {toast} from "react-toastify";
import AOS from 'aos';
import "aos/dist/aos.css"

const Interest = () => {
    const [value,setValue]=useState()
    const interestRef=useRef()
    const [connect,setConnect]=useState('')
    const [accept,setAccept]=useState('')
    const submit=(e)=>{
        e.preventDefault()
        axios.post(API+"/api/interests",{
            phone:interestRef.current.value,


        })
            .then((res)=>{
                toast.success(res.data.message.accept)
                console.log(res.data)
                setConnect(res.data.message.connect)
                setAccept(res.data.message.accept)
                if (res.data.statusCode=201){
                    setNone('block')
                    setNonee('none')
                }

            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                }
            });

    }
    useEffect(()=>{
        AOS.init();
    })

    const [none,setNone]=useState('none')
    const [nonee,setNonee]=useState('block')

    return (
        <div data-aos="fade-up" data-aos-offset="300">
            <section className="interest">
           <div style={{display:nonee}}>
               <div className="container d-flex align-items-center justify-content-between">
                   <div>
                       <h4>Sizni qiziqtirdimi?</h4>
                       <p>Raqamingizni qoldiring, biz sizga yana qo'ng'iroq qilamiz</p>
                   </div>
                   <div>
                       <form onSubmit={submit}>
                           <div className="d-flex align-items-center inputs">
                               <div className="d-flex align-items-center justify-content-center phonee">
                                   <div className="phone-num"><h6 className="mb-0">+998</h6></div>
                                   <input
                                       ref={interestRef}
                                       type="number"
                                       placeholder="Raqamingizni yozing"
                                   />
                               </div>
                               <button type="submit">Yuborish</button>
                           </div>
                       </form>
                   </div>
               </div>
           </div>

            <div style={{display:none}}>
                <div className="container d-flex justify-content-center align-items-center">
                    <div>
                        <div>
                            <h4>{accept}</h4>
                            <p>{connect}</p>
                        </div>
                        <button onClick={()=>{
                            setNone('none')
                            setNonee('block')
                        }} className="ms-auto me-auto d-block">Ok</button>
                    </div>
                </div>
            </div>
        </section>
        </div>
        
    );
};

export default Interest;
