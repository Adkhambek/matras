import React, {useState} from 'react';
import Col3 from "./Col3";
import './categories.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Switches from "./Switches";


const Categories = () => {
    const [color,setColor]=useState('#d0efd1')
    const [button,setButton]=useState('#12AF18')
    const [position,setposition]=useState('3px')
    const [deleteCat,setDeleteCat]=useState(false)
    const [add,setAdd]=useState(false)
    const openDelete = () => {
      setDeleteCat(true)
    }
    const closeDelete = () => {
      setDeleteCat(false)
    }

    const openAdd = () => {
      setAdd(true)
    }
    const closeAdd = () => {
      setAdd(false)
    }
    return (
        <>
            <section className="categories orders">
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
                                        <th>Toifalar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <h6> Model A</h6>
                                            <div>
                                                <button onClick={openAdd} className="delete">
                                                    <img src="/assets/edit.png" alt=""/>
                                                </button>
                                                <button onClick={()=>{
                                                    openDelete()
                                                }} className="delete">
                                                    <img src="/assets/delete.png" alt=""/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button onClick={openAdd} className="add">Add</button>
                        </div>
                    </div>
                </div>
            </section>
            <Modal open={deleteCat} onClose={closeDelete} center>
                <div className="delete-modal">
                    <h6>Haqiqatdan ham o’chirmoqchimisiz?</h6>
                    <div style={{marginTop:"22px",float:"right"}}>
                        <button className="yes">HA</button>
                        <button onClick={closeDelete} className="no">YO'Q</button>
                    </div>
                </div>
            </Modal>
            <Modal open={add} onClose={closeAdd} center>
               <div className="add-modal">
                   <h6>Qo'shsish</h6>

                   <p>Kategoriya nomi</p>
                   <input type="text"/>

                   <div style={{marginTop:"25px"}} className="d-flex justify-content-between align-items-center">
                       <h5>Holat</h5>
                       <div
                           onClick={()=>{
                               if (color==='#d0efd1'){
                                   setColor('#ccd7db')
                                   setButton('#fff')
                                   setposition('24px')

                               }else if (color==='#ccd7db'){
                                   setColor('#d0efd1')
                                   setButton('#12AF18')
                                   setposition('3px')
                               }
                           }} style={{backgroundColor:color}} className="switch">
                           <div style={{backgroundColor:button,right:position}} className="switch-button"></div>
                       </div>
                   </div>
                   <button className="add">
                       Add
                   </button>
               </div>
            </Modal>
        </>
    );
};

export default Categories;
