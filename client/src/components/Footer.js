import React, {useState} from 'react';
import './footer.css'

const Footer = () => {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setVisible(true)
        }
        else if (scrolled <= 300){
            setVisible(false)
        }
    };

    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);
    return (
        <section className="footer">
            <div className="container">
                <div className="footer-main">
                    <div className="links">
                        <ul className="ps-0 mb-0">
                            <li ><a href="">Biz haqimizda</a></li>
                            <li><a href="">Katalog</a></li>
                            <li><a href="">Aksiya</a></li>
                            <li><a href="">Manzilimiz</a></li>
                        </ul>
                    </div>
                    <div className="socials">
                        <ul className="ps-0 mb-0">
                            <li><a href=""><img src="/assets/facebook.png" alt=""/></a></li>
                            <li><a href=""><img src="/assets/twitter.png" alt=""/></a></li>
                            <li><a href=""><img src="/assets/vimeo.png" alt=""/></a></li>
                            <li><a href=""><img src="/assets/youtube.png" alt=""/></a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-end">
                    <p>© 2021 Dream Cloud. Barcha huquqlar himoyalangan.</p>
                    <button onClick={scrollToTop}
                            style={{display: visible ? 'inline' : 'none'}}><img src="/assets/mask.png" alt=""/></button>
                    <img src="assets/vizitka.png" alt=""/>
                </div>
            </div>
        </section>
    );
};

export default Footer;
