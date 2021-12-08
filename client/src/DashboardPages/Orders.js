import React, {useEffect, useRef, useState} from 'react';
import './orders.css'
import Col3 from "./Col3";
import Admin from "../pages/Admin";
import axios from "axios";
import API from "../components/Api";
import {toast} from "react-toastify";
import { NavLink} from 'react-router-dom'



const Orders = () => {
    const Token=localStorage.getItem('Mydata')
    const [searchs,setSearchs]=useState([])
    const [orderss,setOrderss]=useState([])
    const [names,setNames]=useState([])
    const [none,setNone]=useState('flex')
    const [table,setTable]=useState(true)
    const [info,setInfo]=useState('')


    useEffect(()=>{
        axios.get(API+"/api/orders/page/1",{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setNames(res.data.data)
                setSearchs([])
            })

    }, [])
    
    const ReqPage = (id) => {
        axios.get(API+"/api/orders/page/"+id,{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setOrderss(res.data.data)
                setSearchs([])
            })
        setNames([])
    }


    //-----------------------------------------------------------------------------------------------

    const [len,setLen]=useState([])
    const arr=[]
    const nums=Math.floor(len.length/8)+1
    for (let i=1;i<=nums;i++){
        arr.push(i)
    }



    

    useEffect(()=>{
       
        axios.get(API+'/api/orders',{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setLen(res.data.data)
               

            })
            .catch(err=>{
                console.log(err)
            })
    },[])


    


    const inputRef=useRef(null)
    const Search = () => {
       axios.get(API+"/api/orders/search?key="+inputRef.current.value,{headers:{
               'Authorization':Token
           }
       })
           .then((res)=>{
               setNone('none')
               setTable(false)
               console.log(res.data)
               console.log(names)
               setOrderss([])
               setNames([])
               setSearchs(res.data.data)


           })
           .catch(function (error) {
               setNone('none')
               setTable(false)
               if (error.response) {
                   toast.error(error.response.data.error)
                   setInfo(error.response.data.error)
                   console.log(error.response.data);
                   if (error.response.data.statusCode===404){
                      setSearchs(null)

                   }
               }
              
           });
   }

    const checked='checked'
    const unchecked='unchecked'
    const Check = (id,che) => {
       axios.patch(API+"/api/orders/check/"+id,{check:che==='0' ? checked:unchecked},{headers:{
               'Authorization':Token
           }
       })
           .then((res)=>{
               console.log(res.data)
               toast.success(res.data.message)
               setTimeout(function () {
                   window.location.reload()
               }, 2000);
           })
           .catch(error=>{
               console.log(error)
           })
   }
    const [isActive,setIsActive]=useState(null)
   
    const Active = (id) => {
        setIsActive(id)
        
    }


    if (localStorage.getItem('Mydata')){
        return (
            <section className="orders">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <Col3/>
                        </div>
                        <div className="col-9">
                            <div className="search">
                                <div className="input-div">
                                    <input required={true} ref={inputRef} placeholder="User" type="search"/>
                                    <img onClick={()=>{
                                        Search()
                                    }}  src="/assets/search.png" alt=""/>
                                </div>
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
                            <div style={{display:table? 'flex':'none'}}>
                                <table  className="table">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Ismi</th>
                                        <th>Telefon raqami</th>
                                        <th>Mahsulot nomlari</th>
                                        <th>Miqdor</th>
                                        <th>Qayta aloqa</th>
                                    </tr>
                                    </thead>

                                    {names?<tbody> {names.map((item,index)=>{
                                        return(
                                            <tr key={index.toString()}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.tel}</td>
                                                <td>{item.product}</td>
                                                <td>{item.amount}</td>
                                                <td onClick={()=>{
                                                    Check(item.id,item.is_checked)
                                                }}>
                                                    {(() => {
                                                            switch (item.is_checked) {
                                                                case "0":   return (
                                                                    <div>
                                                                        <div className="form-check form-switch">
                                                                            <input className="form-check-input"
                                                                                   value={unchecked}
                                                                                   type="checkbox"
                                                                                   id="flexSwitchCheckChecked"
                                                                                   checked>
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
                                                </td>
                                            </tr>
                                        )
                                    })}</tbody>:<td>Hech nima yoq</td>}

                                    {orderss?<tbody>{orderss.map((item,index)=>{
                                        return(
                                            <tr key={index.toString()}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.tel}</td>
                                                <td>{item.product}</td>
                                                <td>{item.amount}</td>
                                                <td onClick={()=>{
                                                    Check(item.id,item.is_checked)
                                                }}>
                                                    {(() => {
                                                            switch (item.is_checked) {
                                                                case "0":   return (
                                                                    <div>
                                                                        <div className="form-check form-switch">
                                                                            <input className="form-check-input"
                                                                                   value={unchecked}
                                                                                   type="checkbox"
                                                                                   id="flexSwitchCheckChecked3"
                                                                                   checked>
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
                                                                                   id="flexSwitchCheckChecked4"
                                                                            >
                                                                            </input>
                                                                        </div>
                                                                    </div>
                                                                );
                                                                default:
                                                            }
                                                        })()}
                                                </td>
                                            </tr>
                                        )
                                    })}</tbody>:<tbody><tr><td>Hech nima yoq</td></tr></tbody>}
                                </table>
                            </div>

                                <div style={{display:table? 'none':'flex'}}>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Ismi</th>
                                            <th>Telefon raqami</th>
                                            <th>Mahsulot nomlari</th>
                                            <th>Miqdor</th>
                                            <th>Qayta aloqa</th>
                                        </tr>
                                    </thead>
                                    {searchs?<tbody>{searchs.map((item,index)=>{
                                        return(
                                            <tr key={index.toString()}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.tel}</td>
                                                <td>{item.product}</td>
                                                <td>{item.amount}</td>
                                                <td onClick={()=>{
                                                    Check(item.id,item.is_checked)
                                                }}>
                                                    {(() => {
                                                            switch (item.is_checked) {
                                                                case "0":   return (
                                                                    <div>
                                                                        <div className="form-check form-switch">
                                                                            <input className="form-check-input"
                                                                                   value={unchecked}
                                                                                   type="checkbox"
                                                                                   id="flexSwitchCheckChecked5"
                                                                                   checked>
                                                                            </input>
                                                                        </div>
                                                                        {/*<input value={unchecked} type="text"/>*/}
                                                                        {/*unchecked*/}
                                                                    </div>
                                                                );
                                                                case "1":  return (
                                                                    <div>
                                                                        {/*<input value={checked} type="text"/>*/}
                                                                        <div className="form-check form-switch">
                                                                            <input className="form-check-input"
                                                                                   value={checked}
                                                                                   type="checkbox"
                                                                                   id="flexSwitchCheckChecked6"
                                                                            >
                                                                            </input>
                                                                        </div>
                                                                    </div>
                                                                );
                                                                default:
                                                            }
                                                        })()}
                                                </td>
                                               
                                            </tr>
                                        )
                                    })}</tbody>:<tbody><tr><td>{info}</td></tr></tbody>}
                                </table>
                            </div>


                            <div style={{display:none}} className="nums">
                                {arr.map((item,index)=>{
                                    
                                    let num =index+1
                                    let link='/dashboard/orders/'+num
                                    return(
                                        <NavLink to={link} onClick={()=>{
                                           
                                            console.log(index)
                                            ReqPage(index+1)
                                            Active(index)
                                            
                                            
                                        }}
                                            className={isActive===index ? 'activeh1':''}
                                            key={index.toString()}>{item}</NavLink>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }else {
        return <Admin/>
    }

};

export default Orders;
