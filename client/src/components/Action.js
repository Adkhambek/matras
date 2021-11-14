import React, {useState, useEffect, useRef} from 'react';
import './products.css'
import axios from "axios";
import API from "./Api";
import {Modal} from "react-responsive-modal";
import {toast} from "react-toastify";


const Action = () => {
    const nameRef = useRef(null)
    const numberRef=useRef(null)
    const productIdRef=useRef(null)
    const amountRef=useRef(null)
    const [value,setValue]=useState(1)
    const [connect,setConnect]=useState('')




    const [menuItem, setMenuItem]=useState([])
    const [selectted,setSelectted]=useState([])
    const [valuee,setValuee]=useState(0)

    const [modall,setModall]=useState(false)
    const [modell,setModell]=useState(false)
    const [modallTwo,setModallTwo]=useState(false)
    const openModall = () => {
      setModall(true)
    }
    const openModell = () => {
      setModell(true)
    }

    const closeModall=()=>{
        setModall(false)
    }
    const closeModell=()=>{
        setModell(false)
    }
    const openModallTwo = () => {
        setModallTwo(true)
    }
    const closeModallTwo=()=>{
        setModallTwo(false)
    }


    useEffect(()=>{
        axios.get(API+"/api/products/discount")
            .then((res)=>{
                setMenuItem(res.data.data)
            })

    }, [])
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
                // console.log(res.data)
                // console.log(numberRef.current.value.length)
                setConnect(res.data.message.connect)
                if (res.data.statusCode=201){
                    closeModall()
                    openModallTwo()
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
    return (
       <>
           <section className="products">
               <div className="container">
                   <h1 className="title mb-5">Aksiyadagi mahsulotlar</h1>
                   <div className="row">
                       {menuItem.map((item,index)=>{
                           return(
                               <div key={item.id} className="col-12 mt-2">
                                   <div className="left">
                                       <div className="d-flex align-items-center justify-content-between">
                                           <button style={{backgroundColor:"#1FCA25"}}>AKSIYA</button>
                                           <div onClick={openModell} className="action-button"><img style={{marginTop:"0",width:"32px",height:"32px"}} src="/assets/zoom.png" alt=""/></div>
                                       </div>
                                       <img src={API + "/images/product/" + JSON.parse(item.images)[2]} alt=""/>
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
                                                   <div className="d-flex align-items-center">
                                                       <div className="d-flex align-items-end">
                                                           <span className="pricee">{item.current_price}<div className="line"/></span>
                                                           <span className="sub-span priceee">so'm</span>

                                                       </div>
                                                       <h6 className="new-price">{item.discount_price}</h6>
                                                       <span className="sub-span">so'm</span>
                                                   </div>
                                           </div>
                                       </div>
                                       <button onClick={()=>{
                                           console.log(item)
                                           setSelectted(item)
                                           openModall()
                                       }}>Xarid qilish <img src="/assets/cart.png" alt=""/></button>
                                   </div>
                               </div>
                           )
                       })}
                   </div>
               </div>
           </section>
           <Modal open={modall} onClose={closeModall} center>
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
                       <select disabled className="form-control" ref={productIdRef}  required >
                           {menuItem.map((item,index)=>{
                               return <option key={item.id}  value={item.id}>{item.name}</option>
                           })}
                           <img src="/assets/arrow-down.png" alt=""/>
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
                               className="form-control" ref={amountRef}
                               type="number" />
                           <button type="button" onClick={()=>{
                               setValue(value+1)
                           }} className="second">+</button>
                       </div>


                       <button style={{marginTop:"50px"}} className="w-100" type="submit">Yuborish</button>
                   </form>
               </div>
           </Modal>
           <Modal open={modallTwo} onClose={closeModallTwo} center>
               <div className="text-center">
                   <h1 className="mt-5">Arizangiz muvaffaqiyatli <br/> yuborildi</h1>
                   <img src="/assets/ariza.png" alt=""/>
                   <p>{connect}</p>
                   <button onClick={closeModallTwo} className="w-100">Ok</button>
               </div>
           </Modal>
           <Modal open={modell} onClose={closeModell} center>
               <div className="d-flex justify-content-between mt-5 images-modal">

                   {/*{imgs[0].map((item,index)=>(*/}

                   {/*        <img*/}
                   {/*            onClick={()=>{*/}
                   {/*                console.log(index)*/}
                   {/*                console.log(imgs[index])*/}
                   {/*            }}*/}
                   {/*            style={{width:"100px",height:"100px",marginLeft:"10px"}}*/}
                   {/*            key={index.toString()}*/}
                   {/*            src={API+"/images/product/"+item}*/}
                   {/*            alt=""*/}
                   {/*        />*/}
                   {/*))}*/}
               </div>
           </Modal>
           <Modal>

           </Modal>
       </>
    );
};

export default Action;
