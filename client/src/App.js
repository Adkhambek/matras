import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./main.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Banners from "./DashboardPages/Banners";
import Categories from "./DashboardPages/Categories";
import Locationn from "./DashboardPages/Locationn";
import Orders from "./DashboardPages/Orders";
import Products from "./DashboardPages/Products";
import Technology from "./DashboardPages/Technology";
import Customers from "./DashboardPages/Сustomers";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/admin" exact component={Admin} />
                    <Route path="/dashboard" exact component={Dashboard} />
                    <Route
                        path="/dashboard/banners"
                        exact
                        component={Banners}
                    />
                    <Route
                        path="/dashboard/categories"
                        exact
                        component={Categories}
                    />
                    <Route
                        path="/dashboard/location"
                        exact
                        component={Locationn}
                    />
                    <Route path="/dashboard/orders" exact component={Orders} />
                    <Route
                        path="/dashboard/products"
                        exact
                        component={Products}
                    />
                    <Route
                        path="/dashboard/technology"
                        exact
                        component={Technology}
                    />
                    <Route
                        path="/dashboard/customers"
                        exact
                        component={Customers}
                    />
                </Switch>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
};

export default App;
