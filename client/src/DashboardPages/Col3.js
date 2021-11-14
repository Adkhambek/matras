import React from 'react';
import {NavLink} from "react-router-dom";

const Col3 = () => {
    return (
        <div className="dashboard">
            <ul>
                <li><a href="/"><img src="/assets/admin-logo.png" alt=""/></a></li>
                <li>
                    <NavLink to="/dashboard/orders" activeClassName="active">
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
    );
};

export default Col3;
