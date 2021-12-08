import React, {useEffect, useRef, useState} from 'react';
import './productss.css'
import Col3 from "./Col3";
import 'react-responsive-modal/styles.css';
import Admin from "../pages/Admin";
import axios from "axios";
import API from "../components/Api";
import {toast} from "react-toastify";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Products = () => {
    // console.log(React.version)
    const Token=localStorage.getItem('Mydata')

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
    
 

    const [logo,setLogo]=useState('flex')

    const [color,setColor]=useState('none')



    const [trans,setTrans]=useState('translateY(-110%)')
    const [transEdit,setTransEdit]=useState('translateY(-110%)')
    
    const [product,setProduct]=useState([])
    const [model,setModel]=useState([])
    const nameReq=()=>{
        axios.get(API+"/api/models",{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setModel(res.data.data)
                
            })
    }
    useEffect(()=>{
        axios.get(API+'/api/products/all',{headers:{
                'Authorization':Token
            }
        })
            .then((res)=>{
                setProduct(res.data.data)
              
            })
    },[])
    
    const [file,setFile]=useState([])
    const [fileEdit,setFileEdit]=useState([])


    const selectRef=useRef(null)
    const nameRef=useRef(null)
    const priceRef=useRef(null)
    const weightRef=useRef(null)
    const sizeRef=useRef(null)
    const guaranteeRef=useRef(null)
    const capacityRef=useRef(null)
    const discountPriceRef=useRef(null)
    const detailRef=useRef(null)
    const [navinla,setNavinla]=useState(false)
    const [active,setActive]=useState(false)
    const [discount,setDiscount]=useState(false)

    const [navinlaEdit,setNavinlaEdit]=useState(false)
    const [activeEdit,setActiveEdit]=useState(false)
    const [discountEdit,setDiscountEdit]=useState(true)

    const onChangeFile = (e) => {
      setFile(e.target.files)
    
        setLogo('none')
    }
    const onChangeFileEdit = (e) => {
        setFileEdit(e.target.files)
      }
    const submitAdd = (e) => {
        e.preventDefault();
        let formData=new FormData()
        for (const files of file){
            formData.append("images",files)
        }
        formData.append('name',nameRef.current.value)
        formData.append('currentPrice',priceRef.current.value)
        formData.append('weight',weightRef.current.value)
        formData.append('size',sizeRef.current.value)
        formData.append('guarantee',guaranteeRef.current.value)
        formData.append('capacity',capacityRef.current.value)
        formData.append('discountPrice',discountPriceRef.current.value)
        formData.append('detail',detailRef.current.value)
        formData.append('active',active)
        formData.append('navinla',navinla)
        formData.append('discount',discount)
        formData.append('modelId',selectRef.current.value)
        fetch(API + '/api/products', {method: 'POST', body: formData, headers: {'Authorization': Token}})
            .then((res) => {
                setTrans('translateY(-110%)')
                setColor('none')
                setTimeout(function () {
                    window.location.reload()
                }, 2000);
                
                
                if(res.status===400){
                    toast.error(res.statusText)
                }else{
                    toast.success(res.statusText)
                }
                
                
               return res.json()
            
                
            

            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                    console.log(error);
                }
            });
            
    }
    const DeleteItem = (item) => {
        axios.patch(API+"/api/products/delete/"+item.id,{
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

    const checked=true
    const unchecked=false
    const Check = (id,che) => {
       axios.patch(API+"/api/products/active/"+id,{active:che==='1' ? checked:unchecked},{headers:{
               'Authorization':Token
           }
       })
           .then((res)=>{
               console.log(res.data)
               toast.success(res.data.message)
               setTimeout(function () {
                   window.location.reload()
               }, 1500);
           })
           .catch(error=>{
               console.log(error)
           })
   }
    const [edit,setEdit]=useState([])
    const select_edit=useRef(null)
    const name_edit=useRef(null)
    const price_edit=useRef(null)
    const weight_edit=useRef(null)
    const size_edit=useRef(null)
    const guarantee_edit=useRef(null)
    const capacity_edit=useRef(null)
    const discount_edit=useRef(null)
    const detail_edit=useRef(null)




    const Edit=(id)=>{
        console.log(id)
        axios.get(API+"/api/products/"+id,{headers:{
            'Authorization':Token
        }
    })
        .then((res)=>{
            setEdit(res.data.data)
            setTransEdit('translateY(0)')
            setColor('flex')
            console.log(res.data.data)
        
        })
        .catch(error=>{
            console.log(error)
        })
    }
    const submitEdit=(e)=>{
       e.preventDefault();
        let formData=new FormData()
        for (const files of fileEdit){
            formData.append("images",files)
        }
        console.log(fileEdit)
        formData.append('name',name_edit.current.value)
        formData.append('currentPrice',price_edit.current.value)
        formData.append('weight',weight_edit.current.value)
        formData.append('size',size_edit.current.value)
        formData.append('guarantee',guarantee_edit.current.value)
        formData.append('capacity',capacity_edit.current.value)
        formData.append('discountPrice',discount_edit.current.value)
        formData.append('detail',detail_edit.current.value)
        formData.append('active',activeEdit)
        formData.append('navinla',navinlaEdit)
        formData.append('discount',discountEdit)
        formData.append('modelId',select_edit.current.value)
        console.log(select_edit.current.value)


        fetch(API + '/api/products/'+edit.id, {method: 'PATCH', body:formData, headers: {'Authorization': Token}})
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
                setTransEdit('translateY(-110%)')
                setColor('none')

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
                <div style={{display:color}} className="color"></div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <Col3/>
                        </div>
                        <div className="col-9">
                            <div className="search">
                                <div></div>
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
                                    <th>Mahsulot nomlari</th>
                                    <th>Toifalar</th>
                                    <th>Narxi</th>
                                    <th>Yuklama</th>
                                    <th>Razmeri</th>
                                    <th>Status</th>
                                    <th></th>

                                </tr>
                                </thead>
                                <tbody>
                                {product.map((item,index)=>{
                                    return(
                                        <tr key={index.toString()}>
                                            <td>{item.name}</td>
                                            <td>{item.model}</td>
                                            <td>{item.current_price}</td>
                                            <td>{item.weight}</td>
                                            <td>{item.size}</td>
                                            <td onClick={()=>{
                                                    Check(item.id,item.is_active)
                                                }}>
                                            {/* // is_active 0 bosa korinadi
                                            // is_active 1 bosa korinmidi */}
                                            
                                             {(() => {
                                                            switch (item.is_active) {
                                                                case "0":   return (
                                                                    <div>
                                                                        <div className="form-check form-switch">
                                                                            <input className="form-check-input"
                                                                                //    value={unchecked}
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
                                                                                //    value={checked}
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
                                            <td>
                                                <div>
                                                    <button onClick={()=>{
                                                        Edit(item.id)
                                                        nameReq()
                                                    }}  className="delete">
                                                        <img src="/assets/edit.png" alt=""/>
                                                    </button>
                                                    <button onClick={()=>{
                                                        DeleteItem(item)
                                                    }} style={{marginLeft:"10px"}} className="delete">
                                                        <img src="/assets/delete.png" alt=""/>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            <button  onClick={()=>{
                                nameReq()
                                setTrans('translateY(0)')
                                setColor('flex')
                            }} className="add mb-5">Add</button>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{transform:trans}} className="Add">
                <div className="productadd">
                    <button onClick={()=>{
                        setTrans('translateY(-110%)')
                        setColor('none')
                    }}  className="close">&times;</button>
                    <h6>Qo 'shish</h6>
                    <div className="container-fluid">
                        <form onSubmit={submitAdd}>
                            <div className="row">
                                <div className="col-3">
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
                                                    <div>
                                                        <img  width="100%" height="162"
                                                        src={file[3] ? URL.createObjectURL(file[2]) :''} 
                                                        alt=""/>
                                                    </div>
                                                    
                                                    
                                             </Carousel>
                                    <input className="file" multiple onChange={onChangeFile}  type="file"/>
                                </div>
                                    {/* <input onChange={onChangeFile} multiple type="file"/> */}
                                </div>
                                <div className="col-3">
                                    <p>Toifalar</p>
                                    <select  ref={selectRef}   required >
                                        {model.map((item,index)=>{
                                            return <option value={item.id} key={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                    <p>Tovar nomi</p>
                                    <input ref={nameRef} placeholder="masalan: Lux Soft Memory" type="text"/>
                                    <p>Narxi</p>
                                    <input ref={priceRef} placeholder="masalan: 20 000" type="number"/>
                                    <p>Yuklama</p>
                                    <input ref={weightRef} placeholder="masalan: 200 kg" type="text"/>
                                </div>
                                <div className="col-3">
                                    <p>Razmeri</p>
                                    <input ref={sizeRef} placeholder="masalan: 200 x 140 x 40" type="text"/>
                                    <p>Kafolat</p>
                                    <input ref={guaranteeRef} placeholder="masalan: 1 yil" type="text"/>
                                    <p>Sig’m</p>
                                    <input ref={capacityRef} placeholder="masalan: 2" type="number"/>
                                    <p>Aksiya Narxi</p>
                                    <div style={{height:"50px"}} className="input-add">
                                        <input style={{paddingBottom:"0",marginBottom:'0'}} className="input-add-input" ref={discountPriceRef} placeholder="masalan: 1 200 000" type="text"/>
                                        <h3>
                                        <div class="form-check">
                                             <input 
                                             onClick={()=>{
                                                setDiscount(!discount)
                                                console.log(discount)
                                            }}
                                            style={discount?{backgroundColor:"#12AF18",width:"30px",height:"30px",paddingLeft:"0",paddingRight:"0"}:{backgroundColor:"#fafafa",width:"30px",height:"30px",paddingLeft:"0",paddingRight:"0"}}
                                             class="form-check-input" 
                                             type="checkbox"  value={discount}
                                             id="flexCheckDefault"/>
                                        </div>
                                            
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <p>Ma'lumot</p>
                                    <textarea ref={detailRef} placeholder="Info">

                                </textarea>
                                    <div style={{marginTop:"25px"}} className="d-flex align-items-center justify-content-between">
                                        <p>Navinla</p>
                                        <h3>
                                            <div className="form-check form-switch">
                                                <input onClick={()=>{
                                                    setNavinla(!navinla)
                                                    console.log(navinla)
                                                }} className="form-check-input"
                                                    value={navinla}
                                                    style={navinla?{backgroundColor:"#12AF18"}:{backgroundColor:"#fafafa"}}
                                                     class="form-check-input" 
                                                    type="checkbox"
                                                    id="flexSwitchCheckChecked"
                                                    >
                                                </input>
                                            </div>
                                        </h3>
                                    </div>
                                    <div style={{marginTop:"25px"}} className="d-flex align-items-center justify-content-between">
                                        <p>Active</p>
                                        <h3>
                                            <div className="form-check form-switch">
                                                <input onClick={()=>{
                                                    setActive(!active)
                                                    console.log(active)
                                                }} className="form-check-input"
                                                 style={active?{backgroundColor:"#12AF18"}:{backgroundColor:"#fafafa"}}
                                                    value={active}
                                                    type="checkbox"
                                                    id="flexSwitchCheckChecked"
                                                    >
                                                </input>
                                            </div>
                                        </h3>
                                    </div>
                                    <button 
                                        className="add-buttton">
                                        Add
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{transform:transEdit}} className="Add">
                <div className="productadd">
                    <button onClick={()=>{
                        setTransEdit('translateY(-110%)')
                        setColor('none')
                    }}  className="close">&times;</button>
                    <h6>Tahrirlash</h6>
                    <div className="container-fluid">
                        <form
                            onSubmit={submitEdit}
                        >
                            <div className="row">
                                <div className="col-3">
                                    <input onChange={onChangeFileEdit} multiple type="file"/>
                                </div>
                                <div className="col-3">
                                    <p>Toifalar</p>
                                    <select defaultValue={edit.model_id} ref={select_edit}      required >
                                        {model.map((item,index)=>{
                                            return <option value={item.id} key={item.id}>{item.name}</option>
                                        })}
                                    </select>
                                    <p>Tovar nomi</p>
                                    <input defaultValue={edit.name} ref={name_edit} placeholder="masalan: Lux Soft Memory" type="text"/>
                                    <p>Narxi</p>
                                    <input defaultValue={edit.current_price} ref={price_edit} placeholder="masalan: 20 000" type="number"/>
                                    <p>Yuklama</p>
                                    <input defaultValue={edit.weight} ref={weight_edit} placeholder="masalan: 200 kg" type="text"/>
                                </div>
                                <div className="col-3">
                                    <p>Razmeri</p>
                                    <input defaultValue={edit.size} ref={size_edit} placeholder="masalan: 200 x 140 x 40" type="text"/>
                                    <p>Kafolat</p>
                                    <input defaultValue={edit.guarantee} ref={guarantee_edit} placeholder="masalan: 1 yil" type="text"/>
                                    <p>Sig’m</p>
                                    <input defaultValue={edit.capacity} ref={capacity_edit} placeholder="masalan: 2" type="number"/>
                                    <p>Aksiya Narxi</p>
                                    <div className="input-add">
                                        <input className="add-input" defaultValue={edit.discount_price} ref={discount_edit} placeholder="masalan: 1 200 000" type="text"/>
                                        {/* discount_price */}
                                        
                                       <div>
                                       {(() => {
                                                            switch (edit.status) {
                                                                case '0':   
                                                                return (
                                                                    <div>
                                                                       
                                                                       <div class="form-check">
                                                                            <input 
                                                                             onClick={()=>{
                                                                                setDiscountEdit(!discountEdit)
                                                                            }}
                                                                                class="form-check-input" 
                                                                                type="checkbox"
                                                                                style={discountEdit?{backgroundColor:"#12AF18"}:{backgroundColor:"#fafafa"}}
                                                                                value={discountEdit}  
                                                                                id="flexCheckDefault"/>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                );
                                                                case '1':   
                                                                return (
                                                                    <div>
                                                                       
                                                                       <div class="form-check">
                                                                            <input 
                                                                             onClick={()=>{
                                                                                setDiscountEdit(!discountEdit)
                                                                            }}
                                                                                class="form-check-input" 
                                                                                type="checkbox"
                                                                                value={discountEdit} 
                                                                                style={discountEdit?{backgroundColor:"#12AF18"}:{backgroundColor:"#fafafa"}}
                                                                                id="flexCheckDefault"/>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                );
                                                                case '2': 
                                                                 return (
                                                                    <div>
                                                                        <div class="form-check">
                                                                            <input
                                                                            onClick={()=>{
                                                                                setDiscountEdit(!discountEdit)
                                                                            }}
                                                                            style={discountEdit?{backgroundColor:"#12AF18"}:{backgroundColor:"#fafafa"}}
                                                                             class="form-check-input"
                                                                              type="checkbox" 
                                                                              value={discountEdit} 
                                                                              defaultChecked
                                                                              id="flexCheckDefault"/>
                                                                              
                                                                        </div>
                                                                    </div>
                                                                );
                                                                case '3': 
                                                                 return (
                                                                    <div>
                                                                        <div class="form-check">
                                                                            <input
                                                                            onClick={()=>{
                                                                                setDiscountEdit(!discountEdit)
                                                                            }}
                                                                            style={discountEdit?{backgroundColor:"#12AF18"}:{backgroundColor:"#fafafa"}}
                                                                             class="form-check-input"
                                                                              type="checkbox" 
                                                                              value={discountEdit} 
                                                                              defaultChecked
                                                                              id="flexCheckDefault"/>
                                                                              
                                                                        </div>
                                                                    </div>
                                                                );
                                                                default:
                                                            }
                                                        })()}
                                       </div>
                                        
                                        
                                    </div>
                                </div>
                                <div className="col-3">
                                    <p>Ma'lumot</p>
                                    <textarea defaultValue={edit.detail} ref={detail_edit} placeholder="Info">

                                </textarea>
                                    <div style={{marginTop:"25px"}} className="d-flex align-items-center justify-content-between">
                                        <p>Navinla</p>
                                        {(() => {
                                                            switch (edit.status) {
                                                                case '0':   
                                                                return (
                                                                    <div>
                                                                       
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                            onClick={()=>{
                                                                                setNavinlaEdit(!navinlaEdit)
                                                                            }} className="form-check-input"
                                                                                   value={navinlaEdit}
                                                                                   type="checkbox"
                                                                                   id="flexSwitchCheckChecked5"
                                                                                   style={navinlaEdit?{backgroundColor:"#fafafa"}:{backgroundColor:"#12AF18"}}
                                                                                   >
                                                                            </input>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                );
                                                                case '1': 
                                                                 return (
                                                                    <div>
                                                                      
                                                                    
                                                                        <div className="form-check form-switch">
                                                                            <input 
                                                                            onClick={()=>{
                                                                                setNavinlaEdit(!navinlaEdit)
                                                                            }}
                                                                            className="form-check-input"
                                                                                   value={navinlaEdit}
                                                                                   type="checkbox"
                                                                                   id="flexSwitchCheckChecked6"
                                                                                   defaultChecked
                                                                                   style={navinlaEdit?{backgroundColor:"#fafafa"}:{backgroundColor:"#12AF18"}}
                                                                            >
                                                                            </input>
                                                                        </div>
                                                                    </div>
                                                                );
                                                                case '2': 
                                                                 return (
                                                                    <div>
                                                                       
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                            onClick={()=>{
                                                                                setNavinlaEdit(!navinlaEdit)
                                                                            }}
                                                                            className="form-check-input"
                                                                                   value={navinlaEdit}
                                                                                   type="checkbox"
                                                                                   id="flexSwitchCheckChecked5"
                                                                                   style={navinlaEdit?{backgroundColor:"#fafafa"}:{backgroundColor:"#12AF18"}}
                                                                                   >
                                                                            </input>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                );
                                                                case '3': 
                                                                 return (
                                                                    <div>
                                                                      
                                                                    
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                            onClick={()=>{
                                                                                setNavinlaEdit(!navinlaEdit)
                                                                            }}
                                                                            className="form-check-input"
                                                                                   value={navinlaEdit}
                                                                                   type="checkbox"
                                                                                   id="flexSwitchCheckChecked6"
                                                                                   defaultChecked
                                                                                   style={navinlaEdit?{backgroundColor:"#fafafa"}:{backgroundColor:"#12AF18"}}
                                                                            >
                                                                            </input>
                                                                        </div>
                                                                    </div>
                                                                );
                                                                default:
                                                            }
                                                        })()}
                                       
                                    </div>
                                    <div style={{marginTop:"25px"}} className="d-flex align-items-center justify-content-between">
                                        <p>Active</p>
                                        
                                        <div>
                                       {(() => {
                                                            switch (edit.is_active) {
                                                                case '1':   
                                                                return (
                                                                    <div>
                                                                       
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                             onClick={()=>{
                                                                                setActiveEdit(!activeEdit)
                                                                            }} className="form-check-input"
                                                                                   value={activeEdit}
                                                                                   style={activeEdit?{backgroundColor:"#fafafa"}:{backgroundColor:"#12AF18"}}
                                                                                   type="checkbox"
                                                                                   id="flexSwitchCheckChecked5"
                                                                                   >
                                                                            </input>
                                                                        </div>
                                                                        
                                                                    </div>
                                                                );
                                                                case '0': 
                                                                 return (
                                                                    <div>
                                                                      
                                                                    
                                                                        <div className="form-check form-switch">
                                                                            <input
                                                                             onClick={()=>{
                                                                                setActiveEdit(!activeEdit)
                                                                            }} className="form-check-input"
                                                                                   value={activeEdit}
                                                                                   type="checkbox"
                                                                                   id="flexSwitchCheckChecked6"
                                                                                   style={activeEdit?{backgroundColor:"#fafafa"}:{backgroundColor:"#12AF18"}}
                                                                                   defaultChecked
                                                                            >
                                                                            </input>
                                                                        </div>
                                                                    </div>
                                                                );
                                                                default:
                                                            }
                                                        })()}
                                       </div>
                                    </div>
                                    <button  type="submit"
                                        className="add-buttton">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    }else {
        return <Admin/>
    }
};

export default Products;
