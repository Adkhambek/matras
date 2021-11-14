import React from 'react';
import Header from "../components/Header";
import Statistics from "../components/Statistics";
import Products from "../components/Products";
import Action from "../components/Action";
import Technologies from "../components/Technologies";
import About from "../components/About";
import WhyUs from "../components/WhyUs";
import Location from "../components/Location";
import Interest from "../components/Interest";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div>
            <Header/>
            <Statistics/>
            <Products/>
            <Action/>
            <Technologies/>
            <About/>
            <WhyUs/>
            <Location/>
            <Interest/>
            <Footer/>
        </div>
    );
};

export default Home;
