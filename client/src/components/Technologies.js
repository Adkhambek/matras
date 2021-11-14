import React, {useState,useEffect} from 'react';
import './technologies.css'
import axios from "axios";
import API from "./Api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Technologies = () => {
    const [techno,setTechno]=useState([])
    useEffect(()=>{
        axios.get(API+"/api/technologies")
            .then((res)=>{
                setTechno(res.data.data)

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
    return (
        <section className="technologies">
            <div className="container">
                <h1>Ishlab chiqarish texnologiyalari</h1>
                <div className="row">
                    {techno.map((item,index)=>{
                        return(
                            <div key={index.toString()} className="col-4">
                                <a target="_blank" className="text-decoration-none" href={item.video}>
                                    <h6>{item.name}</h6>
                                    <div className="techno-img">
                                        <img className="w-100" src={API + "/images/technology/"+item.thumbnail} alt=""/>
                                        <div className="video-img">
                                            <img src="/assets/video.png" alt=""/>
                                        </div>
                                    </div>

                                    <p>{item.detail}</p>
                                </a>
                            </div>
                        )
                    })}
                </div>
                <div className="carus">
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
                        {techno.map((item,index)=>{
                            return(
                                <div style={{width:"100%"}} key={index.toString()} className="col-4">
                                    <a target="_blank" className="text-decoration-none" href={item.video}>
                                        <h6>{item.name}</h6>
                                        <div className="techno-img">
                                            <img className="w-100" src={API + "/images/technology/"+item.thumbnail} alt=""/>
                                            <div className="video-img">
                                                <img src="/assets/video.png" alt=""/>
                                            </div>
                                        </div>

                                        <p>{item.detail}</p>
                                    </a>
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default Technologies;
