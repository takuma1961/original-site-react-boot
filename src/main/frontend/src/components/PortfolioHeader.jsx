import React from "react";
import "./styles/Header.css"
import { Link } from "react-router-dom";

export const PortfolioHeader = () => {
    return (
        <header className="header">
            <div className="logo">Takuma Portfolio</div>
            <div className="nav-menu">
                <ul>
                    <li><Link to="/">Takuma Portfolio</Link></li>
                    <li><Link to="/Profile">Profile</Link></li>
                    <li><Link to="/Skill">Skill</Link></li>
                    <li><Link to="/MyProduct">MyProduct</Link></li>
                    <li><Link to="/Contact">Contact</Link></li>
                </ul>
            </div>
        </header>
    )
}
export default PortfolioHeader;