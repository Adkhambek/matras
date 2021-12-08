import React, {useEffect, useRef, useState} from 'react';
import Col3 from "./Col3";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Admin from "../pages/Admin";
import axios from "axios";
import API from "../components/Api";
import {toast} from "react-toastify";

const StatisticsDashboard = () => {
    const experienceRef=useRef(null)
    const clientRef=useRef(null)
    const guaranteeRef=useRef(null)
    const deliveryRef=useRef(null)
    const Token=localStorage.getItem('Mydata')
    const [stats,setStats]=useState([])
    const [modal,setModal]=useState(false)
    const open = () => {
      setModal(true)
    }
    const close = () => {
        setModal(false)
    }
    useEffect(()=>{
        axios.get(API+'/api/statistics/all',{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setStats(res.data.data)
            })
    },[])
    const Submit=()=>{
        axios.patch(API+'/api/statistics',
            {
            experience:experienceRef.current.value,
            client:clientRef.current.value,
            guarantee:guaranteeRef.current.value,
            delivery:deliveryRef.current.value
        },
            {headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                toast.success(res.data.message)
                setTimeout(function () {
                    window.location.reload()
                }, 2000);
                close()
            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                    console.log(error.response.data.error);
                }
            });
    }
    if (localStorage.getItem('Mydata')){
        return <>
            <section className="orders productss">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <Col3/>
                        </div>
                        <div className="col-9">
                            <div className="search">
                                {/*<div className="input-div">*/}
                                {/*    <input placeholder="User" type="text"/>*/}
                                {/*    <img src="/assets/search.png" alt=""/>*/}
                                {/*</div>*/}
                                <div/>
                                <div className="userr-div">
                                    <div className="userr">
                                        <img src="/assets/userr.png" alt=""/>
                                    </div>
                                    <button
                                        onClick={()=>{
                                            localStorage.removeItem('Mydata')
                                            console.log(localStorage.getItem('Mydata'))
                                            window.location='/admin'
                                        }}
                                        style={{backgroundColor:"transparent",border:"none"}}>
                                        <h6>Log Out</h6>
                                    </button>
                                </div>
                            </div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>experience</th>
                                    <th>client</th>
                                    <th>guarantee</th>
                                    <th>delivery</th>
                                    <th></th>

                                </tr>
                                </thead>
                                <tbody>
                                        <tr>
                                            <td>{stats.experience}</td>
                                            <td>{stats.client}</td>
                                            <td>{stats.guarantee}</td>
                                            <td>{stats.delivery}</td>
                                            <td>
                                                <button onClick={()=>{
                                                    open()
                                                }} className="delete">
                                                    <img src="/assets/edit.png" alt=""/>
                                                </button>
                                            </td>
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <Modal open={modal} onClose={close} center>
               <div className="modal-stats productadd add-techno">
                  <div className="d-flex">
                      <div>
                          <h6 className="mb-3">experience</h6>
                          <input defaultValue={stats.experience} ref={experienceRef} required type="text"/>
                          <h6 className="mb-3">client</h6>
                          <input defaultValue={stats.client} ref={clientRef} required type="text"/>
                      </div>
                      <div style={{marginLeft:"20px"}}>
                          <h6 className="mb-3">guarantee</h6>
                          <input defaultValue={stats.guarantee} ref={guaranteeRef} required type="number"/>
                          <h6 className="mb-3">delivery</h6>
                          <input defaultValue={stats.delivery} ref={deliveryRef} required type="number"/>
                      </div>
                  </div>
                   <button
                       onClick={()=>{
                       Submit()
                   }}
                       className="add-button-techno w-100">Edit</button>
               </div>

            </Modal>
        </>
    }else {
        return <Admin/>
    }
};

export default StatisticsDashboard;
