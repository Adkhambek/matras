import React, {useEffect, useRef, useState} from 'react';
import './technology.css'
import Col3 from "./Col3";
import './banners.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Admin from "../pages/Admin";
import axios from "axios";
import API from "../components/Api";
import {toast} from "react-toastify";

const Banners = () => {
    const Token = localStorage.getItem('Mydata')
    const [banners, setBanners] = useState([])
    const [file, setFile] = useState()
    const [text, setText] = useState()
    let [fileEdit, setFileEdit] = useState()
    const [none,setNone]=useState('static')
    const [addNone,setAddNone]=useState('none')
    const [nonee,setNonee]=useState('none')
    const [logo,setLogo]=useState('flex')
    const [link,setLink]=useState(null)
    // const [textEdit, setTextEdit] = useState()

    // const textEdit =useRef(edit.name)
    const [active,setActive]=useState(true)

    useEffect(() => {
        axios.get(API + '/api/banners/all', {
            headers: {
                'Authorization': Token
            }
        })
            .then((res) => {
                setBanners(res.data.data)
                console.log(res.data.data)
            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                    console.log(error.response.data.error);
                }
            });
    }, [])
    let onFileChange = (e) => {
        setFile(e.target.files[0])
        setAddNone('flex')
        setLogo('none')
    }
    let onTextChange = (e) => {
        setText(e.target.value)
    }

    let onFileChangeEdit = (e) => {
        setFileEdit(e.target.files[0])
        setNone('none')
        setNonee('flex')
        
       
    }
    // let onTextChangeEdit = (e) => {
    //     setTextEdit(e.target.value)
    // }

    const [ban, setBan] = useState(false)
    const [banEdit, setBanEdit] = useState(false)
    const openBan=()=>{
        setBan(true)
    }
    const closeBan=()=>{
        setBan(false)
    }
    const openBanEdit=()=>{
        setBanEdit(true)
    }
    const closeBanEdit=()=>{
        setBanEdit(false)
        setNone('static')
        setNonee('none')

    }
    const submit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append("image", file)
        formData.append("title", text)
        fetch(API + '/api/banners', {method: 'POST', body: formData, headers: {'Authorization': Token}})
            .then((res) => {
                res.json()
                if (res.status===201){
                    toast.success(res.statusText)
                }

                if (res.status===400){
                   toast.error('You can only add up to 4 data!')
                }
                
                setTimeout(function () {
                    window.location.reload()
                }, 2000);
                closeBan()


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
        axios.patch(API+"/api/banners/delete/"+item.id,{
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
    const textEdit =useRef(edit.name)
    const Edit = (id) => {
        axios.get(API+"/api/banners/"+id,{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setEdit(res.data.data)
                console.log(res.data.data)
                openBanEdit()
            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                    console.log(error.response.data.error);
                }
            });
        }
    
    const submitEdit = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append("image", fileEdit)
        data.append("title", textEdit.current.value)
        console.log(fileEdit)
        console.log(textEdit.current.value)
        fetch(API + '/api/banners/'+edit.id, {method: 'PATCH', body:data, headers: {'Authorization': Token}})
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
                setBanEdit('translateY(-110%)')

            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                    console.log(error.response.data.error);
                }
            });
    }
    if (localStorage.getItem('Mydata')) {
        return <>
            <section className="banners orders">
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
                                        onClick={() => {
                                            localStorage.removeItem('Mydata')
                                            window.location = '/admin'
                                        }}
                                        style={{backgroundColor: "transparent", border: "none"}}>
                                        <h6>Log Out</h6>
                                    </button>
                                </div>
                            </div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Matn</th>
                                    <th>Rasm</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {banners.map((item, index) => {
                                    return (
                                        <tr key={index.toString()}>
                                            <td>{item.title}</td>
                                            <td><img style={{width: '200px', height: "100px"}}
                                                     src={API + "/images/banner/" + item.image} alt=""/></td>
                                            <td>
                                                <div className="d-flex justify-content-between  align-items-center">
                                                    <div></div>
                                                    <div className="d-flex  align-items-center">
                                                        <button onClick={()=>{
                                                            Edit(item.id)
                                                        }} className="delete">
                                                            <img src="/assets/edit.png" alt=""/>
                                                        </button>
                                                        <button onClick={()=>{
                                                            DeleteItem(item)
                                                        }} style={{marginLeft: "10px"}} className="delete">
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
                            <button onClick={() => {
                                openBan()
                            }} className="add">Add
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Modal open={ban} onClose={closeBan} center>
                <div className="add-techno productadd">
                <h6 className="mb-4">Qo'shish</h6>
                <form
                    onSubmit={submit} >
                    
                        <div className="file-div">
                            
                            <div className="image-div">
                                <img style={{display:logo}} className="image-logo" src="/assets/file.png" alt="file"/>
                                <img style={{display:addNone}} width="50%" height="162"
                                    src={file? URL.createObjectURL(file) :''} 
                                    alt=""/>
                            </div>
                            <input className="file" type="file" onChange={onFileChange}/>
                        </div>
                        
                   
                        <p className="mt-0">Matn</p>
                        <input type="text" onChange={onTextChange} name={"detail"}/>
                        <button type="submit" className="add-button-techno d-block">Saqlash</button>
                   

                </form>
                </div>
            </Modal>
            <Modal open={banEdit} onClose={closeBanEdit} center>
                    <div className="add-techno productadd">
                        <h6 className="mb-4">Tahrirlash</h6>
                        <form
                            onSubmit={submitEdit}
                        >
                           <div className="file-div">
                               <div className="image-div">
                                    <img style={{display:none,borderRadius:10}}width="50%" height="162"
                                        src={API+'/images/banner/'+edit.image}
                                        alt="images"/>


                                   <img style={{display:nonee,borderRadius:10}} width="50%" height="162"
                                    src={fileEdit? URL.createObjectURL(fileEdit) :''} 
                                    alt="a"/>
                               </div>
                                <input  
                                    className="file"
                                    accept="image/*" onChange={onFileChangeEdit} required={true} type="file" />

                           </div>
                                
                                
                                
                           
                                <p className="mt-0">Matn</p>
                                <input defaultValue={edit.title}
                                        ref={textEdit}
                                    
                                    type="text"  name={"detail"}/>
                                <button type="submit" className="add-button-techno d-block">Saqlash</button>
                            

                        </form>
                    </div>
            </Modal>
        </>
    } else {
        return <Admin/>
    }

};

export default Banners;
