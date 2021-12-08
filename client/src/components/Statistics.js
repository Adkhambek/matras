import React, {useState,useEffect} from 'react';
import './statistics.css'
import axios from "axios";
import API from "./Api";
import AOS from 'aos';
import "aos/dist/aos.css"

const Statistics = () => {
    const [statistics,setStatistics]=useState([])
    useEffect(()=>{
        axios.get(API+"/api/statistics")
            .then((res)=>{
                setStatistics(res.data.data)
            })

    }, [])
    useEffect(()=>{
        AOS.init();
    })
    return (
        <div data-aos="fade-up" data-aos-offset="300">
            <section className="statistics">
           <div className="container">
               <div className="row">
                   <div className="col-3">
                       <h1>{statistics.experience}</h1>
                       <h6>yillik tajriba</h6>
                   </div>
                   <div className="col-3">
                       <h1>{statistics.client}+</h1>
                       <h6>mamnun mijozlar</h6>
                   </div>
                   <div className="col-3">
                       <h1>{statistics.guarantee}</h1>
                       <h6>yillik kafolat</h6>
                   </div>
                   <div className="col-3">
                       <h1>{statistics.delivery}</h1>
                       <h6>kunda yetkazish</h6>
                   </div>
               </div>
           </div>
       </section>
        </div>
       
    );
};

export default Statistics;
