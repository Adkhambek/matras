import React, {useState} from 'react';
import './technology.css'
import Col3 from "./Col3";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Switches from "./Switches";

const Technology = () => {
    const [techno,setTechno]=useState(false)
    const openTechno = () => {
      setTechno(true)
    }
    const closeTechno = () => {
        setTechno(false)
    }
    return (
       <>
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
                                   <h6>John Doe</h6>
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
                               <tr>
                                   <td>Menory foam</td>
                                   <td>Enim urna... </td>
                                   <td>youtube.com...</td>
                                   <td >
                                       <div className="d-flex justify-content-between  align-items-center">
                                           <div></div>
                                           <div className="d-flex  align-items-center">
                                               <button  className="delete">
                                                   <img src="/assets/edit.png" alt=""/>
                                               </button>
                                               <button style={{marginLeft:"10px"}}  className="delete">
                                                   <img src="/assets/delete.png" alt=""/>
                                               </button>
                                           </div>
                                       </div>
                                   </td>
                               </tr>
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
                   <div className="d-flex">
                       <div>
                           <p>Nomi</p>
                           <input type="text"/>
                           <p>Nomi</p>
                           <input type="text"/>
                           <div style={{marginTop:"53px",paddingRight:"30px"}} className="d-flex align-items-center justify-content-between">
                               <p className="mt-0 mb-0">Navinla</p>
                               <Switches/>
                           </div>
                       </div>
                       <div>
                           <p>Rasm</p>
                           <input type="text"/>
                           <p>Video</p>
                           <input type="text"/>
                           <button className="add-button-techno d-block">Add</button>
                       </div>
                   </div>
               </div>
           </Modal>
       </>

    );
};

export default Technology;
