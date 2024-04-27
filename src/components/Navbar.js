// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css'; // Import CSS file

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink exact to="/" activeClassName="active">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/recommendation" activeClassName="active">Recommendation</NavLink>
                </li>
                <li>
                    <NavLink to="/stock-info" activeClassName="active">Stock Information</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
