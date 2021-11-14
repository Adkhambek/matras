import React, {useState} from 'react';
import Col3 from "./Col3";
import './banners.css'
import Switches from "./Switches";

const Banners = () => {
    const [ban,setBan]=useState('translateY(-110%)')
    return (
        <>
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
                                    <h6>John Doe</h6>
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
                                <tr>
                                    <td>Kechalari....</td>
                                    <td>image</td>
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
                                setBan('translateY(0)')
                            }}  className="add">Add</button>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{transform:ban}} className="add-location productadd">
                <button onClick={()=>{
                    setBan('translateY(-110%)')
                }} className="close">&times;</button>
                <h6>Qo'shish</h6>
                <div className="row">
                    <div className="col-2"/>
                    <div className="col-4">
                        <img style={{width:"250px",height:"250px"}} src="/assets/about.png" alt=""/>
                    </div>
                    <div className="col-4">
                        <p className="mt-0">Matn</p>
                        <input type="text"/>
                        <div style={{marginTop:"15px"}} className="d-flex align-items-center justify-content-between">
                            <p className="mt-0 mb-0">Holat</p>
                            <Switches/>
                        </div>
                        <button className="add-location-button">Saqlash</button>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        </>
    );
};

export default Banners;
