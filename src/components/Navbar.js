// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css'; // Import CSS file

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" >Home</NavLink>
                </li>
                <li>
                    <NavLink to="/recommendation" >Recommendation</NavLink>
                </li>
                <li>
                    <NavLink to="/stock-info" >Stock Information</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
