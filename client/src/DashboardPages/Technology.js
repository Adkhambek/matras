import React, {useEffect, useRef, useState} from 'react';
import './technology.css'
import Col3 from "./Col3";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Admin from "../pages/Admin";
import axios from "axios";
import API from "../components/Api";
import {toast} from "react-toastify";

const Technology = () => {
    const Token=localStorage.getItem('Mydata')
    
    const [arr,setArr]=useState([])
    const [image,setImage]=useState()
    const [name,setName]=useState(null)
    const [video,setVideo]=useState(null)
    const [detail,setDetail]=useState(null)
   

    const [editImage,setEditImage]=useState()
     const [addNone,setAddNone]=useState('none')
    const [logo,setLogo]=useState('flex')
    const [none,setNone]=useState('static')
    const [nonee,setNonee]=useState('none')
    

    
    
    
    const onEditImageChange = (e) => {
        setEditImage(e.target.files[0])
        setNone('none')
        setNonee('flex')
    }

    const onNameChange = (e) => {
        setName(e.target.value)
    }
    const onVideoChange = (e) => {
        setVideo(e.target.value)
    }
    const onDetailChange = (e) => {
        setDetail(e.target.value)
    }
    
    const onImageChange = (e) => {
        setImage(e.target.files[0])
        setAddNone('flex')
        setLogo('none')
    }



    const [techno,setTechno]=useState(false)
    const openTechno = () => {
      setTechno(true)
    }
    const closeTechno = () => {
        setTechno(false)
    }
    const [technoEdit,setTechnoEdit]=useState(false)
    const openTechnoEdit = () => {
        setTechnoEdit(true)
    }
    const closeTechnoEdit = () => {
        setTechnoEdit(false)
        
    }
    const [data,setData]=useState([])

    useEffect(()=>{
        axios.get(API+"/api/technologies/all",{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setData(res.data.data)
            })

    }, [])
    const [isActive,setIsActive]=useState(false)
    const [editActive,setEditActive]=useState(false)
    const [editActiveOne,setEditActiveOne]=useState(true)
  
    const submitAdd=(e)=>{
        e.preventDefault()
        let formData=new FormData()
        console.log(formData)
        formData.append('image',image)
        formData.append('name',name)
        formData.append('video',video)
        formData.append('detail',detail)
        formData.append('active',isActive)
        fetch(API + '/api/technologies', {method: 'POST', body: formData, headers: {'Authorization': Token}})
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
                closeTechno()

            })
            .catch((error) => {
                console.log(error)
            });
        
    }

    const DeleteItem = (item) => {
        axios.patch(API+"/api/technologies/delete/"+item.id,{
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
   
    const editName=useRef(null)
    const editVideo=useRef(null)
    const editDetail=useRef(null)
    const EditItem = (id) => {
        console.log(id)
        axios.get(API+"/api/technologies/"+id,{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setArr(res.data.data)
                
                openTechnoEdit()
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


   
    
    
    
   
    const submitEdit=(e)=>{
        e.preventDefault()
        let formData=new FormData()
        console.log('yess')
        formData.append('image',editImage)
        formData.append('name',editName.current.value)
        formData.append('video',editVideo.current.value)
        formData.append('detail',editDetail.current.value)
        formData.append('active','true')
        
        fetch(API + '/api/technologies/'+arr.id, {method: 'PATCH', body: formData, headers: {'Authorization': Token}})
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
                closeTechno()

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
            <section className="technology orders">
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
                                    <th>Nomlari</th>
                                    <th>Matn</th>
                                    <th>Video</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((item,index)=>{
                                    return(
                                        <tr key={index.toString()}>
                                            <td>{item.name}</td>
                                            <td>{item.detail}</td>
                                            <td>{item.video}</td>
                                            <td >
                                                <div className="d-flex justify-content-between  align-items-center">
                                                    <div></div>
                                                    <div className="d-flex  align-items-center">
                                                        <button onClick={()=>{
                                                            EditItem(item.id)
                                                        }} className="delete">
                                                            <img src="/assets/edit.png" alt=""/>
                                                        </button>
                                                        <button onClick={()=>{
                                                            DeleteItem(item)
                                                        }} style={{marginLeft:"10px"}}  className="delete">
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
                                openTechno()
                            }} className="add">Add</button>
                        </div>
                    </div>
                </div>
            </section>
            <Modal open={techno} onClose={closeTechno} center>
                <div className="add-techno productadd">
                    <h6>Qo'shish</h6>
                    <form
                        onSubmit={submitAdd}
                        id="form">
                        <div 
                        // className="d-flex"
                        >
                            <div>
                                <p style={{marginTop:'10px'}}>Rasm</p>
                                <div className="file-div">
                                    <div className="image-div">
                                        <img style={{display:logo}} className="image-logo" src="/assets/file.png" alt="file"/>
                                        <img style={{display:addNone}} width="50%" height="162"
                                    src={image? URL.createObjectURL(image) :''} 
                                    alt=""/>
                                    </div>
                                    <input onChange={onImageChange}  className="file" type="file"/>
                                </div>



                                <p>Video</p>
                                <input onChange={onVideoChange}  type="text"/>
                                
                            </div>
                            <div>
                                <p style={{marginTop:'0'}}>Nomi</p>
                                <input onChange={onNameChange} type="text"/>
                                <p style={{marginTop:'0'}}>Matn</p>
                                <input onChange={onDetailChange}  type="text"/>
                                <div  className="d-flex align-items-center justify-content-between">
                                    <p className="mt-0 mb-0">Active</p>
                                    <h3>
                                        <div className="form-check form-switch">
                                            <input 
                                                 onClick={()=>
                                                  {
                                                    setIsActive(!isActive)
                                                    console.log(isActive)
                                                  }
                                                    
                                                }
                                                style={isActive?{backgroundColor:"#12AF18",border:"1px solid #12AF18"}:{backgroundColor:"#fafafa",border:"1px solid #fafafa"}}
                                                className="form-check-input"
                                                value={isActive}
                                                type="checkbox"
                                                id="flexSwitchCheckChecked"
                                            
                                                >
                                            </input>
                                        </div>
                                     </h3>
                                </div>
                            </div>
                            <button style={{width:"100%",marginTop:"0"}} type="submit" className="add-button-techno d-block">Add</button>
                            
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal open={technoEdit} onClose={closeTechnoEdit} center>
                <div className="add-techno productadd">
                    <h6>Tahrirlash</h6>
                    <form
                        onSubmit={
                            submitEdit
                        }
                        id="form">
                        <div className="d-flex">
                            <div>
                                <p>Nomi</p>
                                <input defaultValue={arr.name} ref={editName}  type="text"/>
                                <p>Matn</p>
                                <input defaultValue={arr.detail} ref={editDetail}   type="text"/>
                                <div style={{marginTop:"53px",paddingRight:"30px"}} className="d-flex align-items-center justify-content-between">
                                    <p className="mt-0 mb-0">Active</p>
                                    <h1
                                       
                                    >

                        {(() => {
                                                                switch (arr.is_active) {
                                                                    case "0":   return (
                                                                        <div>
                                                                            <div className="form-check form-switch">
                                                                                <input
                                                                                 onClick={()=>{
                                                                                    setEditActiveOne(!editActiveOne)
                                                                                    console.log(editActiveOne)
                                                                                }}
                                                                                className="form-check-input"
                                                                                    style={editActiveOne?{backgroundColor:"#fafafa",border:"1px solid #fafafa"}:{backgroundColor:"#12AF18",border:"1px solid #12AF18"}}
                                                                                   
                                                                                    type="checkbox"
                                                                                    id="flexSwitchCheckChecked"
                                                                                    
                                                                                    >
                                                                                </input>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    );
                                                                    case "1":  return (
                                                                        <div>
                                                                           
                                                                            <div className="form-check form-switch">
                                                                                <input
                                                                                    onClick={()=>{
                                                                                        setEditActive(!editActive)
                                                                                        console.log(editActive)
                                                                                    }}
                                                                                className="form-check-input"
                                                                                    style={editActive?{backgroundColor:"#12AF18",border:"1px solid #12AF18"}:{backgroundColor:"#fafafa",border:"1px solid #fafafa"}}
                                                                                    
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
                            </div>
                            <div>

                                <p>Rasm</p>
                                <div className="file-div">
                                    <div className="image-div">
                                    <img style={{display:none,borderRadius:10}}width="50%" height="162"
                                        src={API+'/images/technology/'+arr.thumbnail}
                                        alt="images"/>


                                   <img style={{display:nonee,borderRadius:10}} width="50%" height="162"
                                    src={editImage? URL.createObjectURL(editImage) :''} 
                                    alt="a"/>

                                    </div>
                                    <input onChange={onEditImageChange}  className="file" type="file"/>
                                </div>
                                


                                <p>Video</p>
                                <input defaultValue={arr.video} ref={editVideo}  type="text"/>
                                <button type="submit" className="add-button-techno d-block">edit</button>
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

export default Technology;
