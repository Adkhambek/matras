import React, {useEffect, useState} from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"
import "./location.css"
import axios from "axios";
import API from "./Api";

const Location = () => {
    const [address,setAddress]=useState([])
    useEffect(()=>{
        axios.get(API+"/api/address")
            .then((res)=>{
                setAddress(res.data.data)

            })

    }, [])
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
    // console.log(address[0].images)
    return (
        <section className='location'>
            <div className="container">
                {address.map((item,index)=>{
                    return(
                        <div key={index.toString()} className="row align-items-center">
                            <div className="col-6">
                                <h5 className='col-5-h5'>Manzilimiz</h5>
                                <h6>{item.address}</h6>
                                <p>{item.target}</p>
                                <a target="_blank" href={item.location}>
                                    <button className="location-button">
                                        <img src="/assets/Location.png" alt=""/>
                                        Gelokatsiya
                                    </button>
                                </a>
                            </div>
                            <div className="col-2"></div>
                            <div className="col-4">
                                <Carousel
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
                                        <img src={API + "/images/address/"+ JSON.parse(item.images)[0]} alt=""/>
                                    </div>
                                    <div>
                                        <img src={API + "/images/address/"+ JSON.parse(item.images)[1]} alt=""/>
                                    </div>
                                    <div>
                                        <img src={API + "/images/address/"+ JSON.parse(item.images)[2]} alt=""/>
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                    )
                })}

            </div>
        </section>
    );
};

export default Location;
