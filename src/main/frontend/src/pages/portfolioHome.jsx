import React from "react";
import DogImage from "../components/images/Dog.jpg";
import "../components/styles/PortfolioHome.css";
import Header from "../components/PortfolioHeader.jsx";

export const PortfolioHome = () => {
    return (
        <>
            <Header />
            <div className="component-container">
            <img className="portfolioImg" src={DogImage} alt="Profile" />
                <h1>
                    <div>Thank You For Visiting</div>
                    <div>Takuma's Portfolio</div>
                </h1>
            </div>
        </>
    );
};

export default PortfolioHome;
