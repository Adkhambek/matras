import React from 'react';
import "./why-us.css"

const WhyUs = () => {
    return (
        <section className="why-us">
            <div className="container">
                <h1>Nega bizni tanlashadi</h1>
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <img src="/assets/img1.png" alt=""/>
                                <div className="text">
                                    <h6>Yetkazib berish</h6>
                                    <p>Toshkent bo'ylab bepul o'lchov va etkazib berish</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <img src="/assets/img2.png" alt=""/>
                                <div className="text">
                                    <h6>Qo'llab-quvvatlash</h6>
                                    <p>Bizning qo'llab-quvvatlash xizmati sizga har qanday savolda yordam beradi va
                                        menejerlarning </p>
                                    <h6 className="number">+998 97 144-24-42</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <img  src="/assets/img3.png" alt=""/>
                                <div className="text">
                                    <h6>Kafolat</h6>
                                    <p>Biz matraslarimiz uchun 8 yilgacha kafolat beramiz. Agar matras kamida 25 mm
                                        qisqartirilsa.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
