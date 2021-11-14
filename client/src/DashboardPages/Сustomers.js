import React from 'react';
import './customers.css'
import Col3 from "./Col3";
import Switches from "./Switches";

const Сustomers = () => {
    return (
        <section className="customers orders">
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
                                <th>ID</th>
                                <th>Sana</th>
                                <th>Telefon raqami</th>
                                <th>Qayta aloqa</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>12:13-<span>12.05.2021</span></td>
                                <td>+998 90 123 45 67</td>
                                <td><Switches/></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button className="delete">
                                        <img src="/assets/delete.png" alt=""/>
                                    </button>
                                </td>
                            </tr>
                                <tr>
                                    <td>1</td>
                                    <td>12:13-<span>12.05.2021</span></td>
                                    <td>+998 90 123 45 67</td>
                                    <td><Switches/></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <button className="delete">
                                            <img src="/assets/delete.png" alt=""/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Сustomers;
