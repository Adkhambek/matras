import React, {useEffect, useState, useRef} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './header.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from "axios";
import API from "./Api";
import { ToastContainer, toast } from 'react-toastify';

const Header = () => {


    const nameRef = useRef(null)
    const numberRef=useRef(null)
    const productIdRef=useRef(null)
    const amountRef=useRef(null)
    const [posts, setPosts]=useState([]);
    const [product,setProduct]=useState([])
    useEffect(()=>{
        axios.get(API+"/api/banners")
            .then((res)=>{
                setPosts(res.data.data)
            })

    }, [])
    const nameReq=()=>{
        axios.get(API+"/api/products/name")
            .then((res)=>{
                setProduct(res.data.data)
            })
    }
    const [value,setValue]=useState(1)
    const [connect,setConnect]=useState('')
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [openSecond, setOpenSecond] = useState(false);
    const onOpenModalSecond = () => setOpenSecond(true);
    const onCloseModalSecond = () => setOpenSecond(false);
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
                console.log(res.data)
                // console.log(numberRef.current.value.length)
                setConnect(res.data.message.connect)
                if (res.data.statusCode=201){
                    onCloseModal()
                    onOpenModalSecond()
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


    const [none,setNone]=useState('none')
    const [nonee,setNonee]=useState('block')
    return (
        <>
            <section className='header'>
                <div className="container">
                    <div className="menu">
                        <div className="d-flex justify-content-end linkss" >
                            <ul>
                                <li><a href="#">Katalog</a></li>
                                <li><a href="#">Aksiya</a></li>
                                <li><a href="#">Biz haqimizda</a></li>
                                <li><a href="#">Manzilimiz</a></li>
                                <li><a href="#">Aloqa</a></li>
                            </ul>
                        </div>
                        <div className="d-flex justify-content-between align-items-center child-menu">
                            <div className="brand">
                                <a href=""><img src="/assets/logo2.png" alt=""/></a>
                            </div>
                            <div className="d-flex justify-content-start align-items-center phone-div">
                                <div className="d-flex   align-items-center  phone-div">
                                    <img src="/assets/call.png" alt=""/>
                                    <h6 className="mb-0">+998 90 123 45 67</h6>
                                </div>
                                <div>
                                    <button onClick={()=>{
                                        nameReq()
                                        onOpenModal()
                                    }} type="button">Buyurtma berish</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="none-menu">
                        <div className="none-menu-child">
                            <img src="/assets/logo2.png" alt=""/>
                            <img style={{display:nonee}} onClick={()=>{
                                setNone('block')
                                setNonee('none')
                            }} src="/assets/menu.png" alt=""/>
                            <img onClick={()=>{
                                setNone('none')
                                setNonee('block')
                            }} style={{display:none}} src="/assets/close.png" alt=""/>
                        </div>
                    </div>
                    <div style={{display:none}} className="none-links">
                        <ul>
                            <li><a href="#">Katalog</a></li>
                            <li><a href="#">Aksiya</a></li>
                            <li><a href="#">Biz haqimizda</a></li>
                            <li><a href="#">Manzilimiz</a></li>
                            <li><a href="#">Aloqa</a></li>
                        </ul>
                        <div>
                            <button onClick={()=>{
                                nameReq()
                                onOpenModal()
                            }} type="button">Buyurtma berish</button>
                        </div>
                        <div className="nuumber">
                            <div className="d-flex   align-items-center  phone-div">
                                <img src="/assets/call.png" alt=""/>
                                <h6 className="mb-0">+998 90 123 45 67</h6>
                            </div>
                        </div>
                    </div>
                    <Carousel
                        className="carusel"
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
                        {posts.map((item,index)=>{
                                return(
                                    <div key={item.id} className="carusell">
                                        <div>
                                            <h2>{item.title}</h2>
                                            <a href="#products"><button className="btnn">Kategoriyalar <img className="ms-2" src="/assets/arrow.png" alt=""/></button></a>
                                        </div>
                                        <div>
                                            <img className="main-img" src={API + "/images/banner/" + item.image} alt=""/>
                                        </div>
                                    </div>
                                )
                            })}
                    </Carousel>
                </div>
            </section>
            <Modal open={open} onClose={onCloseModal} center>
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
                        <select className="form-control" ref={productIdRef}  required >
                            {product.map((item,index)=>{
                                return <option key={item.id}  value={item.id}>{item.name}</option>
                            })}
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
            <Modal open={openSecond} onClose={onCloseModalSecond} center>
                <div className="text-center">
                    <h1 className="mt-5">Arizangiz muvaffaqiyatli <br/> yuborildi</h1>
                    <img src="/assets/ariza.png" alt=""/>
                    <p>{connect}</p>
                    <button onClick={onCloseModalSecond} className="w-100">Ok</button>
                </div>
            </Modal>
        </>


    );

};

export default Header;
