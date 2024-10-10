import React from 'react';
import '../styles/FeatureBox.css';
import phone from '../assets/images/phone.jpg';
import security from '../assets/images/security.png';
import price from '../assets/images/price.avif';
import hotel from '../assets/images/hotel.avif';


const FeatureBox = () => {
  return (
    <div className="feature-container">
      <div className="feature-box">
        <div className="icon">
          <img src={phone} alt="Phone Icon"style={{ width: '80px', height: '80px'}} />
        </div>
        <div className="text">
          <h3>Trusted customer service you can rely on, 24/7</h3>
     
        </div>
      </div>
      <div className="feature-box">
        <div className="icon" style={{ marginTop: '-10px' }}>
          <img src={security} alt="Payment Icon" style={{ width: '150px', height: '100px'}} />
        </div>
        <div className="text">
          <h3>Reliable Payment Systems</h3>
        </div>
      </div>
      <div className="feature-box">
        <div className="icon">
          <img src={price} alt="Discount Icon" style={{ width: '100px', height: '100px'}} />
        </div>
        <div className="text">
          <h3>The most reasonable price</h3>
        </div>
      </div>
      <div className="feature-box">
        <div className="icon">
        <img src={hotel} alt="Discount Icon" style={{ width: '100px', height: '100px'}} />
        </div>
        <div className="text">
          <h3>More than 5000 hotels worldwide</h3>
        </div>
      </div>
    </div>
  );
};

export default FeatureBox;
