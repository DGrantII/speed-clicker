import { NavLink } from 'react-router-dom';
import React from 'react';
import Header from './Header';

const Navigation = () => {
    return (
        <>
            <Header />
            <ul className="nav-links">
                <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Home</NavLink></li>
                <li><NavLink to="/cps" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>CPS</NavLink></li>
                <li><NavLink to="/easy" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Easy</NavLink></li>
                <li><NavLink to="/medium" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Medium</NavLink></li>
                <li><NavLink to="/hard" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>Hard</NavLink></li>
            </ul>
        </>
    )
}

export default Navigation;
