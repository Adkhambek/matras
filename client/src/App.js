import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
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
import StatisticsDashboard from "./DashboardPages/StatisticsDashboard";
import BounceLoader from "react-spinners/BounceLoader";

const App = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 10);
    }, []);

    return (
        <div>
            {loading ? (
                <div
                    style={{
                        height: "80vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <BounceLoader
                        loading={loading}
                        color={"#01384D"}
                        size={100}
                    />
                </div>
            ) : (
                <>
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/admin" exact component={Admin} />
                            <Route
                                path="/dashboard"
                                exact
                                component={Dashboard}
                            />
                            {localStorage.getItem("Mydata") ? (
                                <Route path="/admin" exact component={Admin} />
                            ) : (
                                <Redirect to={"/admin"} />
                            )}

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
                            <Route
                                path="/dashboard/orders/:id"
                                exact
                                component={Orders}
                            />
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
                                path="/dashboard/customers/:id"
                                exact
                                component={Customers}
                            />
                            <Route
                                path="/dashboard/stats"
                                exact
                                component={StatisticsDashboard}
                            />
                        </Switch>
                    </BrowserRouter>
                    <ToastContainer />
                </>
            )}
        </div>
    );
};

export default App;
