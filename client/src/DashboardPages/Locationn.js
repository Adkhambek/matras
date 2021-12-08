import React, {useEffect, useRef, useState} from 'react';
import './locationn.css'
import Col3 from "./Col3";

import Admin from "../pages/Admin";
import axios from "axios";
import API from "../components/Api";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import {toast} from "react-toastify";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Locationn = () => {

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const [file,setFile]=useState([])
    const [fileEdit,setFileEdit]=useState([])
    const [addressEdit,setAddressEdit]=useState()
    const [targetEdit,setTargetEdit]=useState()
    const [locationEdit,setLocationEdit]=useState()
    const [editActive,setEdiActive]=useState(false)

    const [logo,setLogo]=useState('flex')
    const [addNone,setAddNone]=useState('none')

    const [none,setNone]=useState('static')
    const [nonee,setNonee]=useState('none')

    let onAddressEdit = (e) => {
        setAddressEdit(e.target.value)
    }
    let onTargetEdit = (e) => {
        setTargetEdit(e.target.value)
    }
    let onLocationEdit = (e) => {
        setLocationEdit(e.target.value)
    }

    const Token=localStorage.getItem('Mydata')
    const [address,setAddress]=useState([])
    useEffect(()=>{
        axios.get(API+"/api/address/all",{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setAddress(res.data.data)
            })

    }, [])
    const [loc,setLoc]=useState(false)
    const [locEdit,setLocEdit]=useState(false)

    let onFileChange = (e) => {

        setFile(e.target.files)
        setAddNone('flex')
        setLogo('none')
    }
    let onFileChangeEdit = (e) => {
        setFileEdit(e.target.files)
        setNone('none')
        setNonee('flex')
    }

    const [isActive,setIsActive]=useState(true)
    const submitLoc=(e)=>{
        e.preventDefault()
        let formData=new FormData()
        for (const files of file){
            formData.append("images",files)
        }
        formData.append('address',addressEdit)
        formData.append('target',targetEdit)
        formData.append('location',locationEdit)
        formData.append('active',isActive)
        console.log(formData)
        fetch(API + '/api/address', {method: 'POST', body:formData, headers: {'Authorization': Token}})
            .then((res) => {
                res.json()
                if(res.status===400){
                    toast.error(res.statusText)
                }else{
                    toast.success(res.statusText)
                }
                setLoc(false)
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
    const DeleteItem = (item) => {
        axios.patch(API+"/api/address/delete/"+item.id,{
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
    const [edit,setEdit]=useState([])
    
    const [image,setImage]=useState()

    const Edit = (item) => {
        console.log(item.id)
        axios.get(API+"/api/address/"+item.id,{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setEdit(res.data.data)
                setImage(res.data.data.images)
                
                setLocEdit(true)

               
            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                    console.log(error.response.data.error);
                }
            });
    }
    

    const addressRef=useRef(edit.address)
    const locationRef=useRef(edit.location)
    const targetRef=useRef(edit.target)
    const checked=true
    const unchecked=false
    const Check = (id,che) => {
        axios.patch(API+"/api/address/active/"+id,{active:che==='1' ? checked:unchecked},{headers:{
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
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                    console.log(error.response.data.error);
                }
            });
    }
    const submitLocEdit = (che) => {
        console.log(edit.id)
        let formData=new FormData()
        for (const files of fileEdit){
            formData.append("images",files)
        }
        formData.append('address',addressRef.current.value)
        formData.append('target',targetRef.current.value)
        formData.append('location',locationRef.current.value)
        formData.append('active',che==='1' ? checked:unchecked)



        fetch(API + '/api/address/'+edit.id, {method: 'PATCH', body:formData, headers: {'Authorization': Token}})
            .then((res) => {
                res.json()
                if(res.status===400){
                    toast.error(res.statusText)
                }else{
                    toast.success(res.statusText)
                }
                setTimeout(function () {
                    window.location.reload()
                }, 2000);
                setLocEdit(false)

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
        return  <>
            <section className="locationn orders">
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
                                    <th>Manzil</th>
                                    <th>Matn</th>
                                    <th>Location</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                    {address.map((item,index)=>{
                                        return(
                                            <tr key={index.toString()}>
                                                <td>{item.address}</td>
                                                <td>{item.target}</td>
                                                <td>{item.location}</td>
                                                <td >
                                                    <div className="d-flex justify-content-between  align-items-center">
                                                        <div></div>
                                                        <div className="d-flex  align-items-center">
                                                            <button onClick={()=>{
                                                                Edit(item)
                                                            }} className="delete">
                                                                <img src="/assets/edit.png" alt=""/>
                                                            </button>
                                                            <button
                                                                onClick={()=>{
                                                                    DeleteItem(item)
                                                                }}
                                                                style={{marginLeft:"10px"}}  className="delete">
                                                                <img src="/assets/delete.png" alt=""/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <button onClick={()=>{
                                setLoc(true)
                            }}  className="add">Add</button>
                        </div>
                    </div>
                </div>
            </section>
            <Modal open={loc} onClose={()=>{setLoc(false)}} center>
                <div  className="add-location productadd">
                    <h6>Qo'shish</h6>
                    <form
                        onSubmit={submitLoc}
                    >
                        <div className="row">
                            <div style={{marginTop:"-50px"}} className="col-4">
                                <div className="file-div">
                                    <div className="image-div">
                                            <img style={{display:logo}} className="image-logo" src="/assets/file.png" alt="file"/>
                                            
                                            
                                        </div>
                                        <Carousel
                                            style={{display:"none"}}
                                            // className="carusel"
                                            swipeable={false}
                                            draggable={false}
                                            showDots={true}
                                            responsive={responsive}
                                            ssr={true} // means to render carousel on server-side.
                                            infinite={true}
                                            autoPlay={true}
                                            autoPlaySpeed={2000}
                                            keyBoardControl={true}
                                            customTransition="all .5"
                                            transitionDuration={500}
                                            containerClass="carousel-container"
                                            removeArrowOnDeviceType={["tablet", "mobile"]}
                                            // deviceType={this.props.deviceType}
                                            dotListClass="custom-dot-list-style"
                                            itemClass="carousel-item-padding-40-px"
                                             >
                                                     <div>
                                                        <img  width="100%" height="162"
                                                        src={file[0] ? URL.createObjectURL(file[0]) :''} 
                                                        alt=""/>
                                                     </div>
                                                    <div>
                                                        <img  width="100%" height="162"
                                                        src={file[1] ? URL.createObjectURL(file[1]) :''} 
                                                        alt=""/>
                                                    </div>
                                                    <div>
                                                        <img  width="100%" height="162"
                                                        src={file[2] ? URL.createObjectURL(file[2]) :''} 
                                                        alt=""/>
                                                    </div>
                                                    
                                                    
                                             </Carousel>
                                    <input className="file" multiple onChange={onFileChange} required type="file"/>
                                </div>
                               

                                <div style={{marginTop:"15px"}} className="d-flex align-items-center justify-content-between">
                                    <p className="mt-0 mb-0">Holat</p>
                                    <h3>
                                <div className="form-check form-switch">
                                    <input onClick={()=>{
                                        setIsActive(!isActive)
                                        console.log(isActive)
                                    }} className="form-check-input"
                                        value={isActive}
                                        type="checkbox"
                                        id="flexSwitchCheckChecked"
                            
                                        >
                                    </input>
                                </div>
                            </h3>
                                </div>
                            </div>
                            <div className="col-4">
                                <p className="mt-0">Manzil</p>
                                <input onChange={onAddressEdit} type="text"/>
                                <p>Location</p>
                                <input onChange={onLocationEdit} type="text"/>

                            </div>
                            <div className="col-4">
                                <p className="mt-0">Matn</p>
                                <input onChange={onTargetEdit} type="text"/>
                                <button
                                    
                                    type="submit"
                                    className="add-location-button">Saqlash</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal open={locEdit} onClose={()=>{setLocEdit(false)}} center>
            <div  className="add-location productadd">
                
                <h6>Tahrirlash</h6>
                <form
                    onSubmit={()=>{
                        submitLocEdit(edit.is_active)
                    }}
                >
                    <div className="row">
                        <div className="col-4">
                            <div className="file-div">
                                <div className="image-div">
                                    <img style={{display:none,borderRadius:10}}width="50%" height="162"
                                            src={API+'/images/address/'+image}
                                            alt="images"/>


                                    <img style={{display:nonee,borderRadius:10}} width="50%" height="162"
                                        src={fileEdit[0]? URL.createObjectURL(fileEdit[0]) :''} 
                                        alt="a"/>
                                </div>
                           
                                             <input className="file"  onChange={onFileChangeEdit} multiple required type="file"/>
                            </div>
                            
                            <div style={{marginTop:"15px"}} className="d-flex align-items-center justify-content-between">
                                <p className="mt-0 mb-0">Holat</p>
                                <h3
                                    onClick={()=>{
                                        Check(edit.id,edit.is_active)
                                    }}
                                    >

                        {(() => {
                                                                switch (edit.is_active) {
                                                                    case "0":   return (
                                                                        <div>
                                                                            <div className="form-check form-switch">
                                                                                <input className="form-check-input"
                                                                                    value={checked}
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
                                                                                <input
                                                                                onClick={()=>{
                                                                                    setEdiActive(!editActive)
                                                                                }}
                                                                                className="form-check-input"
                                                                                style={editActive?{backgroundColor:"#12AF18",border:"1px solid #12AF18"}:{backgroundColor:"#fafafa",border:"1px solid #fafafa"}}
                                                                                    value={unchecked}
                                                                                    type="checkbox"
                                                                                    id="flexSwitchCheckChecked100"
                                                                                >
                                                                                </input>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                    default:
                                                                }
                                                            })()}

                        </h3>
                            </div>
                        </div>
                        <div className="col-4">
                            <p className="mt-0">Manzil</p>
                            <input defaultValue={edit.address}
                                ref={addressRef}
                                // onChange={onAddressEdit}
                                type="text"/>
                            <p>Location</p>
                            <input defaultValue={edit.location}
                                ref={locationRef}
                                // onChange={onLocationEdit}
                                type="text"/>

                        </div>
                        <div className="col-4">
                            <p className="mt-0">Matn</p>
                            <input defaultValue={edit.target}
                                ref={targetRef}
                                
                                type="text"/>
                            <button
                               
                                type="submit"
                                className="add-location-button">Saqlash</button>
                        </div>
                    </div>
                </form>
            </div>
            </Modal>
           
           
        </>
    }else {
        return <Admin/>
    }
};

export default Locationn;
