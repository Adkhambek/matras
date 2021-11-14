import React, {useState} from 'react';
import './productss.css'
import Col3 from "./Col3";
import Switches from "./Switches";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Products = () => {
    const [none,setNone]=useState('none')
    const [trans,setTrans]=useState('translateY(-110%)')
    const [nonee,setNonee]=useState('block')
    const [prdocuctAdd,setProductAdd]=useState(false)
    const openProduct = () => {
      setProductAdd(true)
    }
    const closeProduct = () => {
      setProductAdd(false)
    }
    return (
        <>
            <section className="orders productss">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <Col3/>
                        </div>
                        <div className="col-9">
                            <div className="search">
                                <div className="input-div">
                                    <input placeholder="User" type="text"/>
                                    <img src="/assets/search.png" alt=""/>
                                </div>
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
                                    <th>Mahsulot nomlari</th>
                                    <th>Toifalar</th>
                                    <th>Narxi</th>
                                    <th>Yuklama</th>
                                    <th>Razmeri</th>
                                    <th>Status</th>
                                    <th></th>

                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Lux Soft Memory</td>
                                        <td>Model C</td>
                                        <td>1 600 000 so’m</td>
                                        <td>150 kg</td>
                                        <td>200 x 134 x 40</td>
                                        <td>
                                            <Switches/>
                                        </td>
                                        <td>
                                            <div>
                                                <button  className="delete">
                                                    <img src="/assets/edit.png" alt=""/>
                                                </button>
                                                <button style={{marginLeft:"10px"}} className="delete">
                                                    <img src="/assets/delete.png" alt=""/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button  onClick={()=>{
                                setTrans('translateY(0)')
                            }} className="add">Add</button>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{transform:trans}} className="Add">
                <div className="productadd">
                    <button onClick={()=>{
                        setTrans('translateY(-110%)')
                    }}  className="close">&times;</button>
                    <h6>Qo 'shish</h6>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3">
                                <img style={{width:"230px",height:"230px",borderRadius:"8px"}} src="/assets/about.png" alt="picture"/>
                            </div>
                            <div className="col-3">
                                <p>Toifalar</p>
                                <select>
                                    <option value="">Model c</option>
                                    <option value="">Model a</option>
                                    <option value="">Model b</option>
                                </select>
                                <p>Tovar nomi</p>
                                <input placeholder="masalan: Lux Soft Memory" type="text"/>
                                <p>Narxi</p>
                                <input placeholder="masalan: 20 000" type="number"/>
                                <p>Yuklama</p>
                                <input placeholder="masalan: 200 kg" type="text"/>
                            </div>
                            <div className="col-3">
                                <p>Razmeri</p>
                                <input placeholder="masalan: 200 x 140 x 40" type="text"/>
                                <p>Kafolat</p>
                                <input placeholder="masalan: 1 yil" type="text"/>
                                <p>Sig’m</p>
                                <input placeholder="masalan: 2" type="number"/>
                                <p>Aksiya Narxi</p>
                               <div className="input-add">
                                   <input placeholder="masalan: 1 200 000" type="text"/>
                                   <img
                                       onClick={()=>{
                                           setNonee('none')
                                           setNone('block')
                                       }} style={{display:nonee}} src="/assets/restangle.png" alt=""/>
                                   <img onClick={()=>{
                                       setNone('none')
                                       setNonee('block')
                                   }}
                                       style={{display:none}} src="/assets/blackrestangle.png" alt=""/>
                               </div>
                            </div>
                            <div className="col-3">
                                <p>Ma'lumot</p>
                                <textarea placeholder="Info">

                                </textarea>
                                <div style={{marginTop:"25px"}} className="d-flex align-items-center justify-content-between">
                                    <p>Navinla</p>
                                    <Switches/>
                                </div>
                                <div style={{marginTop:"25px"}} className="d-flex align-items-center justify-content-between">
                                    <p>Active</p>
                                    <Switches/>
                                </div>
                                <button className="add-buttton">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

export default Products;
