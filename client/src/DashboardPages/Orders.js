import React from 'react';
import './orders.css'
import Col3 from "./Col3";
import Switches from "./Switches";

const Orders = () => {

    return (
        <section className="orders">
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
};

export default Orders;
