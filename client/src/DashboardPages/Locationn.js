import React, {useState} from 'react';
import './locationn.css'
import Col3 from "./Col3";
import Switches from "./Switches";

const Locationn = () => {
    const [loc,setLoc]=useState('translateY(-110%)')
    return (
        <>
            <section className="locationn orders">
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
                                    <th>Manzil</th>
                                    <th>Matn</th>
                                    <th>Location</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Toshkent, Parken...</td>
                                    <td>Mo’ljal: Qoraqamish...  </td>
                                    <td><img src="/assets/place.png" alt=""/></td>
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
                                setLoc('translateY(0)')
                            }}  className="add">Add</button>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{transform:loc}} className="add-location productadd">
                <button onClick={()=>{
                    setLoc('translateY(-110%)')
                }} className="close">&times;</button>
                <h6>Tahrirlash</h6>
                <div className="row">
                    <div className="col-4">
                        <img style={{width:"250px",height:"250px"}} src="/assets/about.png" alt=""/>
                    </div>
                    <div className="col-4">
                        <p className="mt-0">Manzil</p>
                        <input type="text"/>
                        <p>Location</p>
                        <input type="text"/>
                        <div style={{marginTop:"15px"}} className="d-flex align-items-center justify-content-between">
                            <p className="mt-0 mb-0">Holat</p>
                            <Switches/>
                        </div>
                    </div>
                    <div className="col-4">
                        <p className="mt-0">Matn</p>
                        <textarea></textarea>
                        <button className="add-location-button">Saqlash</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Locationn;
