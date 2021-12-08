import React, {useState,useEffect,useRef} from 'react';
import './customers.css'
import Col3 from "./Col3";
import Admin from "../pages/Admin";
import axios from "axios";
import API from "../components/Api";
import {toast} from "react-toastify";
import { NavLink } from 'react-router-dom';

const Сustomers = () => {
    const Token=localStorage.getItem('Mydata')
    const [custom,setCustom]=useState([])
    const [customPage,setCustomPage]=useState([])
    const [table,setTable]=useState(true)
    const [none,setNone]=useState('flex')
    const [info,setInfo]=useState('')
    const arr=[]
    useEffect(()=>{
        axios.get(API+'/api/interests',{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setCustom(res.data.data)
            })
    },[])
    const nums=Math.floor(custom.length/8)+1
    for (let i=1;i<=nums;i++){
        arr.push(i)
    }
    const ReqCustom=(id)=>{
        axios.get(API+"/api/interests/page/"+id,{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setCustomPage(res.data.data)
                setFirst([])
                setSearchCustom([])
            })
        console.log(customPage)
    }
    const [first,setFirst]=useState([])
    useEffect(()=>{
        axios.get(API+"/api/interests/page/1",{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setFirst(res.data.data)
                setSearchCustom([])
                // setSearchs([])
            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                    console.log(error.response.data.error);
                }
            });

    }, [])
    const [searchCustom,setSearchCustom]=useState([])
    const searchRef=useRef(null)
    const SearchC = () => {
        axios.get(API+"/api/interests/search?key="+searchRef.current.value,{headers:{
                'Authorization':Token
                
            }
        })
            .then((res)=>{
                setNone('none')
                setTable(false)
                setSearchCustom(res.data.data)
                setCustomPage([])
                setFirst([])
                console.log(searchCustom)
            })
            .catch(function (error) {
                setNone('none')
                setTable(false)
            if (error.response) {
                setInfo(error.response.data.error)
                toast.error(error.response.data.error)
                
                if (error.response.data.statusCode=404){
                    setSearchCustom(null)

                }
            }
            
        });
    }
    const Delete = (item) => {
        axios.patch(API+"/api/interests/delete/"+item.id,{
           item
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
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                    console.log(error.response.data.error);
                }
            });
    }
    const checked='checked'
    const unchecked='unchecked'
    const Check = (id,che) => {
        axios.patch(API+"/api/interests/check/"+id,{check:che==='0' ? checked:unchecked},{headers:{
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
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                    console.log(error.response.data.error);
                }
            });
    }
    const [isActive,setIsActive]=useState(null)

    const Active = (index) => {
        setIsActive(index)
        console.log(index)
    }

    if (localStorage.getItem("Mydata")){
        return  <section className="customers orders">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <Col3/>
                    </div>
                    <div className="col-9">
                        <div className="search">
                            <div className="input-div">
                                <input ref={searchRef} placeholder="Tel" type="number"/>
                                <img onClick={()=>{
                                    SearchC()
                                }} src="/assets/search.png" alt=""/>
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
                        <div style={{display:table?'flex':'none'}}>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Sana</th>
                                    <th>Telefon raqami</th>
                                    <th>Qayta aloqa</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>

                                {
                                    first
                                        ?
                                        <tbody>{first.map((item,index)=>{
                                            return(
                                                <tr key={index.toString()}>
                                                    <td>{item.id}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.tel}</td>
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
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <button onClick={()=>{
                                                            Delete(item)
                                                        }} className="delete">
                                                            <img src="/assets/delete.png" alt=""/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}</tbody>
                                        :
                                        <div><h1 className="text-center">Hech nima yoq</h1></div>

                                }

                                {
                                    customPage
                                        ?
                                        <tbody>{customPage.map((item,index)=>{
                                            return(
                                                <tr key={index.toString()}>
                                                    <td>{item.id}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.tel}</td>
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
                                                                                   id="flexSwitchCheckChecked2"
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
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <button onClick={()=>{
                                                            Delete(item)
                                                        }} className="delete">
                                                            <img src="/assets/delete.png" alt=""/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}</tbody>
                                        :
                                        <div><h1 className="text-center">Hech nima yoq</h1></div>
                                }

                                {
                                    searchCustom
                                        ?
                                        <tbody>{searchCustom.map((item,index)=>{
                                            return(
                                                <tr key={index.toString()}>
                                                    <td>{item.id}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.tel}</td>
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
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>
                                                        <button onClick={()=>{
                                                            Delete(item)
                                                        }} className="delete">
                                                            <img src="/assets/delete.png" alt=""/>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })}</tbody>
                                        :
                                        <div><h1 className="text-center">Hech nima yoq</h1></div>
                                }

                            </table>
                        </div>
                       <div style={{display:table?'none':'flex'}}>
                           <table className="table">
                               <thead>
                               <tr>
                                   <th>ID</th>
                                   <th>Sana</th>
                                   <th>Telefon raqami</th>
                                   <th>Qayta aloqa</th>
                                   <th></th>
                                   <th></th>
                                   <th></th>
                                   <th></th>
                               </tr>
                               </thead>
                               {
                                   searchCustom
                                       ?
                                       <tbody>{searchCustom.map((item,index)=>{
                                           return(
                                               <tr key={index.toString()}>
                                                   <td>{item.id}</td>
                                                   <td>{item.date}</td>
                                                   <td>{item.tel}</td>
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
                                                   <td></td>
                                                   <td></td>
                                                   <td></td>
                                                   <td>
                                                       <button onClick={()=>{
                                                           Delete(item)
                                                       }} className="delete">
                                                           <img src="/assets/delete.png" alt=""/>
                                                       </button>
                                                   </td>
                                               </tr>
                                           )
                                       })}</tbody>
                                       :
                                       <tbody><tr><td>{info}</td></tr></tbody>
                               }
                           </table>
                       </div>
                        <div style={{display:none}} className="nums">
                            {arr.map((item,index)=>{
                                let link='/dashboard/customers/'+(index+1)
                                return(
                                    <NavLink to={link} onClick={()=>{
                                        ReqCustom(index+1)
                                        Active(index)
                                    }}
                                    className={isActive===index ? 'activeh1':''} key={index.toString()}>{item}</NavLink>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }
    else {
        return <Admin/>
    }
};

export default Сustomers;
