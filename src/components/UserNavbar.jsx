import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserNavbar.css';
import profilePic from '../assets/images/yeni_logo.png';

const UserNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // JWT token'ı iptal et (localStorage veya sessionStorage'dan kaldır)
    localStorage.removeItem('token');
    // Kullanıcıyı home sayfasına yönlendir
    navigate('/');
  };

  const handleUserPage = () => {
    // Kullanıcıyı user-page sayfasına yönlendir
    navigate('/user-page');
  };

  return (
    <nav className="navbar-user">
      <div className="logo">
        <img src={profilePic} alt="Logo" />
      </div>
      <div className="navbar-icons">
        <button className="navbar-icon">
          <i className="fa fa-user"></i>
        </button>
        <button className="navbar-contact" onClick={handleUserPage}>User Page</button>
        <button className="navbar-contact" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default UserNavBar;