import React from 'react';
import "./dashboard.css"
import {NavLink} from "react-router-dom";
import Switches from "../DashboardPages/Switches";
import Admin from "./Admin";

const Dashboard = () => {
    if (localStorage.getItem('Mydata')){
        return (
            <section className="dashboard orders">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <ul>
                                <li><a href="/"><img src="/assets/admin-logo.png" alt=""/></a></li>
                                <li>
                                    <NavLink  to="/dashboard/orders" activeClassName="active">
                                        <img src="/assets/home.png" alt=""/>
                                        <h6>Orders</h6>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/customers" activeClassName="active" >
                                        <img src="/assets/customer.png" alt=""/>
                                        <h6>Сustomers</h6>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/categories" activeClassName="active">
                                        <img src="/assets/toifa.png" alt=""/>
                                        <h6>Categories</h6>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/products" activeClassName="active">
                                        <img src="/assets/shopping-cart.png" alt=""/>
                                        <h6>Products</h6>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/technology" activeClassName="active">
                                        <img src="/assets/texlogiya.png" alt=""/>
                                        <h6>Technology</h6>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/location" activeClassName="active">
                                        <img src="/assets/manzil.png" alt=""/>
                                        <h6>Location</h6>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/banners" activeClassName="active">
                                        <img style={{width:"20px",height:"20px"}} src="/assets/code.png" alt=""/>
                                        <h6>Banners</h6>
                                    </NavLink>
                                </li>
                            </ul>
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
                                    <button
                                        onClick={()=>{
                                            localStorage.removeItem('Mydata')
                                            console.log(localStorage.getItem('Mydata'))
                                            window.location='/admin'
                                        }}
                                        style={{backgroundColor:"transparent",border:"none"}}>
                                        <h6>Log Out</h6>
                                    </button>
                                </div>
                            </div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Ismi</th>
                                    <th>Telefon raqami</th>
                                    <th>Mahsulot nomlari</th>
                                    <th>Miqdor</th>
                                    <th>Qayta aloqa</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Jenny Wilson</td>
                                    <td>+998 90 123 45 67</td>
                                    <td>Ortopedik Eko matras</td>
                                    <td>4</td>
                                    <td>
                                        <Switches/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Robert Fox</td>
                                    <td>+998 90 123 45 67</td>
                                    <td>Ortopedik Eko matras</td>
                                    <td>4</td>
                                    <td>
                                        <Switches/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Jenny Wilson</td>
                                    <td>+998 90 123 45 67</td>
                                    <td>Ortopedik Eko matras</td>
                                    <td>4</td>
                                    <td>
                                        <Switches/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        );
    }else {
        return <Admin/>
    }

};

export default Dashboard;
