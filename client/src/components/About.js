import React, { useEffect } from "react";
import "./about.css";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
    useEffect(() => {
        AOS.init();
    });
    return (
        <div data-aos="fade-up" data-aos-offset="300">
            <section id="about" className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <h5>Dream Cloud kompaniyasi haqida</h5>
                            <p>
                                "Lux Matras" kompaniyasining mahsulotlari yaxshi
                                dam olish uchun ideal sharoitlarni ta'minlash
                                uchun mo'ljallangan. Biz xaridorlarning barcha
                                toifalari talablariga javob beradigan buyurtma
                                asosida tayyorlangan matraslarni ishlab
                                chiqaramiz: anatomik va ortopedik, bahor (qaram
                                va mustaqil buloqlar bilan) va bahorsiz. Shuning
                                uchun u faqat yuqori sifatli, ishonchli,
                                bardoshli mahsulotni taklif qiladi. Har bir
                                variant siz uxlayotganingizda sizning
                                farovonligingiz uchun ishlaydigan eng kichik
                                tafsilotlargacha o'ylab topilgan:
                            </p>
                            <div className="nums">
                                <ul>
                                    <li>
                                        Qo'shnilar bilan qattiq metall
                                        ushlagichga ega bo'lmagan buloqlar
                                        tufayli, matras maksimal qulaylikni
                                        ta'minlab, tanangizning holatiga
                                        moslashadi;
                                    </li>
                                    <li>
                                        Antibakterial emdirish zararli
                                        mikroorganizmlar, chang oqadilar va
                                        mog'or paydo bo'lishidan himoya qiladi;
                                    </li>
                                    <li>
                                        Ekologik toza xom ashyolardan plomba
                                        moddalari allergik namoyon bo'lish
                                        ehtimolini kamaytiradi.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-6">
                            <iframe
                                className="responsive-iframe"
                                src="https://www.youtube.com/v/P3Qyddg4bgg"
                            />
                        </div>
                    </div>
                    <div className="row second">
                        <div className="col-6">
                            <img
                                className="w-100"
                                src="/assets/about.png"
                                alt=""
                            />
                        </div>
                        <div className="col-6 right">
                            <p className="mt-0 pe-0">
                                Biz, o'z navbatida, nafaqat eng qulay uyqu
                                sharoitlarini, balki mukammal xizmat
                                ko'rsatishni, qulay xarid qilish va etkazib
                                berish sxemasini ham kafolatlaymiz.
                            </p>
                            <div className="nums">
                                <ol className="mb-0">
                                    <li>
                                        Id risus phasellus laoreet eget. A nec
                                        pulvinar.
                                    </li>
                                    <li>
                                        Eu justo, tincidunt fringilla diam
                                        nulla.
                                    </li>
                                    <li>
                                        Amet, nullam cras lacus, fermentum leo
                                        tellus sagittis.
                                    </li>
                                    <li>
                                        Facilisi mauris condimentum sagittis
                                        odio rhoncus semper.
                                    </li>
                                </ol>
                            </div>
                            <p className="second-p">
                                Vaqt qimmatli manbadir, lekin agar siz uni
                                uyqudan o'g'irlasangiz, samaradorlik minimal
                                darajaga tushadi, ya'ni siz uzoq va sog'lom
                                uyquga ega bo'lasiz!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
