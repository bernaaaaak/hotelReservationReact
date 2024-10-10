import React from 'react';
import { Link } from 'react-router-dom'; // React Router kullanıyoruz, eğer kullanıyorsanız
import '../styles/NavBar.css'; 
import profilePic from '../assets/images/yeni_logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={profilePic} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="#footer">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
