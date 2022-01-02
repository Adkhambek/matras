import React, {useState, useEffect, useRef} from 'react';
import './products.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from "axios";
import API from "./Api";
import {toast} from "react-toastify";
import AOS from 'aos';
import "aos/dist/aos.css"

const Products = () => {
    useEffect(()=>{
        AOS.init();
    })
    const nameRef = useRef(null)
    const numberRef=useRef(null)
    const productIdRef=useRef(null)
    const amountRef=useRef(null)
    const [connect,setConnect]=useState('')
    const [order,setOrder]=useState([])
    const [modalOne,setModalOne]=useState(false)
    const openModalOne=()=>{
        setModalOne(true)
    }
    const closeModalOne=()=>{
        setModalOne(false)
    }


    const [menuItemOne, setMenuItemOne]=useState([])
    const [buttons,setButtons]=useState([])
    const [all,setAll]=useState([])
    const [allOne,setAllOne]=useState([])


    const [value,setValue]=useState(1)
    const [modal,setModal]=useState(false)
    const [model,setModel]=useState(false)

    const [selectImg,setSelectImg]=useState([])

    const [modelId,setModelId]=useState(0)

    const openModal=()=>{
        setModal(true)

    }
    const closeModal=()=>{
        setModal(false)
    }
    const openModel=()=>{
        setModel(true)
    }
    const closeModel=()=>{
        setModel(false)
    }
    useEffect(()=>{
            axios.get(API+"/api/models")
                .then((res)=>{
                    setButtons(res.data.data)
                })

        }, [])
    useEffect(()=>{
            axios.get(API+"/api/products")
                .then((res)=>{
                    setAll(res.data.data)
                })

        }, [])
    const All = () => {
        axios.get(API+"/api/products")
            .then((res)=>{
                setAllOne(res.data.data)
            })
        setMenuItemOne([])
        setAll([])
    }
    const Req=(id)=>{
        axios.get(API+"/api/products/model/"+id)
            .then((res)=>{
                setMenuItemOne(res.data.data)
            })
        setAll([])
        setAllOne([])
    }



    const submit=(e)=>{
        e.preventDefault()
        axios.post(API+"/api/orders",{
            name:nameRef.current.value,
            phone:numberRef.current.value,
            productId:productIdRef.current.value,
            amount:amountRef.current.value

        })
            .then((res)=>{
                toast.success(res.data.message.accept)

                setConnect(res.data.message.connect)
                if (res.data.statusCode=201){
                    closeModal()
                    openModalOne()
                }

            })
            .catch(function (error) {
                if (error.response) {
                    toast.error(error.response.data.detail)
                    toast.error(error.response.data.error)
                }
            });

    }

    function ReqOne(id) {
        axios.get(API+"/api/products/name/"+id)
            .then((res)=>{
                setOrder(res.data.data)
            })
    }
    function Images(id){
        axios.get(API+"/api/products/images/"+id)
            .then((res)=>{
                setSelectImg(res.data.data.images)
            })
    }
    const[num,setNum]=useState(1)
    const [isActive,setIsActive]=useState(null)
    const Active = (id) => {
      setIsActive(id)
        setActiv(false)
    }
    const [activ,setActiv]=useState(true)
    const ActiveSec = () => {
      if (isActive>=0){
          setIsActive(null)
          setActiv(true)
      }
    }

    return (
        <>
        <div data-aos="fade-up" data-aos-offset="300">
        <section id="products" className="products">
                <div id="products" className="container">
                    <h1 className="title">Bizning mahsulotlar</h1>
                    <div className="d-flex justify-content-between buttons">
                        <button className={activ?'active':''} onClick={()=>{
                            All()
                            ActiveSec()
                        }}>Hammasi</button>
                        {buttons.map((item,index)=>
                            (
                                <button onClick={()=>{
                                    Req(item.id)
                                    Active(index)
                                }} className={isActive===index ? 'active':''} key={index.toString()}>{item.name}</button>
                            )
                        )}

                    </div>
                    <div>
                       <div className="row">
                           {all.map((item,index)=>
                               (
                                   <div  key={index.toString()} className="col-12 mt-2">
                                       <div className="left">
                                           <div className="">
                                               {(() => {
                                                   switch (item.status) {
                                                       case '0':
                                                           return (
                                                               <div className="d-flex align-items-center justify-content-between zoom">
                                                                   <div></div>
                                                                   <div onClick={()=>{
                                                                       Images(item.id)
                                                                       openModel()
                                                                   }} className="action-button"><img style={{marginTop:"0",width:"32px",height:"32px"}} src="/assets/zoom.png" alt=""/></div>
                                                               </div>
                                                           )
                                                       case '1':
                                                           return (
                                                               <div className="d-flex align-items-center justify-content-between zoom">
                                                                   <button>YANGI MAHSULOT</button>
                                                                   <div onClick={()=>{
                                                                       Images(item.id)
                                                                       openModel()
                                                                   }} className="action-button"><img style={{marginTop:"0",width:"32px",height:"32px"}} src="/assets/zoom.png" alt=""/></div>
                                                               </div>
                                                           )
                                                       case '2':
                                                           return (
                                                               <div className="d-flex align-items-center justify-content-between zoom">
                                                                   <button style={{backgroundColor:"#1FCA25"}}>AKSIYA</button>
                                                                   <div onClick={()=>{
                                                                       Images(item.id)
                                                                       openModel()
                                                                   }} className="action-button"><img style={{marginTop:"0",width:"32px",height:"32px"}} src="/assets/zoom.png" alt=""/></div>
                                                               </div>
                                                           )
                                                       default:
                                                           return (
                                                               <div className="d-flex align-items-center justify-content-between zoom">
                                                                   <div className="d-flex align-items-center justify-content-start">
                                                                       <button>YANGI MAHSULOT</button>
                                                                       <button style={{backgroundColor:"#1FCA25"}} className="ms-2">AKSIYA</button>
                                                                   </div>
                                                                   <div onClick={()=>{
                                                                       Images(item.id)
                                                                       openModel()
                                                                   }} className="action-button">
                                                                       <img style={{marginTop:"0",width:"32px",height:"32px"}} src="/assets/zoom.png" alt=""/>
                                                                   </div>
                                                               </div>
                                                           )
                                                   }

                                               })()}
                                           </div>
                                           <img src={API + "/images/product/" +item.images} alt=""/>
                                       </div>
                                       <div className="right">
                                           <h6 className='main-title'>{item.name}</h6>
                                           <div className="d-flex justify-content-between align-items-center mt-3 info-main">
                                               <div className="infos first-infos">
                                                   <div className='info'>
                                                       <h6>Yuklama</h6>
                                                       <span>{item.weight}</span>
                                                       <span className="sub-span">kg</span>
                                                   </div>
                                                   <div className='info'>
                                                       <h6>Kafolat</h6>
                                                       <span>{item.guarantee}</span>
                                                       <span className="sub-span">yil</span>
                                                   </div>
                                               </div>
                                               <div className="infos second-infos">
                                                   <div className='info'>
                                                       <h6>O'lchami</h6>
                                                       <span>{item.size}</span>
                                                   </div>
                                                   <div className='info'>
                                                       <h6>Sig’imi</h6>
                                                       <span>{item.capacity}</span>
                                                       <span className="sub-span">kishilik</span>
                                                   </div>
                                               </div>
                                           </div>
                                           <p>{item.detail}</p>
                                           <div className="price">
                                               <h6 className="mb-0">Narxi</h6>
                                               <div className="d-flex align-items-center ">
                                                   {item.discount_price ==0
                                                       ?
                                                       <div className="d-flex align-items-end">
                                                           <span>{item.current_price}</span>
                                                           <span className="sub-span">so'm</span>
                                                       </div>
                                                       :
                                                       <div className="d-flex align-items-center">
                                                           <div className="d-flex align-items-end">
                                                               <span className="pricee">{item.current_price}<div className="line"/></span>
                                                               <span className="sub-span priceee">so'm</span>

                                                           </div>
                                                           <h6 className="new-price">{item.discount_price}</h6>
                                                           <span className="sub-span">so'm</span>
                                                       </div>
                                                   }
                                               </div>
                                           </div>
                                           <button onClick={()=>{
                                               ReqOne(item.id)
                                               openModal()
                                               setValue(1)
                                           }}>Buyurtma berish <img src="/assets/cart.png" alt=""/></button>
                                       </div>
                                   </div>
                               )
                           )}
                       </div>
                        {all.length===0 &&allOne.length===0 ?
                            <div className="row">
                                {menuItemOne.length===0?<h1 style={{fontSize:"15px"}} className="none-product">Bu kategoriyada mahsulot yo'q</h1>:
                                <div className="row">
                                    {menuItemOne.map((item,index)=>{
                                        return(
                                            <div  key={index.toString()} className="col-12 mt-2">
                                                <div className="left">
                                                    <div className="">
                                                        {(() => {
                                                            switch (item.status) {
                                                                case '0':
                                                                    return (
                                                                        <div className="d-flex align-items-center justify-content-between zoom">
                                                                            <div></div>
                                                                            <div onClick={()=>{
                                                                                Images(item.id)
                                                                                openModel()
                                                                            }} className="action-button"><img style={{marginTop:"0",width:"32px",height:"32px"}} src="/assets/zoom.png" alt=""/></div>
                                                                        </div>
                                                                    )
                                                                case '1':
                                                                    return (
                                                                        <div className="d-flex align-items-center justify-content-between zoom">
                                                                            <button>YANGI MAHSULOT</button>
                                                                            <div onClick={()=>{
                                                                                Images(item.id)
                                                                                openModel()
                                                                            }} className="action-button"><img style={{marginTop:"0",width:"32px",height:"32px"}} src="/assets/zoom.png" alt=""/></div>
                                                                        </div>
                                                                    )
                                                                case '2':
                                                                    return (
                                                                        <div className="d-flex align-items-center justify-content-between zoom">
                                                                            <button style={{backgroundColor:"#1FCA25"}}>AKSIYA</button>
                                                                            <div onClick={()=>{
                                                                                Images(item.id)
                                                                                openModel()
                                                                            }} className="action-button"><img style={{marginTop:"0",width:"32px",height:"32px"}} src="/assets/zoom.png" alt=""/></div>
                                                                        </div>
                                                                    )
                                                                default:
                                                                    return (
                                                                        <div className="d-flex align-items-center justify-content-between zoom">
                                                                            <div className="d-flex align-items-center justify-content-start">
                                                                                <button>YANGI MAHSULOT</button>
                                                                                <button style={{backgroundColor:"#1FCA25"}} className="ms-2">AKSIYA</button>
                                                                            </div>
                                                                            <div onClick={()=>{
                                                                                Images(item.id)
                                                                                openModel()
                                                                            }} className="action-button">
                                                                                <img style={{marginTop:"0",width:"32px",height:"32px"}} src="/assets/zoom.png" alt=""/>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                            }

                                                        })()}
                                                    </div>
                                                    <img src={API + "/images/product/" +item.images} alt=""/>
                                                </div>
                                                <div className="right">
                                                    <h6 className='main-title'>{item.name}</h6>
                                                    <div className="d-flex justify-content-between align-items-center mt-3 info-main">
                                                        <div className="infos first-infos">
                                                            <div className='info'>
                                                                <h6>Yuklama</h6>
                                                                <span>{item.weight}</span>
                                                                <span className="sub-span">kg</span>
                                                            </div>
                                                            <div className='info'>
                                                                <h6>Kafolat</h6>
                                                                <span>{item.guarantee}</span>
                                                                <span className="sub-span">yil</span>
                                                            </div>
                                                        </div>
                                                        <div className="infos second-infos">
                                                            <div className='info'>
                                                                <h6>O'lchami</h6>
                                                                <span>{item.size}</span>
                                                            </div>
                                                            <div className='info'>
                                                                <h6>Sig’imi</h6>
                                                                <span>{item.capacity}</span>
                                                                <span className="sub-span">kishilik</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>{item.detail}</p>
                                                    <div className="price">
                                                        <h6 className="mb-0">Narxi</h6>
                                                        <div className="d-flex align-items-center ">
                                                            {item.discount_price ==0
                                                                ?
                                                                <div className="d-flex align-items-end">
                                                                    <span>{item.current_price}</span>
                                                                    <span className="sub-span">so'm</span>
                                                                </div>
                                                                :
                                                                <div className="d-flex align-items-center">
                                                                    <div className="d-flex align-items-end">
                                                                        <span className="pricee">{item.current_price}<div className="line"/></span>
                                                                        <span className="sub-span priceee">so'm</span>

                                                                    </div>
                                                                    <h6 className="new-price">{item.discount_price}</h6>
                                                                    <span className="sub-span">so'm</span>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <button onClick={()=>{
                                                        ReqOne(item.id)
                                                        openModal()
                                                        setValue(1)
                                                    }}>Buyurtma berish <img src="/assets/cart.png" alt=""/></button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                }
                            </div>
                            :
                            <div></div>
                        }
                        {all.length===0 &&menuItemOne.length===0 ?
                            <div className="row">
                                {allOne.map((item,index)=>{
                                    return(
                                        <div  key={index.toString()} className="col-12 mt-2">
                                            <div className="left">
                                                <div className="">
                                                    {(() => {
                                                        switch (item.status) {
                                                            case '0':
                                                                return (
                                                                    <div className="d-flex align-items-center justify-content-between zoom">
                                                                        <div></div>
                                                                        <div onClick={()=>{
                                                                            Images(item.id)
                                                                            openModel()
                                                                        }} className="action-button"><img style={{marginTop:"0",width:"32px",height:"32px"}} src="/assets/zoom.png" alt=""/></div>
                                                                    </div>
                                                                )
                                                            case '1':
                                                                return (
                                                                    <div className="d-flex align-items-center justify-content-between zoom">
                                                                        <button>YANGI MAHSULOT</button>
                                                                        <div onClick={()=>{
                                                                            Images(item.id)
                                                                            openModel()
                                                                        }} className="action-button"><img style={{marginTop:"0",width:"32px",height:"32px"}} src="/assets/zoom.png" alt=""/></div>
                                                                    </div>
                                                                )
                                                            case '2':
                                                                return (
                                                                    <div className="d-flex align-items-center justify-content-between zoom">
                                                                        <button style={{backgroundColor:"#1FCA25"}}>AKSIYA</button>
                                                                        <div onClick={()=>{
                                                                            Images(item.id)
                                                                            openModel()
                                                                        }} className="action-button"><img style={{marginTop:"0",width:"32px",height:"32px"}} src="/assets/zoom.png" alt=""/></div>
                                                                    </div>
                                                                )
                                                            default:
                                                                return (
                                                                    <div className="d-flex align-items-center justify-content-between zoom">
                                                                        <div className="d-flex align-items-center justify-content-start">
                                                                            <button>YANGI MAHSULOT</button>
                                                                            <button style={{backgroundColor:"#1FCA25"}} className="ms-2">AKSIYA</button>
                                                                        </div>
                                                                        <div onClick={()=>{
                                                                            Images(item.id)
                                                                            openModel()
                                                                        }} className="action-button">
                                                                            <img style={{marginTop:"0",width:"32px",height:"32px"}} src="/assets/zoom.png" alt=""/>
                                                                        </div>
                                                                    </div>
                                                                )
                                                        }

                                                    })()}
                                                </div>
                                                <img src={API + "/images/product/" +item.images} alt=""/>
                                            </div>
                                            <div className="right">
                                                <h6 className='main-title'>{item.name}</h6>
                                                <div className="d-flex justify-content-between align-items-center mt-3 info-main">
                                                    <div className="infos first-infos">
                                                        <div className='info'>
                                                            <h6>Yuklama</h6>
                                                            <span>{item.weight}</span>
                                                            <span className="sub-span">kg</span>
                                                        </div>
                                                        <div className='info'>
                                                            <h6>Kafolat</h6>
                                                            <span>{item.guarantee}</span>
                                                            <span className="sub-span">yil</span>
                                                        </div>
                                                    </div>
                                                    <div className="infos second-infos">
                                                        <div className='info'>
                                                            <h6>O'lchami</h6>
                                                            <span>{item.size}</span>
                                                        </div>
                                                        <div className='info'>
                                                            <h6>Sig’imi</h6>
                                                            <span>{item.capacity}</span>
                                                            <span className="sub-span">kishilik</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p>{item.detail}</p>
                                                <div className="price">
                                                    <h6 className="mb-0">Narxi</h6>
                                                    <div className="d-flex align-items-center ">
                                                        {item.discount_price ==0
                                                            ?
                                                            <div className="d-flex align-items-end">
                                                                <span>{item.current_price}</span>
                                                                <span className="sub-span">so'm</span>
                                                            </div>
                                                            :
                                                            <div className="d-flex align-items-center">
                                                                <div className="d-flex align-items-end">
                                                                    <span className="pricee">{item.current_price}<div className="line"/></span>
                                                                    <span className="sub-span priceee">so'm</span>

                                                                </div>
                                                                <h6 className="new-price">{item.discount_price}</h6>
                                                                <span className="sub-span">so'm</span>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <button onClick={()=>{
                                                    ReqOne(item.id)
                                                    openModal()
                                                    setValue(1)
                                                }}>Buyurtma berish <img src="/assets/cart.png" alt=""/></button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            <div></div>
                        }
                    </div>

                </div>
            </section>
        </div>

            <Modal open={modal} onClose={closeModal} center>
                <div className="modal-body">
                    <h1>Buyurtma qilish</h1>
                    <form onSubmit={submit} action="">
                        <input minLength={4} title="Faqat harf bilan kiriting va 4ta harfdan kam bo'lmasin" pattern="[a-zA-Z'-'\s]*" placeholder="Ismingizni yozing" className="form-control" ref={nameRef} type="text" />
                        <div style={{marginTop:"25px"}} className="d-flex align-items-center justify-content-start phone">
                            <div>+998</div>
                            <input
                                style={{borderTopLeftRadius:0,borderBottomLeftRadius:0}}
                                placeholder="90 123 45 67" className="form-control"
                                ref={numberRef} type="number"
                            />
                        </div>
                        <label style={{marginTop:"45px"}} htmlFor="">Mahsulotlarni toifasini tanlang</label>
                        <select disabled  className="form-control" ref={productIdRef}  required >
                            <option  value={order.id}>{order.name}</option>
                        </select>
                        <label style={{marginTop:"25px"}} htmlFor="">Miqdorni tanlang</label>

                        <div className="d-flex number-group">
                            <button type="button" onClick={()=>{
                                if (value>1){
                                    setValue(value-1)
                                }

                            }} className="first">-</button>
                            <input
                                value={value}
                                onChange={event => setValue(event.target.value)}
                                className="form-control"
                                ref={amountRef}
                                type="number" />
                            <button type="button" onClick={()=>{
                                setValue(value+1)
                            }} className="second">+</button>
                        </div>


                        <button style={{marginTop:"50px"}} className="w-100" type="submit">Yuborish</button>
                    </form>
                </div>
            </Modal>
            <Modal open={modalOne} onClose={closeModalOne}>
                <div className="text-center">
                    <h1 className="mt-5">Arizangiz muvaffaqiyatli <br/> yuborildi</h1>
                    <img src="/assets/ariza.png" alt=""/>
                    <p>{connect}</p>
                    <button onClick={closeModalOne} className="w-100">Ok</button>
                </div>
            </Modal>
            <Modal open={model} onClose={closeModel} center>
                <img style={{width:"100%",height:"200px"}} src={API+"/images/product/"+selectImg[num]} alt=""/>
                <div className="d-flex justify-content-between mt-5 images-modal">
                    {selectImg.map((item,index)=>(
                        <div key={index.toString()}>
                            <img onClick={()=>{
                                setNum(index)
                            }} style={{width:"100px",height:"100px",marginLeft:"10px",cursor:"pointer"}} key={index} src={API+"/images/product/"+item} alt=""/>
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
};

export default Products;
