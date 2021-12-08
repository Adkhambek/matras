import React, {useEffect, useRef, useState} from 'react';
import Col3 from "./Col3";
import './categories.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Admin from "../pages/Admin";
import axios from "axios";
import API from "../components/Api";
import {toast} from "react-toastify";


const Categories = () => {
    const editRef=useRef(null)
    const Token=localStorage.getItem('Mydata')
    const [deleteCat,setDeleteCat]=useState(false)
    const [add,setAdd]=useState(false)
    const openDelete = () => {
      setDeleteCat(true)
    }
    const closeDelete = () => {
      setDeleteCat(false)
    }
    const openAdd = () => {
      setAdd(true)
    }
    const closeAdd = () => {
      setAdd(false)
    }



    const [models,setModels]=useState([])
    useEffect(()=>{
        axios.get(API+'/api/models/all',{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setModels(res.data.data)
            })
    },[])
    const addRef=useRef(null)
    const [isActive,setIsActive]=useState(false)
    const submitAdd=()=>{
        axios.post(API+'/api/models',{
            name:addRef.current.value,
            active:isActive
        },{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                console.log(res.data)
                toast.success(res.data.message)
                setTimeout(function () {
                    window.location.reload()
                }, 2000);
                closeAdd()
            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                    console.log(error.response.data.error);
                }
            });
    }

    const [items,setItems]=useState([])
    const DeleteCat = () => {
        axios.patch(API+"/api/models/delete/"+items.id,{
            items
        },{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                toast.success(res.data.message)
                setTimeout(function () {
                    window.location.reload()
                }, 2000);

            })
            .catch(error=>{
                console.log(error)
            })
    }
    const [edit,setEdit]=useState(false)
    const openEdit = () => {
      setEdit(true)
    }
    const closeEdit = () => {
        setEdit(false)
    }


    const [arr,setArr]=useState([])
    const Editt=(item)=>{
       axios.get(API+"/api/models/"+item.id,{
           headers:{
               'Authorization':Token
           }
       })
           .then((res)=>{
               setArr(res.data.data)
               openEdit()
                console.log(res.data.data)
           })
           .catch(function (error) {
            if (error.response) {
                toast.error(error.response.data.detail)
                toast.error(error.response.data.error)
                console.log(error.response.data.error);
            }
        });
           
    }

    

    const checked=true
    const unchecked=false
    const [sItem,setSitem]=useState([])
    const submitEdit = (che) => {
        axios.patch(API+'/api/models/'+sItem.id,{
            name:editRef.current.value,
            active:che==='1' ? checked:unchecked
        },{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                closeEdit()
                toast.success(res.data.message)
                setTimeout(function () {
                    window.location.reload()
                }, 2000);
            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                    console.log(error.response.data.error);
                }
            });
            
    }
    
    const Check = (id,che) => {
        axios.patch(API+"/api/models/active/"+id,{active:che==='1' ? checked:unchecked},{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                console.log(res.data)
                // toast.success(res.data.message)
                // setTimeout(function () {
                //     window.location.reload()
                // }, 2000);
            })
            .catch(error=>{
                console.log(error)
            })
    }

    if (localStorage.getItem('Mydata')){
        return <>
            <section className="categories orders">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <Col3/>
                        </div>
                        <div className="col-9">
                            <div className="search">
                                <div/>
                                <div className="userr-div">
                                    <div className="userr">
                                        <img src="/assets/userr.png" alt=""/>
                                    </div>
                                    <button
                                        onClick={()=>{
                                            localStorage.removeItem('Mydata')
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
                                    <th>Toifalar</th>
                                </tr>
                                </thead>
                                <tbody>
                                {models.map((item,index)=>{
                                    return(
                                        <tr key={index.toString()}>
                                            <td>
                                                <h6>{item.name}</h6>
                                                <div>
                                                    <button onClick={()=>{
                                                        Editt(item)
                                                        setSitem(item)
                                                        console.log(item.id)
                                                    }} className="delete">
                                                        <img src="/assets/edit.png" alt=""/>
                                                    </button>
                                                    <button onClick={()=>{
                                                        openDelete()
                                                        setItems(item)
                                                    }} className="delete">
                                                        <img src="/assets/delete.png" alt=""/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            <button onClick={openAdd} className="add">Add</button>
                        </div>
                    </div>
                </div>
            </section>
            <Modal open={deleteCat} onClose={closeDelete} center>
                <div className="delete-modal">
                    <h6>Haqiqatdan ham o’chirmoqchimisiz?</h6>
                    <div style={{marginTop:"22px",float:"right"}}>
                        <button onClick={()=>{
                            DeleteCat()
                            closeDelete()
                        }} className="yes">HA</button>
                        <button onClick={closeDelete} className="no">YO'Q</button>
                    </div>
                </div>
            </Modal>
            <Modal open={add} onClose={closeAdd} center>
                <div className="add-modal">
                    <h6>Qo'shsish</h6>
                    <p>Kategoriya nomi</p>
                    <input ref={addRef} type="text"/>

                    <div style={{marginTop:"25px"}} className="d-flex justify-content-between align-items-center">
                        <h5>Holat</h5>
                        <h3>
                            <div className="form-check form-switch">
                                <input onClick={()=>{
                                    setIsActive(!isActive)
                                    console.log(isActive)
                                }}
                                    style={isActive?{backgroundColor:"#12AF18",border:"1px solid #12AF18",borderRadius:"15px"}:{backgroundColor:"#fafafa",border:"1px solid #fafafa",borderRadius:"15px"}}
                                className="form-check-input"
                                    value={isActive}
                                    type="checkbox"
                                    id="flexSwitchCheckChecked"
                                    >
                                </input>
                             </div>
                        </h3>
                            
                            
                    </div>
                    <button onClick={submitAdd} className="add">
                        Add
                    </button>
                </div>
            </Modal>
            <Modal open={edit} onClose={closeEdit} center>
                <div className="add-modal">
                    <h6>Tahrirlash</h6>
                    <p>Kategoriya nomi</p>
                    <input defaultValue={arr.name}  ref={editRef} type="text"/>

                    <div style={{marginTop:"25px"}} className="d-flex justify-content-between align-items-center">
                        <h5>Holat</h5>
                        

                        <h1
                         onClick={()=>{
                            Check(arr.id,arr.is_active)
                        }}
                        >

                        {(() => {
                                                                switch (arr.is_active) {
                                                                    case "0":   return (
                                                                        <div>
                                                                            <div className="form-check form-switch">
                                                                                <input className="form-check-input"
                                                                                    value={unchecked}
                                                                                    type="checkbox"
                                                                                    id="flexSwitchCheckChecked"
                                                                                    checked
                                                                                    >
                                                                                </input>
                                                                            </div>
                                                                           
                                                                        </div>
                                                                    );
                                                                    case "1":  return (
                                                                        <div>
                                                                            
                                                                            <div className="form-check form-switch">
                                                                                <input className="form-check-input"
                                                                                    value={checked}
                                                                                    type="checkbox"
                                                                                    id="flexSwitchCheckChecked1"
                                                                                >
                                                                                </input>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                    default:
                                                                }
                                                            })()}

                        </h1>


                    </div>
                    <button
                        onClick={()=>{
                            submitEdit(arr.is_active)
                            console.log(editRef.current.value)
                        }}
                        className="add">
                       Edit
                    </button>
                </div>
            </Modal>
        </>
    }else {
        return <Admin/>
    }
};

export default Categories;
